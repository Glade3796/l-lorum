export default function PostBox({ posts }) {
  const postBox = posts.map((post) => (
    <div key={post.id + post.title}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <p>
        {post.tag.map((tag) => (
          <i key={tag}>{tag}</i>
        ))}
      </p>
      <p>{post.category}</p>
    </div>
  ));
  return (
    <div>
      <h3>postbox</h3>
      {postBox}
    </div>
  );
}
