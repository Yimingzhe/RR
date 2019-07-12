var query = require('../myLibs/mysql');

// display the photos of the celebrity
exports.search = function (req, res, next) {
    var celebrity = req.query.celebrity;
    var sql = "SELECT * FROM `celebrity_table` WHERE name LIKE '" + "%" + celebrity + "%" + "'";
    query(sql, function(err, results, fields){
        if(err){
            res.status(500).send('database error!').end();
        }else{
            if(results.length != 0){
                req.celebrity = results[0];
                next();
            }else{
                res.render('noResult');
            }
        }
    });
}

exports.show = function(req, res){
    var image = req.celebrity.name + "1";
    image = image.replace(/[\s]+/g, "") + ".jpg";
    query("SELECT * FROM `image_table` WHERE img = ?", image, function (err, results, fields) {
        if (err) {
            res.status(500).send('database error!');
        } else {
            try {
                // "images" are the pictures which will be displayed
                var images = [];
                for(var i=1; i<=10; i++){
                    images.push(results[0]["img" + i]);
                }
                for(var i=1; i<images.length; i++){
                    for(var j=0; j<i; j++){
                        if(images[i] == images[j]){
                            images.splice(i, 1);
                        }
                    }
                }
                res.render('result', {celebrity: req.celebrity, images: images});
            } catch (e) {
                res.render('noResult');
            }
        }
    });
}

// when user change the big photo, show the updated results
exports.update = function (req, res, next) {
    var celebrity = req.query.celebrity;
    var image = req.body;
    var name;
    for (var key in image) {
        name = key;
    }
    image = name.replace(/[\s]+/g, "") + ".jpg";
    query("SELECT * FROM `image_table` WHERE img = ?", image, function(err, results, fields){
        if(err){
            res.status(500).send('database error!');
        }else{
            // "images" are the pictures which will be displayed
            var images = [];
            for(var i=1; i<=10; i++){
                images.push(results[0]["img" + i]);
            }
            for(var i=1; i<images.length; i++){
                for(var j=0; j<i; j++){
                    if(images[i] == images[j]){
                        images.splice(i, 1);
                    }
                }
            }
            res.send(JSON.stringify(images));
        }
    });
}
