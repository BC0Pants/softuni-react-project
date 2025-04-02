import { useState, useEffect } from 'react';
import axios from 'axios';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  };

  const getAllPosts = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.get('http://localhost:8080/posts/all');
      setPosts(response.data);
    } catch (err) {
      setError('Failed to load posts. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPostsByFlag = async (flagId) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.get(`http://localhost:8080/posts/by-flag/${flagId}`);
      setPosts(response.data);
    } catch (err) {
      setError('Failed to load posts. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPostById = async (postId) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.get(`http://localhost:8080/posts/${postId}`);
      setPost(response.data);
    } catch (err) {
      setError('Failed to load post. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const createPost = async (postData) => {
    setIsLoading(true);
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to create a post');
      setIsLoading(false);
      return false;
    }

    try {
      const response = await axios.post('http://localhost:8080/posts/create', postData, {
        headers: getAuthHeader(),
        withCredentials: true
      });

      if (response.status === 201) {
        return true;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const likePost = async (postId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/posts/${postId}/like`,
        {},
        {
          headers: getAuthHeader()
        }
      );
      setPost(response.data);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to like post');
      return false;
    }
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(
        `http://localhost:8080/posts/${postId}`,
        {
          headers: getAuthHeader()
        }
      );
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete post');
      return false;
    }
  };

  const updatePost = async (postId, postData) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/posts/${postId}`,
        postData,
        {
          headers: getAuthHeader()
        }
      );
      setPost(response.data);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post');
      return false;
    }
  };

  return {
    posts,
    post,
    error,
    isLoading,
    getAllPosts,
    getPostsByFlag,
    getPostById,
    createPost,
    likePost,
    deletePost,
    updatePost
  };
}; 