import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <h1>l forum </h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/write">New post</Link>
        <Link to="/posts">View posts</Link>
      </nav>
    </header>
  );
}
