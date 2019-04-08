const fs = require('fs');

module.exports = {
    addPlantPage: (req, res) => {
        res.render('add-plant.ejs', {
            title: "GreenThumb | Add a plant",
            message: ''
        });
    },
    addPlant: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let plantid = req.body.id;
        let description = req.body.description;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = username + '.' + fileExtension;

        let usernameQuery = "SELECT * FROM \"Plants\" WHERE id = '" + plantid + "';";

        db.query(idQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Plant ID already exists';
                res.render('add-plant.ejs', {
                    title: "Greenthumb | Add a plant",
                    message
                });
            } else {
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        let query = "INSERT INTO \"Plants\" (ID, description, image) VALUES ('" +
                            id + "', '" + description + "', '" + image_name + "');";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        });
                    });
                } else {
                    message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                    res.render('add-plant.ejs', {
                        title: "Greenthumb | Add a plant",
                        message
                    });
                }
            }
        });
    },
    editPlantPage: (req, res) => {
        let plantid = req.params.id;
        let query = "SELECT * FROM \"Plants\" WHERE id = '" + plantid + "';";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-plant.ejs', {
                title: "Edit Plant", 
                plant: result[0],
                message: ''
            });
        });
    },
    editPlant: (req, res) => {
        let plantid = req.params.id;
        let description = req.body.description;

        let query = "UPDATE \"Plants\" SET 'description' = '" + description + "';";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deletePlant: (req, res) => {
        let plantid = req.params.id;
        let getImageQuery = 'SELECT image from "Plants" WHERE id = "' + plantid + '"';
        let deleteUserQuery = 'DELETE FROM "Plants" WHERE id = "' + plantid + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let image = result[0].image;

            fs.unlink(`public/assets/img/${image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            });
        });
    }
};

