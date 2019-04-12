module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM \"Plants\" ORDER BY id ASC;";

        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "GreenThumb | View Plants",
                plants: result
            });
        });
    }
};

