console.log(" init js is called")
// basic connection code

//sets canvas dimensions
canvas = document.querySelector('#myCanvas');
var ctx = canvas.getContext('2d');
var width = 800;
var height = 600;
canvas.width = width;
canvas.height = height;

// this is an array which in python was called a list
// this array contains all of my colours which can then be called
var colArray=[
    ["rgba(255,255,255,1)", "rgba(255,0,0,1)", "rgba(255,165,0,1)","rgba(255,255,0,1)","rgba(0,128,0,1)","rgba(128,0,255,1)","rgba(238,130,238)","rgba(0,0,0,1)",],
    ["rgba(255,255,255,0.6)", "rgba(255,0,0,0.6)", "rgba(255,165,0,0.6)","rgba(255,255,0,0.6)","rgba(0,128,0,0.6)","rgba(128,0,255,0.6)","rgba(238,130,238,0.6)","rgba(0,0,0,0.6)",], 
    ["rgba(255,255,255,0.2)", "rgba(255,0,0,0.2)", "rgba(255,165,0,0.2)","rgba(255,255,0,0.2)","rgba(0,128,0,0.2)","rgba(128,0,255,0.2)","rgba(238,130,238,0.2)","rgba(0,0,0,0.2)",]  
    ]
