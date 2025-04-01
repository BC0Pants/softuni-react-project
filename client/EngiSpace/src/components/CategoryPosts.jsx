import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const CategoryPosts = () => {
  const { flagId } = useParams();
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsResponse, flagsResponse] = await Promise.all([
          axios.get(`http://localhost:8080/posts/by-flag/${flagId}`),
          axios.get('http://localhost:8080/flags/all')
        ]);
        
        setPosts(postsResponse.data);
        const currentCategory = flagsResponse.data.find(flag => flag._id === flagId);
        setCategory(currentCategory);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [flagId]);

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

  return (
    <div className="min-h-screen bg-[#1e1e2e] pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl text-[#89b4fa] font-bold">{category?.name || 'Category'}</h1>
          <Link
            to="/category/:flagId/posts/create-post"
            className="bg-[#89b4fa] text-[#1e1e2e] px-6 py-2 rounded-md hover:bg-[#b4befe] transition-colors duration-300"
          >
            Create Post
          </Link>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {posts.map((post) => (
            <Link
              key={post._id}
              to={`/post/${post._id}`}
              className="block bg-[#181825] p-6 rounded-lg hover:bg-[#313244] transition-colors duration-300"
            >
              <h3 className="text-xl text-[#89b4fa] font-semibold mb-2">{post.title}</h3>
              <p className="text-[#a6adc8] mb-4 line-clamp-2">{post.body}</p>
              <div className="flex items-center justify-between text-sm text-[#a6adc8]">
                <span>Posted by {post.author.username}</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPosts; 