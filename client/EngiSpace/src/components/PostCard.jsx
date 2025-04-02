import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post, flagId }) => {
  return (
    <Link
      to={`/category/${flagId}/posts/${post._id}`}
      className="block bg-[#181825] p-6 rounded-lg hover:bg-[#313244] transition-colors duration-300"
    >
      <h3 className="text-xl text-[#89b4fa] font-semibold mb-2">{post.title}</h3>
      <p className="text-[#a6adc8] mb-4">{post.body.substring(0, 200)}</p>
      <div className="flex justify-between items-center text-sm text-[#a6adc8]">
        <span>Posted by {post.author?.username}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
    </Link>
  );
};

export default PostCard; 