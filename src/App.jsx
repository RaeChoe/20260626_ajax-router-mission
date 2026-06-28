import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import PostEdit from "./pages/PostEdit";
import PostNew from "./pages/PostNew";
import NotFound from "./pages/NotFound";

function App() {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    fetch("./data/blog.json")
      .then(res => res.json()) // json -> object
      .then(result => {
        console.log(result);
        setPosts(result);
        setLoaded(true);
      });
  }, []);

  const handleDelete = id => {
    if (window.confirm("정말 삭제할까요")) {
      setPosts(prev => prev.filter(item => item.id !== id));
      navigate("/posts");
    }
  };

  const handleAdd = post => {
    const newId = posts.length + 1;

    const newPost = {
      id: newId,
      title: post.title,
      content: post.content,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setPosts(prev => [...prev, newPost]);
    navigate("/posts");
  };

  const handleEdit = editPost => {
    setPosts(prev => prev.map(post => (post.id === editPost.id ? editPost : post)));

    navigate(`/posts/${editPost.id}`);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout loaded={loaded} />}>
          <Route index element={<Home posts={posts} />} />
          <Route path="posts" element={<Posts posts={posts} />} />
          <Route path="posts/new" element={<PostNew posts={posts} onCreate={handleAdd} />} />
          <Route path="posts/:id" element={<PostDetail posts={posts} onDelete={handleDelete} />} />
          <Route path="posts/:id/edit" element={<PostEdit posts={posts} onEdit={handleEdit} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
