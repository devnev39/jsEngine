var Engine = Matter.Engine,
    Render = Matter.Render,
    Mouse = Matter.Mouse,
    mConstraint = Matter.MouseConstraint,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    World = Matter.World;


let engine;
let world;


var boxes = [];

function setup(){
    canvas = createCanvas(800,600);
    canvas.position(500,0);
    engine = Engine.create();
    engine.gravity.x = 0;
    engine.gravity.y = 0;
    runner = Runner.create();
    world = engine.world;

    param = {
        friction : 0,
        frictionStatic : 0,
        frictionAir : 0
    }
    for(let i=0;i<2;i++){
        boxes.push(new Box(getRandom(800),getRandom(600),50,50));
    }
    ground = Bodies.rectangle(400,height,width,50,{isStatic : true});
    World.add(world,ground);
    World.add(world,boxes);

    mouse = Mouse.create(canvas.elt);
    option = {
        mouse: mouse
      }
    mcon = mConstraint.create(engine,option);
    mcon.mouse.pixelRatio = pixelDensity(); 
    World.add(world,mcon);

    Runner.run(runner,engine)

    console.log(engine);
}

function draw(){
    background(51);

    for(let i=0;i<boxes.length;i++){
        boxes[i].show();
    }

    fill(170);
    stroke(255);
    rectMode(CENTER);
    rect(400,height,width,40); 
}

function clicked(){
    let rest=0;
    let vel = document.getElementById("txt").value;
    if(vel==""){
        alert("no value");
        return;
    }
    if(document.getElementById("rest")!=""){
        rest = document.getElementById("rest").value;
    }

    for(let i=0;i<boxes.length;i++){
        boxes[i].changeState(vel,radians((i==0)?0:180),rest);
    }
}

function reset(){
    for(let i=0;i<boxes.length;i++){
        boxes[i].reset();
    }
    
}

function component(vel,angle){
    return {
        x : vel*Math.cos(angle),
        y : vel*Math.sin(angle)
    }
}


function getRandom(max) {
    return Math.floor(Math.random() * max);
  }