import { useState, useEffect } from "react";

export default function NewCategory({ setShowNewCat }) {
  const [newCategory, setNewCategory] = useState("");
  console.log("mount");

  async function handleClick(event) {
    event.preventDefault();
    console.log("raw", newCategory);
    const newEntry = { name: newCategory };
    try {
      const res = await fetch("http://localhost:3333/newcategory", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newEntry),
      })
        .then(setNewCategory(""))
        .then(
          setTimeout(() => {
            setShowNewCat(false);
          }, 100)
        );

      if (res.ok) {
        const json = await res.json();
        console.log("json?", json);
      } else {
        console.error("Failed to add new category");
      }
    } catch (error) {
      console.error("Error adding new category:", error);
    }
  }
  function handleInputChange(event) {
    setNewCategory(event.target.value);
  }
  useEffect(() => {
    // handleGetCategories();
    return () => console.log("new category unmounted");
  }, []);
  return (
    <>
      <input
        type="text"
        name="newCategory"
        onChange={handleInputChange}
        autoFocus
        placeholder="category"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleClick();
        }}
      />
      <button type="submit" onClick={handleClick}>
        add category
      </button>
    </>
  );
}
