import { Link } from "react-router-dom";

export default function PostBox({ posts, currCategory, handleGetPosts }) {
  //populate page with posts incl tags and categories
  async function handleDelete(itemId) {
    const delItem = { id: itemId };
    const result = await fetch("http://localhost:3333/del-post", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(delItem),
    });
    handleGetPosts();
  }
  if (posts == !null) {
    console.log("postbox", posts[0].category_id);
  }
  console.log("pb curr cat", currCategory);
  const filteredPosts = posts.filter((post) => {
    return currCategory == 0 || post.category_id == currCategory;
  });

  console.log(";current category", currCategory);
  console.log("Filtered Posts:", filteredPosts);
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
