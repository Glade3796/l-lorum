import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Tags({ posts }) {
  useEffect(() => {
    console.log("tags mounted");

    // Cleanup function to run when component is unmounted
    return () => {
      console.log("tags unmounted");
    };
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const { URLtag } = useParams();
  console.log("urlTag:", URLtag);
  console.log("tags", posts);
  // Filter posts based on the URL parameter
  const filteredPosts = posts.filter((post) => {
    return post.tag
      .map((tag) => tag.toLowerCase())
      .includes(URLtag.toLowerCase());
  });

  const postList = filteredPosts.map((post) => (
    <div className="post-box" key={post.id + post.title}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>

      {post.tag.map((tag, i) => (
        <nav key={i + tag}>
          <Link to={`/tags/${tag}`}>#{tag} </Link>
        </nav>
      ))}
    </div>
  ));

  return (
    <div className="content-box">
      <h2>{URLtag}</h2>
      {postList}
    </div>
  );
}
