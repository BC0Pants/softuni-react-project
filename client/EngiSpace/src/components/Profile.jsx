import React, { useState, useEffect } from 'react';
import { usePosts } from '../hooks/usePosts';
import { useComments } from '../hooks/useComments';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import PostCard from './PostCard';

const CommentCard = ({ comment }) => {
  if (!comment.post) {
    return (
      <div className="bg-[#181825] rounded-lg shadow-sm p-6">
        <p className="text-[#a6adc8] mb-2 line-clamp-3">{comment.content}</p>
        <div className="text-sm text-[#a6adc8]">
          Commented on {new Date(comment.createdAt).toLocaleDateString()}
        </div>
        <div className="text-sm text-[#f38ba8] mt-2">
          (Post no longer exists)
        </div>
      </div>
    );
  }

  if (!comment.post.flags || comment.post.flags.length === 0) {
    return (
      <div className="bg-[#181825] rounded-lg shadow-sm p-6">
        <p className="text-[#a6adc8] mb-2 line-clamp-3">{comment.content}</p>
        <div className="text-sm text-[#a6adc8]">
          Commented on {new Date(comment.createdAt).toLocaleDateString()}
        </div>
        <div className="text-sm text-[#f38ba8] mt-2">
          (Category no longer exists)
        </div>
      </div>
    );
  }

  return (
    <Link to={`/category/${comment.post.flags[0]._id}/posts/${comment.post._id}`} className="block">
      <div className="bg-[#181825] rounded-lg shadow-sm p-6 hover:bg-[#313244] transition-colors duration-300">
        <p className="text-[#a6adc8] mb-2 line-clamp-3">{comment.content}</p>
        <div className="text-sm text-[#a6adc8]">
          Commented on {new Date(comment.createdAt).toLocaleDateString()}
        </div>
      </div>
    </Link>
  );
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [userPosts, setUserPosts] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setCurrentUserId(payload.id);
      } catch (err) {
        console.error('Error parsing token:', err);
      }
    }
  }, []);

  useEffect(() => {
    const fetchUserContent = async () => {
      if (currentUserId) {
        setIsLoading(true);
        setError('');
        try {
          const [postsResponse, commentsResponse] = await Promise.all([
            axios.get('http://localhost:8080/posts/all', {
              headers: getAuthHeader()
            }),
            axios.get('http://localhost:8080/comments/all', {
              headers: getAuthHeader()
            })
          ]);
          
          setUserPosts(postsResponse.data.filter(post => post.author._id === currentUserId));
          setUserComments(commentsResponse.data.filter(comment => comment.author._id === currentUserId));
        } catch (err) {
          setError('Failed to load profile content. Please try again later.');
          console.error('Error fetching profile content:', err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserContent();
  }, [currentUserId]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!currentUserId) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1e1e2e] pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#89b4fa] mb-8">My Profile</h1>
          
          {/* Tabs */}
          <div className="bg-[#181825] rounded-lg shadow-sm mb-8">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('posts')}
                className={`${
                  activeTab === 'posts'
                    ? 'border-b-2 border-[#89b4fa] text-[#89b4fa]'
                    : 'text-[#a6adc8] hover:text-[#89b4fa]'
                } flex-1 py-4 px-6 text-center font-medium transition-colors duration-200`}
              >
                My Posts
              </button>
              <button
                onClick={() => setActiveTab('comments')}
                className={`${
                  activeTab === 'comments'
                    ? 'border-b-2 border-[#89b4fa] text-[#89b4fa]'
                    : 'text-[#a6adc8] hover:text-[#89b4fa]'
                } flex-1 py-4 px-6 text-center font-medium transition-colors duration-200`}
              >
                My Comments
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-[#181825] rounded-lg shadow-sm p-6">
                    <div className="h-6 bg-[#313244] rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-[#313244] rounded w-full mb-2"></div>
                    <div className="h-4 bg-[#313244] rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-[#181825] border border-[#f38ba8]/20 rounded-lg p-4 text-[#f38ba8]">
                {error}
              </div>
            ) : activeTab === 'posts' ? (
              <div>
                {userPosts.length === 0 ? (
                  <div className="bg-[#181825] rounded-lg shadow-sm p-6 text-center text-[#a6adc8]">
                    You haven't created any posts yet.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userPosts.map((post) => (
                      <div key={post._id}>
                        {post.flags && post.flags.length > 0 ? (
                          <PostCard post={post} flagId={post.flags[0]._id} />
                        ) : (
                          <div className="bg-[#181825] rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-[#89b4fa] mb-2">
                              {post.title}
                            </h2>
                            <p className="text-[#a6adc8] mb-4 line-clamp-3">{post.body}</p>
                            <div className="text-sm text-[#a6adc8]">
                              Posted on {new Date(post.createdAt).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-[#f38ba8] mt-2">
                              (Category no longer exists)
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                {userComments.length === 0 ? (
                  <div className="bg-[#181825] rounded-lg shadow-sm p-6 text-center text-[#a6adc8]">
                    You haven't made any comments yet.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userComments.map((comment) => (
                      <CommentCard key={comment._id} comment={comment} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 