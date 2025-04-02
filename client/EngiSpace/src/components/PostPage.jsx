import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const PostPage = () => {
  const { postId, flagId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/posts/${postId}`);
        setPost(response.data);
      } catch (err) {
        setError('Failed to load post. Please try again later.');
        console.error('Error fetching post:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#1e1e2e] pt-16">
        <div className="text-[#89b4fa] text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#1e1e2e] pt-16">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#1e1e2e] pt-16">
        <div className="text-[#89b4fa] text-xl">Post not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1e1e2e] pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#181825] rounded-lg overflow-hidden shadow-lg">
            {post.picture && (
              <div className="w-full h-96 relative">
                <img
                  src={post.picture}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-8">
              <h1 className="text-4xl text-[#89b4fa] font-bold mb-4">{post.title}</h1>
              
              <div className="flex items-center justify-between mb-6 text-[#a6adc8]">
                <div className="flex items-center space-x-2">
                  <span>Posted by</span>
                  <span className="font-medium text-[#89b4fa]">{post.author.username}</span>
                </div>
                <span>{new Date(post.createdAt).toLocaleString()}</span>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-[#cdd6f4] text-lg leading-relaxed whitespace-pre-wrap">
                  {post.body}
                </p>
              </div>

              <div className="mt-8 flex items-center space-x-4">
                <Link
                  to={`/category/${flagId}`}
                  className="text-[#89b4fa] hover:text-[#b4befe] transition-colors duration-300"
                >
                  ← Back to Category
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage; 