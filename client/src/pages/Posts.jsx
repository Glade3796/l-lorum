import { useEffect, useState } from "react";
import PostBox from "../components/PostBox";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  //fetch posts
  async function handleGetPosts() {
    const res = await fetch("http://localhost:3333/posts-tags-categories");
    const data = await res.json();
    setPosts(data);
  }
  useEffect(() => {
    handleGetPosts();
  }, []);
  return (
    <div>
      <h2>Posts</h2>
      <PostBox posts={posts} />
    </div>
  );
}
