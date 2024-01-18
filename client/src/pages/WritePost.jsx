import { useEffect, useState } from "react";

export default function WritePost() {
  const [formVal, setFormVal] = useState({
    title: "",
    content: "",
    tags: "#noTag",
    category: 1,
  });
  const [categories, setCategories] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("Form values: ", formVal);
    const res = await fetch("http://localhost:3333/writepost", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formVal),
    });
    const json = await res.json();
    console.log(json);
  }

  function handleChange(event) {
    setFormVal({
      ...formVal,
      [event.target.name]: event.target.value,
    });
  }
  //fetch categories
  async function handleGetCategories() {
    const res = await fetch("http://localhost:3333/categories");
    const data = await res.json();
    setCategories(data);
  }
  useEffect(() => {
    handleGetCategories();
  }, []);
  const categoryOptions = categories.map((category) => (
    <option value={category.id} key={category.id + category.name}>
      {category.name}
    </option>
  ));
  return (
    <div>
      <h2>Write Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Post title:</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={handleChange}
          value={formVal.title}
        />
        <label htmlFor="content">Write your message here:</label>
        <input
          type="text"
          name="content"
          id="content"
          onChange={handleChange}
          value={formVal.content}
        />
        <label htmlFor="tags">tags:</label>
        <input
          type="text"
          name="tags"
          id="tags"
          placeholder="separate with commas"
          onChange={handleChange}
          value={formVal.tags}
        />
        <select
          name="category"
          onChange={handleChange}
          value={formVal.category || 1}
          required
        >
          {categoryOptions}
        </select>
        <button type="submit">Post</button>
      </form>
      <h3>{formVal.title}</h3>
      <p>{formVal.content}</p>
      <p>{formVal.category}</p>
    </div>
  );
}
