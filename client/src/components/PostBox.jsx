import { Link } from "react-router-dom";

export default function PostBox({ posts, currCategory, handleGetPosts }) {
  //populate page with posts incl tags and categories
  async function handleDelete(itemId) {
    const delItem = { id: itemId };
    const result = await fetch("https://lforum-server.onrender.com/del-post", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(delItem),
    });
    handleGetPosts();
  }
  
  
  const filteredPosts = posts.filter((post) => {
    return currCategory == 0 || post.category_id == currCategory;
  });

  
  const mappedPosts = filteredPosts.map((post) => (
    <div className="post-box" key={post.id + post.title}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <nav>
        {post.tag.map((tag, i) => (
          <Link key={i + tag} to={`/tags/${tag}`}>
            <i>#{tag}</i>
          </Link>
        ))}
      </nav>
      <button onClick={handleDelete.bind(null, post.id)}>x</button>
    </div>
  ));
  return <div className="post-area">{mappedPosts}</div>;
}
