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
 
  //category selection
  function handleChange(event) {
    setCurrCategory(event.target.value);
    
  }
  
  
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
