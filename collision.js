let canvas;
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Runner = Matter.Runner;

let boxes = [];
let def = 20;
let redi = 6;
let currentEvt;
let invervalId;
function setup(){
  canvas = createCanvas(500,300);
  canvas.position(500,500);
  canvas.style("visibility", "visible");

  engine = Engine.create();
  engine.gravity.x = 0;
  engine.gravity.y = 0;
  runner = Runner.create();
  world = engine.world;

  ground = Bodies.rectangle(width/2,height,width+10,30,{isStatic : true});
  up = Bodies.rectangle(width/2,0,width+10,30,{isStatic : true}); 
  right = Bodies.rectangle(width,height/2,30,height+10,{isStatic : true}); 
  left = Bodies.rectangle(0,height/2,30,height+10,{isStatic : true}); 
  if(currentEvt.name == "EC"){
    ground.restitution = up.restitution=right.restitution=left.restitution = 1;
    boxes = [];
    document.getElementById('n_inp').value = def;
    for(let i=0;i<def;i++){
      boxes.push(new Box(getRandom(width),getRandom(height),redi));
    }

    boxes.forEach(box=>{
      box.changeState(10,radians(getRandom(360)),1,1,false);
    });
  }
  if(currentEvt.name == "IEC"){
    boxes = []
    boxes.push(new Box(50,height*0.3,20));
    boxes.push(new Box(width/2 +10,height*0.3,20));
    boxes.push(new Box(50,height*0.6,20));
    boxes.push(new Box(width/2 +10,height*0.6,20));
    boxes[0].changeState(5,0,0,1,false);
    boxes[1].changeState(0,0,0,1,false);
    boxes[2].changeState(10,0,0,1,false);
    boxes[3].changeState(0,0,0,1,false);
    //invervalId = setInterval(setup,5000);
  }  
  World.add(world,[ground,up,left,right]);
  World.add(world,boxes);
  Runner.run(runner,engine);

  //setInterval(deltaPos,1000);
  
}

function draw(){
  background('black');
  boxes.forEach(box=>{
    box.show();
  })
  fill(170);
  stroke('white');
  rectMode(CENTER);
  rect(width/2,height,width,30);
  rect(width/2,0,width,30);
  rect(width,height/2,30,height);
  rect(0,height/2,30,height);
}

function deltaPos(){
  let te = 0;
  boxes.forEach(box=>{
    te+=box.energy.TE;
  })
  console.log(te);
}

function n_changed(){
  let n = +document.getElementById('n_inp').value;
  if(n<41 && n>0){
    val = n - def; 
    if(val>=0){
      while(val--){
      bx = new Box(getRandom(width),getRandom(height),redi);
      bx.changeState(5,radians(getRandom(360)),1,1);
      boxes.push(bx);
      }
    }else{
      while(val++){
        boxes[-val].removeFromWorld();
        boxes.splice(-val,1);
      }
    }
    def = +document.getElementById('n_inp').value;
  }else{
    alert("Max 40 && Min 1");
    document.getElementById("n_inp").value = 20;
  }
}

function rotate_changed(obj){
  console.log("r changed");
  if(obj.checked){
    boxes.forEach(ele=>{
      Body.setInertia(ele.body,(Math.PI/4)*(ele.r**4));
    })
  }else{
    boxes.forEach(ele=>{
      Body.setInertia(ele.body,Infinity);
      Body.setAngularVelocity(ele.body,0);
    })
  }
}

function getRandom(max) {
  return Math.floor(Math.random() * max);
}

function Change(evt, tab, color) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
    tablinks[i].style.backgroundColor = "white";
  }
  document.getElementById(tab).style.display = "block";
  evt.currentTarget.className += " active";
  evt.currentTarget.style.backgroundColor = color;
  currentEvt = evt.currentTarget;
  console.log(currentEvt);
  setup();
  setInterval(draw,1);
}

document.getElementById("defaultOpen").click();

