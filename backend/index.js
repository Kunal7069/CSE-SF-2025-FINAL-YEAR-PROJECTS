const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const blogRoutes = require("./routes/Blog");
const topicRoutes = require("./routes/Topic");
const chatRoutes = require("./routes/Chat");
const challengeRoutes = require("./routes/Challenge")

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const dotenv = require("dotenv");

dotenv.config();

//database connect
const PORT = process.env.PORT || 4000;
database.connect();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
)

//auth routes
app.use("/api/v1/auth", userRoutes);

// blog routes
app.use("/api/v1/blogs", blogRoutes);

// topic routes
app.use("/api/v1/topics", topicRoutes);

app.use("/api/v1/chat",chatRoutes)

app.use("/api/v1/challenges", challengeRoutes);

//default route
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})

