// Minimal Node + Express static server
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public"))); // serves public/index.html
app.listen(3000, () => console.log("Static app: http://localhost:3000"));
