var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Create Database Connection
var pgp = require('pg-promise')();
const dbConfig = process.env.DATABASE_URL;

var db = pgp(dbConfig);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory


// login page 
app.get('/', function(req, res) {
	res.render('pages/login',{
		local_css:"signin.css", 
		my_title:"Login Page"
	});
});

// registration page 
app.get('/register', function(req, res) {
	res.render('pages/register',{
		my_title:"Registration Page"
	});
});

// home page 
app.get('/home', function(req, res) {
	var query = 'select * from plants;';
	db.any(query)
        .then(function (rows) {
            // render views/store/list.ejs template file
            res.render('pages/home',{
				my_title: "Home Page",
				data: rows,
				id: '',
                name: '',
                description: '',
                img: ''
			})

        })
        .catch(function (err) {
            // display error message in case an error
            request.flash('error', err);
            response.render('pages/home', {
                title: 'Home Page',
                data: '',
				id: '',
                name: '',
                description: '',
                img: ''
            })
        })
	
});

app.post('/home/pick_plant', function(req, res) {
	var plant_id = req.body.plant_id;
	var plant_name = req.body.plant_name;
	var plant_desc = req.body.plant_description;
	var plant_image = req.body.plant_img;
	var new_plant = "INSERT INTO plants(id, name, description, img) VALUES('" + plant_id + "','" + 
							plant_name + "','" + plant_desc + "','" + plant_image + "');";

	var plant_select = 'select * from plants;';
	db.task('get-everything', task => {
        return task.batch([
            task.any(new_plant),
            task.any(plant_select)
        ]);
    })
    .then(info => {
    	res.render('pages/home',{
				my_title: "Home Page",
				data: info[1],
				plant: plant_id,
                name: plant_name,
                description: plant_desc,
                image: plant_image,
                id:''
			})
    })
    .catch(error => {
        // display error message in case an error
            req.flash('error', err);
            res.render('pages/home', {
                title: 'Home Page',
                data: '',
				plant: '',
                name: '',
                description: '',
                image: '',
                id: ''
            })
    });	
});

app.get('/home/pick_plant', function(req, res) {
	var plant_choice = req.query.plant_selection;
	var plant_options =  'select * from plants;';
	var plant_name = "select name from plants where id = '" + plant_choice + "';"; 
	 db.task('get-everything', task => {
        return task.batch([
            task.any(plant_options),
            task.any(plant_name)
        ]);
    })
    .then(data => {
    	res.render('pages/home',{
				my_title: "Home Page",
				data: data[0],
				plant: plant_choice,
				plant_name: data[1][0].name
			})
    })
    .catch(error => {
        // display error message in case an error
            request.flash('error', err);
            response.render('pages/home', {
                title: 'Home Page',
                data: '',
				plant: '',
				plant_name: ''
            })
    });
	
});

// Player's Information Page
app.get('/player_info', function(req, res) {
	var query = 'select id, name from football_players;'
	db.any(query)
        .then(function (rows) {
            // render views/store/list.ejs template file
            res.render('pages/player_info',{
				my_title: "Football Player Information",
				players: rows,
				player_info: '',
                games_played: ''
			})

        })
        .catch(function (err) {
            // display error message in case an error
            request.flash('error', err);
            response.render('pages/player_info', {
                title: 'Football Player Information',
                players: '',
                player_info: '',
                games_played: ''
            })
        })
	
});

app.get('/player_info/get_player', function(req, res) {
	var player_id = req.query.player_choice;
	var list_players = 'select id, name from football_players;';
	var chosen_player = 'select * from football_players where id=' + player_id + ';';
	var games_played = 'select count(*) from football_games where ' + player_id + '=any(players);';

	 db.task('get-everything', task => {
        return task.batch([
            task.any(list_players),
            task.any(chosen_player),
            task.any(games_played)
        ]);
    })
    .then(data => {
    	console.log(data[1])
    	res.render('pages/player_info',{
				my_title: "Football Games",
				players: data[0],
				player_info: data[1][0],
				games_played: data[2][0].count
			})
    })
    .catch(error => {
        // display error message in case an error
            request.flash('error', err);
            response.render('pages/player_info', {
                title: 'Football Player Information',
                players: '',
                player_info: '',
                games_played: ''
            })
    });
	
});

app.listen(process.env.PORT);
