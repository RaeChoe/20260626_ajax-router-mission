import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router";

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

  useEffect(() => {
    fetch("./data/blog.json")
      .then(res => res.json()) // json -> object
      .then(result => {
        console.log(result);
        setPosts(result);
        setLoaded(true);
      });
  }, []);

  const handleDelete = _id => {
    console.log(_id);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout loaded={loaded} />}>
          <Route index element={<Home posts={posts} />} />
          <Route path="posts" element={<Posts posts={posts} />} />
          <Route path="posts/:id" element={<PostDetail posts={posts} onDelete={handleDelete} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
