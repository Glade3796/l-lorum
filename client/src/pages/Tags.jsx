import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Tags({ posts }) {
  

  const { URLtag } = useParams();
  
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
