"use strict";

var express = require("express");
let path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
let helmet = require("helmet");
var cors = require("cors");
var appRoutes = require("./app_backend/routes/v1/app.route");
const env =
	"mongodb+srv://cyberfuse123:FLXAyMRzA5gKZdX9@cluster0.pibic0r.mongodb.net/nephro-health-coach";
	
	var port = 8082;
	
mongoose
	.connect(env, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log("✅ DB Connected Successfully");
		app.listen(port, () => {
			console.log(`🚀 Server running on port ${port}`);
		});
	})
	.catch((err) => {
		console.error("Unable to connect with DB", err);
	});

var app = express();

app.use(logger("dev"));
app.use(helmet());
app.use(express.json());
// app.use(express.static('assets'));
app.use("/assets", express.static(process.cwd() + "/assets"));
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(cors());

app.use(express.static(path.join(__dirname, "/build")));
app.use("/api/v1", appRoutes);

process.on("uncaughtException", (err, origin) => {
  console.log("uncaughtException Error ------>", err);
});

module.exports = app;
