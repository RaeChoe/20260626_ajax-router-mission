import { useState } from "react";

export default function PostNew({ onCreate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    onCreate({
      title,
      content,
    });
  };

  return (
    <div>
      <h2>글 작성 페이지</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>제목</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </div>

        <div>
          <label>내용</label>
          <textarea value={content} onChange={e => setContent(e.target.value)}></textarea>
        </div>

        <button>등록</button>
      </form>
    </div>
  );
}
