import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import { useImgurUpload } from '../hooks/useImgurUpload';

const CreatePost = () => {
  const navigate = useNavigate();
  const { flagId } = useParams();
  const { createPost, error: postError, isLoading: postLoading } = usePosts();
  const { uploadImage, isUploading, uploadError } = useImgurUpload();
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    picture: '',
    flagsId: flagId
  });
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    setSelectedFile(file);
    setError('');
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
    setError('');

    if (!validateForm()) {
      return;
    }

    try {
      let pictureUrl = '';
      if (selectedFile) {
        pictureUrl = await uploadImage(selectedFile);
        if (!pictureUrl) throw new Error(uploadError || 'Image upload failed');
      }

      const success = await createPost({
        ...formData,
        picture: pictureUrl
      });

      if (success) {
        navigate(`/category/${formData.flagsId}`);
      } else {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
        }
      }
    } catch (err) {
      setError(err.message || 'An error occurred while creating the post. Please try again.');
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      }
    }
  };

  const isLoading = postLoading || isUploading;

  return (
    <div className="min-h-screen bg-[#1e1e2e] pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl text-[#89b4fa] font-bold mb-8">Create New Post</h1>
          
          {(error || postError) && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-500">
              {error || postError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-[#a6adc8] mb-2">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 rounded bg-[#313244] text-[#cdd6f4] border border-[#45475a] focus:outline-none focus:border-[#89b4fa]"
                required
              />
            </div>

            <div>
              <label htmlFor="body" className="block text-[#a6adc8] mb-2">Content</label>
              <textarea
                id="body"
                name="body"
                value={formData.body}
                onChange={handleChange}
                rows="6"
                className="w-full p-2 rounded bg-[#313244] text-[#cdd6f4] border border-[#45475a] focus:outline-none focus:border-[#89b4fa]"
                required
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-[#a6adc8] mb-2">Image (optional)</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 rounded bg-[#313244] text-[#cdd6f4] border border-[#45475a] focus:outline-none focus:border-[#89b4fa]"
              />
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full h-auto rounded"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate(`/category/${flagId}`)}
                className="px-4 py-2 text-[#a6adc8] hover:text-[#89b4fa] transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-[#89b4fa] text-[#1e1e2e] rounded hover:bg-[#74c7ec] transition-colors duration-300 disabled:opacity-50"
              >
                {isLoading ? 'Creating...' : 'Create Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;