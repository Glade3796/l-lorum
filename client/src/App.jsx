import { Route, Routes, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import WritePost from "./pages/WritePost";
import { useState, useEffect } from "react";
import TagBar from "./components/TagBar";
import Tags from "./pages/Tags";

export default function App() {
  const [categories, setCategories] = useState([]);
  const [showNewCat, setShowNewCat] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currCategory, setCurrCategory] = useState(0);
  //fetch categories
  async function handleGetCategories() {
    const res = await fetch("https://lforum-server.onrender.com/categories");
    const data = await res.json();
    const defCat = { id: 0, name: "ALL" };

    setCategories([defCat, ...data]);
  }
  useEffect(() => {
    handleGetCategories();
    handleGetPosts();
    ;
  }, [currCategory]);

  const categoryOptions = categories.map((category) => (
    <option value={category.id} key={category.id + category.name}>
      {category.name}
    </option>
  ));
  
  //fetch posts
  async function handleGetPosts() {
    const res = await fetch("https://lforum-server.onrender.com/posts-tags-categories");
    const data = await res.json();
    setPosts(data);
  }
  return (
    <div>
      <Header></Header>
      <TagBar showNewCat={showNewCat} />
      <div className="flex-center">
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route
            path="/write"
            element={
              <WritePost
                showNewCat={showNewCat}
                setShowNewCat={setShowNewCat}
                categoryOptions={categoryOptions}
                handleGetCategories={handleGetCategories}
              />
            }
          />
          <Route
            path="/posts"
            element={
              <Posts
                handleGetCategories={handleGetCategories}
                categoryOptions={categoryOptions}
                posts={posts}
                setPosts={setPosts}
                handleGetPosts={handleGetPosts}
                currCategory={currCategory}
                setCurrCategory={setCurrCategory}
                setCategories={setCategories}
              />
            }
          />
          <Route
            path="/tags/:URLtag"
            element={
              <Tags
                posts={posts}
                setPosts={setPosts}
                handleGetPosts={handleGetPosts}
              />
            }
          />
          {/* <Route
          path="/tags"
          element={
            <Tags
              posts={posts}
              setPosts={setPosts}
              handleGetPosts={handleGetPosts}
            />
          }
        /> */}
          <Route path="*" element={<h2> 404 Not found</h2>} />
        </Routes>
      </div>
      <Outlet />
    </div>
  );
}
