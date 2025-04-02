import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import { useFlags } from '../hooks/useFlags';

const CategoryPosts = () => {
  const { flagId } = useParams();
  const { posts, error: postsError, isLoading: postsLoading, getPostsByFlag } = usePosts();
  const { flags, error: flagsError, isLoading: flagsLoading, getAllFlags } = useFlags();
  const [category, setCategory] = React.useState(null);

  useEffect(() => {
    getPostsByFlag(flagId);
    getAllFlags();
  }, [flagId]);

  useEffect(() => {
    if (flags.length > 0) {
      const currentCategory = flags.find(flag => flag._id === flagId);
      setCategory(currentCategory);
    }
  }, [flags, flagId]);

  const isLoading = postsLoading || flagsLoading;
  const error = postsError || flagsError;

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
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl text-[#89b4fa] font-bold">{category?.name || 'Category'}</h1>
            <Link
              to={`/category/${flagId}/posts/create-post`}
              className="px-4 py-2 bg-[#89b4fa] text-[#1e1e2e] rounded hover:bg-[#74c7ec] transition-colors duration-300"
            >
              Create Post
            </Link>
          </div>
          {category?.description && (
            <p className="text-[#a6adc8]">{category.description}</p>
          )}
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {posts.map((post) => (
            <Link
              key={post._id}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPosts; 