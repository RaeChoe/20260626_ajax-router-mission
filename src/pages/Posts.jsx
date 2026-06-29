import { Link } from "react-router";

export default function Posts({ posts }) {
  const sorted = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <section>
      <h2>글 목록</h2>
      {posts.length === 0 ? (
        <>
          <p>글이 없습니다.</p>
        </>
      ) : (
        <ul>
          {sorted.map(p => (
            <li key={p.id}>
              <Link to={`/posts/${p.id}`}>{p.title}</Link>
              {p.createdAt}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
