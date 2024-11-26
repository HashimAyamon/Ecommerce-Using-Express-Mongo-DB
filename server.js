const express = require("express");
const app = express();
const session = require("express-session");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const userRoutes = require("./routes/userRoutes");
const categorizedProductRoutes = require("./routes/categorizedProductRoutes");
const shopRoutes = require("./routes/shopRoutes");
const cartRoutes = require("./routes/cartRoutes");
const productDetailRouter = require("./routes/productDetailRouter");  
const sessionConfig = require("./config/sessionConfig");
const path = require("path");

connectDB();

app.use(session(sessionConfig));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
  res.locals.cart = req.session.cart || [];
  next();
});

app.use("/", userRoutes);
app.use("/category", categorizedProductRoutes);
app.use("/shop", shopRoutes);
app.use("/cart", cartRoutes);
app.use("/product", productDetailRouter);  

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started running on http://localhost:${port}`));
