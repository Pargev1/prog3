var socket = io();
var wet = 0;
var side = 10;

function setup() {
    createCanvas(50 * side, 50 * side);
    background("pink");
}

function nkarel(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[0].length; x++) {
            var obj = matrix[y][x];
            if (obj == 0){
                
                fill("grey")
                
                
            }
            else if (obj == 1) {
                // console.log(wet)
                if(wet == 0){
                fill("green");
                }else if(wet == 1){
                    
                    fill("green")
                }else if(wet == 2){
                    fill(255,165,0)
                }else if(wet == 3){
                    fill(255,255,255)
                }
            }
            else if (obj == 2) {
                
                fill("yellow");
            }
            else if (obj == 3) {
                fill("red");
            }
            else if (obj == 4) {
                fill(0,255,255);
            }
            else if (obj == 5) {
                fill(255,255,255);
            }
            rect(x * side, y * side, side, side);
        }
    }
}
function Wether(wether){
    wet = wether;
    console.log(wet)
    


}
// console.log(wether)
        socket.on('send matrix', nkarel)
        socket.on('wether', Wether)


function kill() {
    socket.emit("kill")
}
function addGrass() {
    socket.emit("add grass")
}
function addGrassEater() {
    socket.emit("add grassEater")
}
function addPredatr() {
    socket.emit("add predatr")
}
function addInfrcted_Person() {
    socket.emit("add infected_preson")
}
function addNoInfrcted_Person() {
    socket.emit("add noinfected_preson")
}