var Gpio = require('onoff').Gpio,
  pir = new Gpio(17, 'in', 'both');
var sqlite3 = require('sqlite3').verbose();
var db;

function createDb() {
    console.log("createDb chain");
    db = new sqlite3.Database('chain.sqlite3', createTable);
}

function createTable() {
    console.log("createTable lorem");
    db.run("CREATE TABLE IF NOT EXISTS teller (datum datetime default CURRENT_TIMESTAMP, tel TEXT)", insertRows);
}

function insertRows() {
    console.log("insertRows");
    var stmt = db.prepare("INSERT INTO teller (tel) VALUES (?)");
    stmt.run(1);
    stmt.finalize(readAllRows);
}
function readAllRows() {
    console.log("readAllRows lorem");
    db.all("SELECT * FROM teller", function(err, rows) {
        console.log(rows.lenght)
        closeDb();
    });
}

function closeDb() {
    console.log("closeDb");
    db.close();
}

 
pir.watch(function(err, value) {
  if (err) exit();
  console.log('Intruder detected');
  createDb();
});
 
console.log('Pi Bot deployed successfully!');
console.log('Guarding the Magic pencil...');
 
function exit() {
  pir.unexport();
  process.exit();
}