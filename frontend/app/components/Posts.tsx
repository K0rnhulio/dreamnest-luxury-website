'use client';

import { useEffect, useState } from 'react';
import { fetchCollection } from '../services/api';
import { NormalizedPost, normalizePosts } from '../utils/strapiAdapter';

export default function Posts() {
  const [posts, setPosts] = useState<NormalizedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rawData, setRawData] = useState<any>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        
        // Use fetchCollection instead of fetchContentType
        const response = await fetchCollection('posts');
        console.log('Posts response:', response);
        
        // Store raw data for debugging
        setRawData(response);
        
        // Use our adapter to normalize the data
        const normalizedPosts = normalizePosts(response);
        console.log('Normalized posts:', normalizedPosts);
        
        setPosts(normalizedPosts);
        
        if (normalizedPosts.length === 0 && response) {
          setError('Could not find any valid posts in the response. Check console for details.');
        } else {
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(`${err instanceof Error ? err.message : 'Failed to load posts. Please try again later.'}`);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <p>{error}</p>
        <div className="mt-3 text-sm">
          <p className="font-bold">Troubleshooting Steps:</p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Make sure Strapi is running at <code className="bg-red-100 px-1 py-0.5 rounded">http://localhost:1337</code></li>
            <li>Create a content type named "Post" (or "post") with fields for "title" and "content"</li>
            <li>Add and publish at least one post entry</li>
            <li>Ensure your content type has public permissions (Settings → Roles → Public → select permissions)</li>
            <li>Check the browser console for more detailed error information</li>
          </ol>
        </div>
        
        {rawData && (
          <div className="mt-4 p-3 bg-red-100 rounded overflow-auto max-h-48">
            <p className="font-bold mb-1">Raw API Response:</p>
            <pre className="text-xs">{JSON.stringify(rawData, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded relative" role="alert">
        <p>No posts found. Please create some posts in your Strapi admin panel.</p>
        <p className="mt-2 text-sm">
          <span className="font-bold">Remember:</span> After creating posts, make sure to publish them and set the appropriate permissions.
        </p>
        
        {rawData && (
          <div className="mt-4 p-3 bg-yellow-100 rounded overflow-auto max-h-48">
            <p className="font-bold mb-1">Raw API Response:</p>
            <pre className="text-xs">{JSON.stringify(rawData, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2 text-gray-800">{post.title}</h2>
            <p className="text-gray-600 mb-4">
              {post.content.length > 150
                ? `${post.content.substring(0, 150)}...`
                : post.content}
            </p>
            <div className="text-sm text-gray-500">
              Published: {new Date(post.publishedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
