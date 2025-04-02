import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import { useComments } from '../hooks/useComments';

const PostPage = () => {
  const { postId, flagId } = useParams();
  const { post, error: postError, isLoading: postLoading, getPostById, likePost } = usePosts();
  const { error: commentError, isLoading: commentLoading, createComment, deleteComment, editComment } = useComments();
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    getPostById(postId);
  }, [postId]);

  useEffect(() => {
    if (post) {
      setComments(post.comments || []);
    }
  }, [post]);

  useEffect(() => {
    // Get current user ID from token
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

  const handleLike = async () => {
    try {
      const success = await likePost(postId);
      if (success) {
        // The post state will be updated by the hook
      }
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    try {
      const newComment = await createComment(postId, commentContent);
      if (newComment) {
        setComments(prev => [newComment, ...prev]);
        setCommentContent('');
      }
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const success = await deleteComment(commentId);
      if (success) {
        setComments(prev => prev.filter(comment => comment._id !== commentId));
      }
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  const handleEditComment = async (commentId) => {
    try {
      const updatedComment = await editComment(commentId, editContent);
      if (updatedComment) {
        setComments(prev => prev.map(comment => 
          comment._id === commentId ? updatedComment : comment
        ));
        setEditingComment(null);
        setEditContent('');
      }
    } catch (err) {
      console.error('Error editing comment:', err);
    }
  };

  const startEditing = (comment) => {
    setEditingComment(comment._id);
    setEditContent(comment.content);
  };

  const cancelEditing = () => {
    setEditingComment(null);
    setEditContent('');
  };

  const isLoading = postLoading || commentLoading;
  const error = postError || commentError;

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

  const isLiked = post.likes?.includes(currentUserId);

  return (
    <div className="min-h-screen bg-[#1e1e2e] pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              to={`/category/${flagId}`}
              className="text-[#89b4fa] hover:text-[#74c7ec] mb-4 inline-block"
            >
              ← Back to Category
            </Link>
            <h1 className="text-3xl text-[#89b4fa] font-bold mb-4">{post.title}</h1>
            <div className="flex items-center text-[#a6adc8] mb-4">
              <span>Posted by {post.author?.username}</span>
              <span className="mx-2">•</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            {post.picture && (
              <img
                src={post.picture}
                alt={post.title}
                className="w-full h-auto rounded-lg mb-6"
              />
            )}
            <p className="text-[#cdd6f4] whitespace-pre-wrap">{post.body}</p>
            <div className="mt-6 flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-[#cdd6f4] ${
                  isLiked 
                    ? 'bg-[#89b4fa]' 
                    : 'bg-[#313244] hover:bg-[#45475a]'
                } transition-colors duration-300`}
              >
                <span className="text-2xl">&#10084;</span>
                <span>{post.likes?.length || 0}</span>
              </button>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl text-[#89b4fa] font-bold mb-6">Comments</h2>
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="Write a comment..."
                className="w-full p-3 rounded bg-[#313244] text-[#cdd6f4] border border-[#45475a] focus:outline-none focus:border-[#89b4fa] mb-4"
                rows="3"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#89b4fa] text-[#1e1e2e] rounded hover:bg-[#74c7ec] transition-colors duration-300"
              >
                Post Comment
              </button>
            </form>

            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment._id} className="bg-[#181825] p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-[#89b4fa] font-medium">{comment.author?.username}</span>
                      <span className="text-[#a6adc8] text-sm ml-2">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {currentUserId === comment.author?._id && (
                      <div className="flex space-x-2">
                        {editingComment === comment._id ? (
                          <>
                            <button
                              onClick={() => handleEditComment(comment._id)}
                              className="text-[#89b4fa] hover:text-[#74c7ec] text-xl"
                            >
                              &#10003;
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="text-[#a6adc8] hover:text-[#89b4fa] text-xl"
                            >
                              &#10005;
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEditing(comment)}
                              className="text-[#89b4fa] hover:text-[#74c7ec]"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteComment(comment._id)}
                              className="text-red-500 hover:text-red-400"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 448 512"
                                fill="currentColor"
                              >
                                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                              </svg>
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  {editingComment === comment._id ? (
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full p-2 rounded bg-[#313244] text-[#cdd6f4] border border-[#45475a] focus:outline-none focus:border-[#89b4fa]"
                      rows="3"
                    />
                  ) : (
                    <p className="text-[#cdd6f4]">{comment.content}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage; 