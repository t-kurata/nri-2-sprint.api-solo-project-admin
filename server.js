const express = require("express");
const app = express();
const knex = require("./knex");

const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/admin", (_, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/admin/get", async (_, res) => {
  const data = await knex.select().from("ramen");
  res.status(200).send(JSON.stringify(data));
});

app.post("/admin/post", async (req, res) => {
  const body = req.body;

  await knex("ramen").insert({
    ramen_name: body.ramen_name,
    category: body.category,
    price: body.price,
    image: body.image,
  });
  res.status(200).send("追加完了");
});

app.post("/admin/patch", async (req, res) => {
  const body = req.body;

  if (body.category)
    await knex("ramen")
      .where({ ramen_name: body.ramen_name })
      .update({ category: body.category });
  if (body.price)
    await knex("ramen")
      .where({ ramen_name: body.ramen_name })
      .update({ price: body.price });
  if (body.image)
    await knex("ramen")
      .where({ ramen_name: body.ramen_name })
      .update({ image: body.image });
  res.status(200).send("更新完了");
});

app.post("/admin/delete", async (req, res) => {
  const body = req.body;

  await knex("ramen").where({ ramen_name: body.ramen_name }).del();
  res.status(200).send("削除完了");
});

// const port = 3000;
const port = 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});