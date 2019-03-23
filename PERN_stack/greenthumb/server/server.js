const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
//const logger = require("logger");
const Data = require("./data");
const API_PORT = 3001;
const app = express();
const router = express.Router();

//Connect to database
const dbRoute = "mongodb+srv://george:root@greenthumb-oeg0e.mongodb.net/test?retryWrites=true";
mongoose.connect(
	dbRoute,
	{useNewUrlParser: true}
);
let db = mongoose.connection;
db.once("open", () => console.log("connected to database", dbRoute));
db.on("error", console.error.bind(console, "connection error", dbRoute));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use(logger("dev"));

//get all from database
router.get("/getData", (req, res) => {
	Data.find((err, data) =>{
		if(err) return res.json({success: false, error: err});
		return res.json({success: true, data: data});
	});
});

//update data in database
router.post("/updateData", (req,res) => {
	const {id, update} = req.body;
	Data.findOneAndUpdate(id, update, err=> {
		if(err) return res.json({success: false, error: err});
		return res.json({success: true});
	});
});

//delete from database
router.delete("/deleteData", (req,res) => {
	const {id} = req.body;
	Data.findOneAndDelete(id, err=> {
		if(err) return res.send(err);
		return res.json({success: true});
	});
});

//add data to database
router.post("/putData", (req,res) => {
	let data = new Data();
	const {id, message} = req.body;
	if((!id && id !== 0) || !message){
		return res.json({success: false, error: "Invalid request, check inputs"});
	}
	data.message = message;
	data.id = id;
	data.save(err => {
		if(err) return res.json({success: false, error: err});
		return res.json({success: true});
	});
});

app.use("./api", router);
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));