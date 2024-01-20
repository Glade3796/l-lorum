import { useState } from "react";
import NewCategory from "../components/NewCategory";

export default function WritePost({
  categoryOptions,
  handleGetCategories,
  showNewCat,
  setShowNewCat,
}) {
  const [formVal, setFormVal] = useState({
    title: "",
    content: "",
    tags: "tag",
    category: 1,
  });
  const [submitted, setSubmitted] = useState(false);
  async function handleSubmit(event) {
    setSubmitted(true);
    event.preventDefault();
    console.log("Form values: ", formVal);
    const res = await fetch("https://lforum-server.onrender.com/writepost", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formVal),
    });
    setFormVal({
      title: "",
      content: "",
      tags: "tag",
      category: 1,
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 700);
  }
  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "tags") {
      // If the target is the 'tags' field, split the string into an array
      const tagsArray = value.split(/[^a-zA-Z0-9]+/).map((tag) => tag.trim());
      setFormVal((prevFormVal) => ({
        ...prevFormVal,
        [name]: tagsArray,
      }));
    } else {
      // For other fields, update the form value as usual
      setFormVal((prevFormVal) => ({
        ...prevFormVal,
        [name]: value,
      }));
    }
  }

  return (
    <div className="content-box">
      <h2>Write Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="title">
          <label htmlFor="title">Post title:</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            value={formVal.title}
          />
        </div>
        <label htmlFor="content">Write your message here:</label>
        <input
          type="text"
          name="content"
          id="content"
          onChange={handleChange}
          value={formVal.content}
        />
        <div>
          <label htmlFor="tags">tags:</label>
          <input
            type="text"
            name="tags"
            id="tags"
            placeholder="separate with commas"
            onChange={handleChange}
            value={formVal.tags}
          />
        </div>
        <div>
          {showNewCat && (
            <NewCategory
              setShowNewCat={setShowNewCat}
              handleGetCategories={handleGetCategories}
            />
          )}
          <select
            name="category"
            onChange={handleChange}
            value={formVal.category || 1}
            required
            hidden={showNewCat}
          >
            {categoryOptions}
          </select>
          <button
            onClick={(event) => {
              event.preventDefault();
              setShowNewCat(!showNewCat);
            }}
          >
            {!showNewCat ? "add category" : "cancel"}
          </button>
        </div>
        <button disabled={showNewCat} type="submit">
          Post
        </button>
        {submitted && <p>post submitted!</p>}
      </form>
    </div>
  );
}
