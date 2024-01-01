import express from "express";

const app = express();

// set static folder
app.use(express.static("public"));
// Parse URL encoded bodies (as sent my HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// handle route get
app.get("/users", async (req, res) => {
  //   const users = [
  //     { id: 1, name: "John " },
  //     { id: 2, name: "David " },
  //     { id: 3, name: "Stephn " },
  //   ];
  setTimeout(async () => {
    const limit = +req.query.limit || 10;
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users?_limit=${limit}`
    );
    const users = await response.json();
    res.send(`
   <h1 class='text-2xl   font-bold my-4'>Users</h1>
   <ul>
   ${users.map((user) => `<li>${user.name}</li>`).join("")}
   </ul>
  `);
  }, 2000);
});
// Start the server
app.listen(3000, () => {
  console.log("Server is listenting 3000");
});
