const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const pgp = require('pg-promise')();

const {getHomePage} = require('./routes/index');
const {addPlantPage, addPlant, deletePlant, editPlant, editPlantPage} = require('./routes/plants');

const port = 5000;

const dbConfig = {
	host: 'localhost',
	port: 5432,
	database: 'greenthumb',
	user: 'postgres',
	password: 'root'
};

if(pgp(dbConfig)){
    var db = pgp(dbConfig);
    console.log('Connected to database');
}else{
    console.log('ERROR: There was a problem connecting to the database');
}
app.set('port', process.env.port || port); // express
app.set('views', __dirname + '/views'); 
app.set('routes',__dirname + '/routes');
app.use(express.static(__dirname + '/'));
app.set('view engine', 'ejs'); // set the view engine to ejs
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.get('/', getHomePage);
app.get('/add', addPlantPage);
app.get('/edit/:id', editPlantPage);
app.get('/delete/:id', deletePlant);
app.post('/add', addPlant);
app.post('/edit/:id', editPlant);

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

