import { Link, NavLink } from "react-router";

export default function Header() {
  return (
    <header>
      <h1>
        <Link to="/">Router Mission Blog</Link>
      </h1>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/posts">Posts</NavLink>
        <NavLink to="/posts/new">Write</NavLink>
      </nav>
    </header>
  );
}
