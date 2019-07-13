var mysql = require("mysql");

if(process.env.JAWSDB_URL) {
    var pool = mysql.createPool(process.env.JAWSDB_URL);
} else{
    var pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '803101',
        database: 'retro',
        port: '3306'
    });
}

var query = function(sql, options, callback){
    pool.getConnection(function(err, conn){
        conn.release();
        conn.query(sql, options, function(err, results, fields){
                // conn.release();
                callback(err, results, fields);
        });
    });
};

module.exports=query;