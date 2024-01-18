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
  const { title, content, category, tags } = req.body;

  const result = await db.query(
    `INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *`,
    [title, content]
  );
  console.log("added post:", result.rows[0]);
  return result.rows[0];
});

//# generate category list
app.get("/categories", async (req, res) => {
  const result = await db.query(`SELECT * FROM categories`);
  res.json(result.rows);
  console.log("categories:", result.rows);
});

//# generate list of posts with categories and tags
app.get("/posts-tags-categories", async (req, res) => {
  const result = await db.query(
    `SELECT posts.id, posts.title, posts.content, categories.name AS category, ARRAY_AGG(tags.name) AS tag
        FROM posts
        JOIN categories ON posts.category_id = categories.id
        JOIN posts_tags ON posts.id = posts_tags.post_id
        JOIN tags ON posts_tags.tag_id = tags.id
        GROUP BY posts.id, posts.title, posts.content, categories.name`
  );
  res.json(result.rows);
  console.log("all posts:", result.rows);
});
//porty port
app.listen(PORT, () => {
  console.log(`up on ${PORT} `);
});
