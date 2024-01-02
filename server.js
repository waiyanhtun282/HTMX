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

// Handle post route
app.post("/convert", (req, res) => {
  setTimeout(() => {
    const fahrenheit = parseFloat(req.body.fahrenheit);
    const celisus = (fahrenheit - 32) * (5 / 9);

    res.send(`
    <p>
    ${fahrenheit} degree Fahernheit is equal to ${celisus.toFixed(
      2
    )} degrees Celisus
    </p>
    `);
  }, 2000);
});
// Handle Get Poll
let counter =0;
app.get('/poll',(req,res) =>{
  counter++;
  const data ={value:counter};
  res.json(data)
});
// HandleGetTemeatuere for weather
let currentTempearture =20;
app.get('/get-temperature',(req,res) =>{
  currentTempearture +=Math.random() * 2 -1;//Random temp change
  res.send(currentTempearture.toFixed(1) + 'C')
})
// Start the server
app.listen(3000, () => {
  console.log("Server is listenting 3000");
});
