import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => {
  const navigate = useNavigate();
  const { flagId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    picture: '',
    flagsId: flagId
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Convert image to base64
      const base64Image = reader.result;

      // Upload to Imgur
      const response = await axios.post('http://localhost:8080/posts/upload-image', {
        image: base64Image
      });

      setFormData(prev => ({
        ...prev,
        picture: response.data.url
      }));
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.message || 'Failed to upload image. Please try again.');
      setImagePreview(null);
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Title is required');
      return false;
    }
    if (!formData.body.trim()) {
      setError('Body is required');
      return false;
    }
    if (!formData.flagsId) {
      setError('Category is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/posts/create', formData, {
        withCredentials: true
      });

      if (response.status === 201) {
        navigate(`/category/${formData.flagsId}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while creating the post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#1e1e2e] pt-16">
      <div className="w-full max-w-2xl p-8 bg-[#181825] rounded-lg shadow-lg">
        <h2 className="text-3xl text-[#89b4fa] font-bold text-center mb-8">Create Post</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-[#cdd6f4] text-sm font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#1e1e2e] border border-[#313244] rounded-md text-[#cdd6f4] focus:outline-none focus:ring-2 focus:ring-[#89b4fa] focus:border-transparent"
              placeholder="Enter post title"
            />
          </div>

          <div>
            <label htmlFor="body" className="block text-[#cdd6f4] text-sm font-medium mb-2">
              Content
            </label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              required
              rows="6"
              className="w-full px-4 py-2 bg-[#1e1e2e] border border-[#313244] rounded-md text-[#cdd6f4] focus:outline-none focus:ring-2 focus:ring-[#89b4fa] focus:border-transparent"
              placeholder="Write your post content here..."
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-[#cdd6f4] text-sm font-medium mb-2">
              Image (optional)
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 bg-[#1e1e2e] border border-[#313244] rounded-md text-[#cdd6f4] focus:outline-none focus:ring-2 focus:ring-[#89b4fa] focus:border-transparent"
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-full h-auto rounded-md"
                />
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`flex-1 py-2 px-4 bg-[#89b4fa] text-[#1e1e2e] font-medium rounded-md hover:bg-[#b4befe] transition-colors duration-300 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Creating...' : 'Create Post'}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 py-2 px-4 bg-[#313244] text-[#cdd6f4] font-medium rounded-md hover:bg-[#45475a] transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost; 