import { useState, useEffect, useMemo } from "react";
import "./App.css";
import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import NotFound from "./pages/NotFound";
import PostNew from "./pages/PostNew";
import PostEdit from "./pages/PostEdit";

function App() {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // let alive = true; // 상품 조회 시작...열일 중
    // AbortController mdn
    const controller = new AbortController();

    async function fetchData() {
      try {
        // 절대경로로 적어야 어느 페이지에서도 로드시 안전
        const res = await fetch(`${import.meta.env.BASE_URL}/data/blog.json`, {
          signal: controller.signal,
        });
        // !res.ok : res.ok === false
        if (!res.ok) throw new Error("데이터 로딩 실패");
        const data = await res.json();
        setPosts(data);
      } catch (e) {
        console.error(e);
        setPosts([]); // 에러시 목록 비움
      } finally {
        setLoaded(true);
      }
    }
    fetchData();

    return () => {
      // 정리함수 : 컴포넌트가 삭제, 의존성 배열 변경시 작동
      // alive = false;
      controller.abort(); // 취소
    };
  }, []);

  const onDelete = _id => {
    setPosts(prev => prev.filter(post => post.id !== _id));
  };

  // useMemo : 최초 1회 실행, 의존성 배열 변경시 실행
  const newId = useMemo(() => {
    const maxId = posts.reduce((acc, currnet) => {
      return Math.max(acc, currnet.id);
    }, 0);
    return maxId + 1;
  }, [posts]);
  const onCreate = ({ _title, _content }) => {
    const newPost = {
      title: _title,
      content: _content,
      id: newId,
      createAt: new Date().toISOString.slice[(0, 10)],
    };
    setPosts(prev => [...prev, newPost]);
    return newPost.id;
  };

  const onUpdate = (_id, { title, content }) => {
    setPosts(prev =>
      prev.map(p =>
        p.id === _id
          ? {
              ...p, // 배열을 풀어헤쳐서 title과 content에 새내용 넣기
              title: title,
              content: content,
            }
          : p,
      ),
    );
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout loaded={loaded} />}>
          <Route index element={<Home posts={posts} />} />
          <Route path="posts" element={<Posts posts={posts} />} />
          <Route path="posts/:id" element={<PostDetail posts={posts} onDelete={onDelete} />} />
          <Route path="posts/edit/:id" element={<PostEdit posts={posts} onUpdate={onUpdate} />} />
          <Route path="posts/new" element={<PostNew onCreate={onCreate} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
