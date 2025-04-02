import { useState } from "react";
import { Client, Storage, ID } from "appwrite";
import { appwriteConfig } from "../utils/config";

export const useAppwriteUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  // Initialize Appwrite client
  const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId);

  // Initialize Storage service
  const storage = new Storage(client);

  const uploadImage = async (file) => {
    setIsUploading(true);
    setUploadError(null);

    try {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        throw new Error("Please select an image file");
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("Image size should be less than 5MB");
      }

      // Upload file to Appwrite bucket
      const response = await storage.createFile(
        appwriteConfig.storageId,
        ID.unique(),
        file
      );

      // Get file view URL instead of preview
      const fileUrl = storage.getFileView(
        appwriteConfig.storageId,
        response.$id
      );

      setIsUploading(false);
      return fileUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadError(error.message || "Failed to upload image");
      setIsUploading(false);
      throw error;
    }
  };

  return {
    uploadImage,
    isUploading,
    uploadError,
  };
};
