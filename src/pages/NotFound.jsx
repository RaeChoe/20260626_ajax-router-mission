import { Link } from "react-router";

export default function NotFound() {
  return (
    <div>
      <h2>404 Not Found</h2>
      <p>존재하지 않는 페이지입니다.</p>
      <Link to="/">홈으로 이동</Link>
    </div>
  );
}
