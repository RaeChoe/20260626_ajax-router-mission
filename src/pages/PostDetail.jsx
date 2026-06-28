import { useParams, useNavigate, Link } from "react-router";

export default function PostDetail({ posts, onDelete }) {
  let { id } = useParams();
  console.log(id);
  const detail = posts.find(p => p.id === Number(id));
  let navigate = useNavigate();

  return (
    <div>
      <h2>글 상세 페이지</h2>
      <h3>{detail.title}</h3>
      <p>{detail.content}</p>
      <p>{detail.createdAt}</p>

      <Link to={`/posts/${detail.id}/edit`}>
        <button>수정</button>
      </Link>
      <button
        onClick={() => {
          onDelete(detail.id);
        }}
      >
        삭제
      </button>
    </div>
  );
}
