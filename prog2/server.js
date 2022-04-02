var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");



app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3001);

grassArr = [];
grassEaterArr = [];
predatrArr = [];
infPArr = []
noinfPArr = []
matrix = [];
var wether = 0;
var a = 5;
var b = 0;
var n = 50;

Grass = require("./Grass")
GrassEater = require("./GrassEater")
Predatr = require("./Predatr")
Infected_Person = require("./infected_Person")
NoInfected_Person = require("./Noinfected_Person")
function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
        matrix[i][j] = Math.floor(rand(0, 6))
        
    }  
}

io.sockets.emit("send matrix", matrix)



function createObject() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                matrix[y][x] = 1 
                grassArr.push(new Grass(x, y, 1))
            }
            else if (matrix[y][x] == 2) {
                matrix[y][x] = 2
                grassEaterArr.push(new GrassEater(x, y, 2))
            }
            else if (matrix[y][x] == 3) {
                matrix[y][x] = 3
                predatrArr.push(new Predatr(x, y, 3))
            }
            else if (matrix[y][x] == 4) {
                matrix[y][x] = 4
                infPArr.push(new Infected_Person(x, y, 4))
            }
            else if (matrix[y][x] == 5) {
                matrix[y][x] = 5
                noinfPArr.push(new NoInfected_Person(x, y, 5))
            }
        }
    }
    io.sockets.emit('send matrix', matrix)
}

function game() {
    a += 1;
    if(a%5 == 0){
        if(b == 0){
            wether = 0
            b += 1;

        }else if(b == 1){
            wether = 1
            b += 1;
        }else if(b == 2){
            wether = 2
            b += 1;

        }else if(b == 3){
            wether = 3
            b = 0;

        }
        
        
    }
    for (var i in grassArr) {
        grassArr[i].mul()
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in predatrArr) {
        predatrArr[i].eat();
    }
    for (var i in infPArr) {
        infPArr[i].move();
    }
    for (var i in noinfPArr) {
        noinfPArr[i].ToInf();
    }
    // console.log(wether)
    io.sockets.emit("send matrix", matrix);
    io.sockets.emit("wether", wether);
}

setInterval(game, 1000)


function kill() {
    grassArr = [];
    grassEaterArr = []
    predatrArr = []
    infPArr = []
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}


function addGrass() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addGrassEater() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            grassEaterArr.push(new GrassEater(x, y, 2))
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addPredatr() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
            predatrArr.push(new Predatr(x, y, 3))
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function infected_Person() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
            infPArr.push(new Infected_Person(x, y, 4))
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function noinfected_Person() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
            noinfPArr.push(new NoInfected_Person(x, y, 5))
        }
    }
    io.sockets.emit("send matrix", matrix);
}



io.on('connection', function (socket) {
    createObject();
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
    socket.on("add predatr", addPredatr);
    socket.on("add infected_preson", infected_Person);
    socket.on("add noinfected_preson", noinfected_Person);

});


var statistics = {};

setInterval(function() {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.predatr = predatrArr.length;
    statistics.infected_Person = infPArr.length;
    statistics.noinfected_Person = noinfPArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
        console.log("send")
    })
},1000)