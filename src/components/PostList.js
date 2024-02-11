import { useState, useEffect } from 'react';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
        const data = await response.json();
        setPosts(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
<div class="flex flex-col">
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="inline-block center py-2 sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table
          class="min-w-1 border text-center text-sm font-light dark:border-neutral-500">
          <thead class="border-b font-medium dark:border-neutral-500">
            <tr>
              <th
                scope="col"
                class="border-r px-6 py-4 dark:border-neutral-500">
                ID
              </th>
              <th
                scope="col"
                class="border-r px-6 py-4 dark:border-neutral-500">
                Title
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
            <tr class="border-b dark:border-neutral-500" key={post.id}>
              <td
                class="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                {post.id}
              </td>
              <td
                class="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                {post.title}
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  );
}

export default PostList;