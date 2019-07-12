var query = require('../myLibs/mysql');

exports.show = function (req, res) {
    query("SELECT `name` FROM `celebrity_table`", function(err, results, fields){
        if(err){
            res.status(500).send('database error!');
        }else{
            res.render('list', {names: results});
        }
    });
}