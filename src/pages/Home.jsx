import { Link } from "react-router";

export default function Home({ posts }) {
  const recentPosts = posts.slice(-3).reverse();

  return (
    <section>
      <h2>소개</h2>
      <p>React Router로 목록/상세/작성/수정/삭제를 연습하는 미션입니다.</p>
      <h3>최신 글</h3>
      <ul>
        {recentPosts.map(p => (
          <li key={p.id}>
            <Link to={`/posts/${p.id}`}>{p.title}</Link>
            <span>{`(${p.createdAt})`}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
