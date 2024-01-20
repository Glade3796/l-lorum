//express = server, cors = middleware, pg=database, dotenv=db location
import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

//initalise express :)
const PORT = 3333;
const app = express();
app.use(cors());
app.use(express.json());
// pg location in .env
dotenv.config();

//connnect to db
const dbConnectionString = process.env.DATABASE_URL;
const db = new pg.Pool({ connectionString: dbConnectionString });

//endpoints
app.get("/", (req, res) => {
  res.json("root");
});

//# test (show posts with category)
app.get("/test", async (rew, res) => {
  const result = await db.query(`
  SELECT posts.title, posts.content, categories.name AS category FROM posts JOIN categories ON posts.category_id = categories.id`);
  req.json(result.rows);
});

//# new post
app.post("/writepost", async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;

    // Insert into posts table
    const postResult = await db.query(
      "INSERT INTO posts (title, content, category_id) VALUES ($1, $2, $3) RETURNING id",
      [title, content, category]
    );
    const postId = postResult.rows[0].id;

    // Insert tags into tags table and associate with post in post_tags table
    for (const tagName of tags) {
      // Step 2.1: Insert into tags table
      await db.query("INSERT INTO tags (name) VALUES ($1)", [tagName]);

      // Retrieve tagId for existing or newly inserted tag
      const tagResult = await db.query("SELECT id FROM tags WHERE name = $1", [
        tagName,
      ]);

      //  Insert into posts_tags table
      if (tagResult.rows.length > 0) {
        const tagId = tagResult.rows[0].id;
        await db.query(
          "INSERT INTO posts_tags (post_id, tag_id) VALUES ($1, $2)",
          [postId, tagId]
        );
      }
    }

    console.log("Post and tags inserted successfully");
    res.status(201).json({ success: true, postId });
  } catch (error) {
    console.error("Error trying to post", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
//# del item
app.post("/del-post", async (req, res) => {
  const { id } = req.body;
  await db.query("DELETE FROM posts WHERE id = $1", [id]);
  res.json({ success: true, message: "Row deleted successfully" });
});
//# new category
app.post("/newcategory", async (req, res) => {
  const { name } = req.body;
  const result = await db.query(
    `INSERT INTO categories (name) VALUES ($1) RETURNING *`,
    [name]
  );
  console.log("added category:", result.rows[0]);
  return result.rows[0];
});

//# generate category list
app.get("/categories", async (req, res) => {
  const result = await db.query(`SELECT * FROM categories`);
  res.json(result.rows);
  console.log("categories:", result.rows);
});
//# generate taglist
app.get("/taglist", async (req, res) => {
  const result = await db.query(`SELECT * FROM tags
    `);
  res.json(result.rows);
  console.log("tags", result.rows);
});
//# generate list of posts with categories and tags
app.get("/posts-tags-categories", async (req, res) => {
  const result = await db.query(
    `SELECT
    posts.id,
    posts.title,
    posts.content,
    categories.id AS category_id, -- Include the category_id
    categories.name AS category,
    ARRAY_AGG(tags.name) AS tag
  FROM
    posts
  JOIN
    categories ON posts.category_id = categories.id
  JOIN
    posts_tags ON posts.id = posts_tags.post_id
  JOIN
    tags ON posts_tags.tag_id = tags.id
  GROUP BY
    posts.id, posts.title, posts.content, categories.id, categories.name;
  `
  );
  res.json(result.rows);
  console.log("all posts:", result.rows);
});
//porty port
app.listen(PORT, () => {
  console.log(`up on https://lforum-server.onrender.com/ `);
});
