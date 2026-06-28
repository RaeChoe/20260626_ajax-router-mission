import { Link } from "react-router";
import PostDetail from "./PostDetail";

export default function Posts({ posts }) {
  const post = posts.map(p => (
    <li key={p.id}>
      <Link to={`/posts/${p.id}`}>{p.title}</Link>
      <span>{p.createdAt}</span>
    </li>
  ));

  return (
    <div>
      <h2>글 목록 페이지</h2>
      <ul>{post}</ul>
      <Link to="/posts/new">
        <button>글 작성</button>
      </Link>
    </div>
  );
}
