import { useState } from "react";
import { useParams } from "react-router";

export default function PostEdit({ posts, onEdit }) {
  const { id } = useParams();

  const detail = posts.find(p => p.id === Number(id));

  const [title, setTitle] = useState(detail ? detail.title : "");
  const [content, setContent] = useState(detail ? detail.content : "");

  const handleSubmit = e => {
    e.preventDefault();

    onEdit({
      ...detail,
      title,
      content,
    });
  };

  return (
    <div>
      <h2>글 수정 페이지</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>제목</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </div>

        <div>
          <label>내용</label>
          <textarea value={content} onChange={e => setContent(e.target.value)}></textarea>
        </div>

        <button type="submit">수정 완료</button>
      </form>
    </div>
  );
}
