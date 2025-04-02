import { useState } from 'react';
import axios from 'axios';

export const useComments = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  };

  const createComment = async (postId, content) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(
        `http://localhost:8080/comments/create/${postId}`,
        { content },
        {
          headers: getAuthHeader()
        }
      );

      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post comment');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(
        `http://localhost:8080/comments/${commentId}`,
        {
          headers: getAuthHeader()
        }
      );
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete comment');
      return false;
    }
  };

  const editComment = async (commentId, content) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/comments/${commentId}`,
        { content },
        {
          headers: getAuthHeader()
        }
      );
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to edit comment');
      return null;
    }
  };

  return {
    error,
    isLoading,
    createComment,
    deleteComment,
    editComment
  };
}; 