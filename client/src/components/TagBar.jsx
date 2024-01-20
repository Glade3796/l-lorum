import { useEffect, useState } from "react";
import { Link, Outlet, } from "react-router-dom";

export default function TagBar({ showNewCat }) {
  const [taglist, setTaglist] = useState([]);
  const [search, setSearch] = useState("");

  async function handleGetTags() {
    const res = await fetch("https://lforum-server.onrender.com/taglist");
    const data = await res.json();
    setTaglist(data);
  }
  useEffect(() => {
    handleGetTags();
    
  }, [search]);

  //filter tags
  const filterTagsSet = new Set();

  taglist.forEach((tag) => {
    const tagLowerCase = tag.name.toLowerCase();
    if (
      search.toString() === "" ||
      tagLowerCase.includes(search.toLowerCase())
    ) {
      filterTagsSet.add(tagLowerCase);
    }
  });

  const uniqueTags = Array.from(filterTagsSet);

  const shuffledTags = uniqueTags.sort(
    () => !showNewCat && Math.random() - 0.5
  );

  const tags = shuffledTags.map((tagName, index) => (
    <Link key={index} to={`/tags/${tagName}`}>
      #{tagName}
    </Link>
  ));

  function handleInputChange(event) {
    setSearch(event.target.value);
  }
  return (
    <>
      <div className="tagbar">
        <input
          type="search"
          name="searchtag"
          id="searchtag"
          placeholder="search tags"
          onChange={handleInputChange}
        />
        <nav>{tags}</nav>
      </div>
      <Outlet />
    </>
  );
}
