const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;

// ✅ Serve static assets (CSS, JS, images)
app.use("/assets", express.static(path.join(__dirname, "assets")));

// ✅ Serve index.html as the main page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "templates", "index.html"));
});

// ✅ Serve product.html
app.get("/product", (req, res) => {
    res.sendFile(path.join(__dirname, "templates", "product.html"));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
