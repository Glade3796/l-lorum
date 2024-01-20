import { useEffect } from "react";
import PostBox from "../components/PostBox";

export default function Posts({
  posts,
  categoryOptions,
  currCategory,
  setCurrCategory,
  handleGetCategories,
  handleGetPosts,
}) {
  //fetch posts
  console.log("posts curr cat", currCategory);
  //category selection
  function handleChange(event) {
    setCurrCategory(event.target.value);
    console.log(currCategory);
  }
  useEffect(() => {
    console.log("posts mounted");
    return () => console.log("posts unmounted");
  });
  return (
    <div className="content-box">
      <h2>Posts</h2>
      <label htmlFor="category">Select category:</label>
      <select name="category" onChange={handleChange}>
        {categoryOptions}
      </select>
      <PostBox
        posts={posts}
        currCategory={currCategory}
        handleGetCategories={handleGetCategories}
        handleGetPosts={handleGetPosts}
      />
    </div>
  );
}
