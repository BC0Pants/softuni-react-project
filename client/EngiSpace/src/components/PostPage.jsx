import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const PostPage = () => {
  const { postId, flagId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/posts/${postId}`);
        setPost(response.data);
        setComments(response.data.comments || []);
      } catch (err) {
        setError('Failed to load post. Please try again later.');
        console.error('Error fetching post:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to like posts');
        return;
      }

      const response = await axios.post(
        `http://localhost:8080/posts/${postId}/like`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setPost(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to like post');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to comment');
        return;
      }

      const response = await axios.post(
        `http://localhost:8080/comments/create/${postId}`,
        { content: commentContent },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      setComments(prev => [response.data, ...prev]);
      setCommentContent('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to delete comments');
        return;
      }

      await axios.delete(
        `http://localhost:8080/comments/${commentId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      setComments(prev => prev.filter(comment => comment._id !== commentId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete comment');
    }
  };

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

  const isLiked = post.likes?.includes(localStorage.getItem('userId'));

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
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-300 ${
                    isLiked
                      ? 'bg-[#89b4fa] text-[#1e1e2e]'
                      : 'bg-[#313244] text-[#cdd6f4] hover:bg-[#45475a]'
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{post.likes?.length || 0}</span>
                </button>
                <Link
                  to={`/category/${flagId}`}
                  className="text-[#89b4fa] hover:text-[#b4befe] transition-colors duration-300"
                >
                  ← Back to Category
                </Link>
              </div>

              {/* Comments Section */}
              <div className="mt-12">
                <h2 className="text-2xl text-[#89b4fa] font-bold mb-6">Comments</h2>
                
                {/* Comment Form */}
                <form onSubmit={handleCommentSubmit} className="mb-8">
                  <textarea
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full px-4 py-2 bg-[#1e1e2e] border border-[#313244] rounded-md text-[#cdd6f4] focus:outline-none focus:ring-2 focus:ring-[#89b4fa] focus:border-transparent mb-4"
                    rows="3"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !commentContent.trim()}
                    className={`px-4 py-2 bg-[#89b4fa] text-[#1e1e2e] rounded-md hover:bg-[#b4befe] transition-colors duration-300 ${
                      (isSubmitting || !commentContent.trim()) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Posting...' : 'Post Comment'}
                  </button>
                </form>

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment._id} className="bg-[#1e1e2e] p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="flex flex-col">
                            <span className="font-medium text-[#89b4fa]">{comment.author.username}</span>
                            <span className="text-xs text-[#a6adc8]">
                              {new Date(comment.createdAt).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        {comment.author._id === localStorage.getItem('userId') && (
                          <button
                            onClick={() => handleDeleteComment(comment._id)}
                            className="text-red-500 hover:text-red-400 transition-colors duration-300"
                            title="Delete comment"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                      <p className="text-[#cdd6f4] mt-2">{comment.content}</p>
                    </div>
                  ))}
                  {comments.length === 0 && (
                    <p className="text-[#a6adc8] text-center">No comments yet. Be the first to comment!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage; 