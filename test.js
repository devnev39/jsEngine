var Engine = Matter.Engine,
    Render = Matter.Render,
    Mouse = Matter.Mouse,
    mConstraint = Matter.MouseConstraint,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    World = Matter.World,
    Events = Matter.Event;


let engine;
let world;
let mouse;

var ground;
var up;
var right;
var left;

let INTERVAL = 500;
let CLICK = 0.0;
let graphUpdate = true;

var boxes = [];
   
let rest;
let g;

let count=1;
let vels = [];
let angs = [];
let mass = [];

let zeros = [];

prop = function(){
    this.ke = 0;
    this.pe = 0;
    this.vel = 0;
    return{
    KE : this.ke,
    PE : this.pe,
    VEL : this.vel
}}

let ObjProps = []

let chart;


function setup(){
    rest = +document.getElementById("rest_inp").value;
    g = +document.getElementById("g_").value;
    console.log(rest);
    canvas = createCanvas(800,600);
    canvas.position(300,30);
    engine = Engine.create();
    engine.gravity.x = 0;
    engine.gravity.y = g;
    runner = Runner.create();
    world = engine.world;
    
    param = {
        friction : 0,
        frictionStatic : 0,
        frictionAir : 0
    }
    
    ground = Bodies.rectangle(400,height+24,width+10,50,{isStatic : true});
    up = Bodies.rectangle(400,-24,width+10,50,{isStatic : true}); 
    right = Bodies.rectangle(824,height/2,50,height+10,{isStatic : true}); 
    left = Bodies.rectangle(-24,height/2,50,height+10,{isStatic : true}); 

    World.add(world,[ground,up,left,right]);
    World.add(world,boxes);

    mouse = Mouse.create(canvas.elt);
    option = {
        mouse: mouse
      }
    mcon = mConstraint.create(engine,option);
    mcon.mouse.pixelRatio = pixelDensity(); 
    mouse = mcon;
    World.add(world,mcon);

    Runner.run(runner,engine)

    setInterval(updateLable,INTERVAL);
    //setInterval(deltaPos,INTERVAL);

    setGraph();
    chart.data.datasets = chartObjFrames;
    //graph();

    document.getElementById("objects").checked = true;

    console.log(mcon);
    console.log(engine);
    console.log(ground);
}

function draw(){
    rest = document.getElementById("rest_inp").value;
    rest = rest ? rest : 0;
    ground.restitution = up.restitution = left.restitution = right.restitution = rest;
    background(51);
    if(boxes.length>0){
    updateInnerArray();
    for(let i=0;i<boxes.length;i++){
        boxes[i].show();
    }
    }
    fill(170);
    stroke(255);
    rectMode(CENTER);
    rect(400,height+24,width,50);
    rect(400,-24,width,50);
    rect(824,height/2,50,height);
    rect(-24,height/2,50,height);

    if(mouse.body){
        pos = mouse.body.position;
        fill(0,255,0);
        ellipse(pos.x,pos.y,20,20);
    }
}

//////  --------  EVENTS -----------

function addObj(){
    
    new_Obj(count);
    boxes.push(new Box(getRandom(width),getRandom(height),20));  
    ObjProps.push(new prop());
    addChartFrame(count);
    //console.log(boxes[0]);    
    document.getElementById("mas"+(count)).value = (boxes[count-1].body.mass).toFixed(2);
    count++;
}

function start(){
    rest = document.getElementById("rest_inp").value;
    for(let i=0;i<count-1;i++){
        str = String("object"+(i+1));
        ele = document.getElementById(str);
        angs[i] = (+ele.childNodes[0].childNodes[2].childNodes[1].value);
        vels[i] = (+ele.childNodes[0].childNodes[1].childNodes[1].value);
        mass[i] = (+ele.childNodes[0].childNodes[3].childNodes[1].value);
    }
    if((boxes.length==vels.length)&&(boxes.length==angs.length)){
    for(let i=0;i<boxes.length;i++){
        boxes[i].changeState(vels[i],radians(-angs[i]),rest,mass[i],false);
        print(boxes[i])
    }
    }
}

function reset(){
    for(let i=0;i<boxes.length;i++){
        boxes[i].reset();
        chart.data.labels = [(CLICK).toFixed(2)];
        chartObjFrames[i].data = [ObjProps[i].KE];
        chartObjPropFrame[i][0].data = [ObjProps[i].KE];
        chartObjPropFrame[i][1].data = [ObjProps[i].PE];
        chartObjPropFrame[i][2].data = [ObjProps[i].VEL];
    }
    chart.update();
}

function objReset(clicked){
    for(let i=0;i<count-1;i++){
        if(clicked==String("object"+(i+1))){
            boxes[i].reset();
        }
    }
}

function nullify(clicked){
    for(let i=0;i<count-1;i++){
        if(clicked==String("object"+(i+1))){
            boxes[i].changeState(0,0,0.6,mass[i],true);
        }
    }
}
function onGraphUpdate(clicked){
    if(graphUpdate){
        graphUpdate = false;
        document.getElementById(clicked).innerText = "False";
        return;
    }
    graphUpdate = true;
    document.getElementById(clicked).innerText = "True";
}

function radioChange(clicked){
    if(clicked.id=="objects"){
        if(graphUpdate){updateGraph(null);return;}
        chart.data.datasets = chartObjFrames;
    }else{
        if(graphUpdate){updateGraph(int(clicked.id.charAt(3))-1);return;}
        chart.data.datasets = chartObjPropFrame[int(clicked.id.charAt(3))-1];
    }
    chart.update();
}

//////     ---------GRAPH-----------
let chartObjFrames = [];
let chartObjPropFrame = [];

colors = ['red','green','blue'];
labels = ['KE','PE','Velocity'];
objs = ['object1','object2','object3'];

function setGraph(){
    var ctx = document.getElementById('chart');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [CLICK],
            datasets: [

            ]
        },
        options: {
            showLines : true,
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                      beginAtZero:true,
                      min: 0,
                      max: 100  
                    }
                  }]
            } ,
            responsive : false
        }
    });
    chart = myChart;
}

function addChartFrame(c){
    chartObjFrames.push(objects(c));
    chartObjPropFrame.push(object_prop(c));
    chart.update();
}

object_prop = function(c){
    let arr = [ObjProps[c-1].KE,ObjProps[c-1].PE,ObjProps[c-1].VEL];
    datasets = [];
    for(let i=0;i<arr.length;i++){
        datasets.push(
            {
                label : labels[i],
                data : zeros.concat([arr[i]]),
                borderColor: [
                    colors[i]
                ],
                borderWidth: 1
            }
        )
    }
    arr = null;
    return datasets;
}

objects = function(c){
        return{
            label: objs[c-1],
            data: zeros.concat([ObjProps[c-1].KE]),
        
            borderColor: [
                colors[c-1]
            ],
            borderWidth: 1
        }
}

////    --------UPDATE---------

function RadioCheck(){
    for(let i=0;i<boxes.length;i++){
        if(document.getElementById("rad"+(i+1)).checked){
            updateGraph(i);
        }
    }

    if(document.getElementById("objects").checked){
         updateGraph(null);
    }
}

function updateInnerArray(){
    for(let i=0;i<boxes.length;i++){
        vels[i] = resultant(boxes[i].body.velocity);
        mass[i] = boxes[i].body.mass;
        angs[i] = boxes[i].body.angularVelocity;
    }
}

function updateGraph(index){
    if(graphUpdate){
        if(chart.data.labels.length >= 50){
            console.log('Condition');
            chart.data.labels.splice(0,1);
            zeros.splice(0,1);
            chart.data.labels.push((CLICK).toFixed(2));
            chartObjFrames.forEach(ele=>{
                if(ele.data.length>=50){
                ele.data.splice(0,1);
                }
            });
            chartObjPropFrame.forEach(obj=>{
                obj.forEach(ele=>{
                    if(ele.data.length>=50){
                    ele.data.splice(0,1);
                    }
                })
            });
        }else{
            chart.data.labels.push((CLICK).toFixed(2));
        }
        //chart.update();
        if(index!=null){ 
            chart.data.datasets = chartObjPropFrame[index];
            chart.update();
        }
        else{          
               chart.data.datasets = chartObjFrames;
               chart.update(); 
            }
            
    }
   
}

function deltaPos(){
    if(boxes.length && (boxes[0].body.velocity.y > 0.001)){ 
        console.log(boxes[0].body.velocity);
        console.log((height-boxes[0].body.position.y-boxes[0].r-0.7039)/60); 
        console.log((CLICK).toFixed(2));
    }
}

function updateLable(){
    engine.gravity.y = +document.getElementById("g_").value*0.600;    
    try{
    if(boxes.length){
    for(let i=0;i<boxes.length;i++){
        ObjProps[i].KE = boxes[i].energy.KE;
        ObjProps[i].PE = boxes[i].energy.PE;
        ObjProps[i].VEL = boxes[i].energy.VEL;

        document.getElementById(String("vel_va"+(i+1))).innerText = boxes[i].energy.VEL;
        document.getElementById(String("ke_va"+(i+1))).innerText = boxes[i].energy.KE;
        document.getElementById(String("pe_va"+(i+1))).innerText = boxes[i].energy.PE;
        if(graphUpdate){
        let arr = [ObjProps[i].KE,ObjProps[i].PE,ObjProps[i].VEL];
        for(let j=0;j<3;j++)
        {
            chartObjPropFrame[i][j].data.push(arr[j]);
        }
        chartObjFrames[i].data.push(ObjProps[i].KE);
        zeros.push(0);
        }
        
    }
    RadioCheck();
    //deltaPos();
    CLICK += 1e-3 * INTERVAL;
    }
    }catch(err){
        console.log(err);
    }
}

function getRandom(max) {
    return Math.floor(Math.random() * max);
}
