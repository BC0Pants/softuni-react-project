import { useState } from 'react';
import axios from 'axios';
const CLIENT_ID = import.meta.env.VITE_IMGUR_CLIENT_ID;

export const useImgurUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const uploadImage = async (imageFile) => {
    setIsUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('type', 'file');

    try {
      const response = await axios.post('https://api.imgur.com/3/image', formData, {
        headers: {
          Authorization: `Client-ID ec69ffada17d32d`, // Replace with your actual Client ID
        },
      });

      setImageUrl(response.data.data.link);
    } catch (error) {
      setUploadError(error);
    } finally {
      setIsUploading(false);
    }
  };

  return { isUploading, uploadError, imageUrl, uploadImage };
};
