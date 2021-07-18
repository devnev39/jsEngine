function Box(x,y,r){
    this.c = count;
    this.xr = x;
    this.yr = y;
    this.r = r;
    this.shape = "Circle";
    this.energy = new Energy(this);
    
    param = {
        friction : 0,
        frictionStatic : 0,
        frictionAir : 0
    }
    this.body = Bodies.circle(x,y,r,param);
    World.add(world,this.body);

    this.show = function(){
        pos = this.body.position;
        angle = this.body.angle;

        push();
        translate(pos.x,pos.y);
        stroke(255);
        fill(objc[this.c-1]);
        rotate(angle);
        
        if(this.shape=="Circle"){
            ellipseMode(CENTER);
            ellipse(0,0,this.r*2);
            fill('white');
            line(0,0,this.r,0)
            rotate(-angle);
            //sfill('red');
            textSize(15);   
            text(this.c,0,0);
        }else{
            rectMode(CENTER);
            rect(0,0,this.r*sizeMul,this.r*sizeMul);
            fill('white');
            line(0,0,0,this.r*sizeMul/2);
            rotate(-angle);
            //sfill('red');
            textSize(15);   
            text(this.c,0,0);
        }
        
        pop();

        this.energy.updateE();
    }

    this.removeFromWorld = function(){
        World.remove(world,this.body);
    }

    this.changeState = function(vel,angle,restitution,mass,resetAng){
        this.body.restitution = restitution;
        ang = resetAng ? 0 : this.body.angularVelocity;
        this.body.angle = 0;
        Body.setMass(this.body,mass);
        Body.setVelocity(this.body,component(vel,angle));
        Body.setAngularVelocity(this.body,ang)
    }

    this.reset = function(){
        this.resetShape(this.shape);
    }

    this.resetDim = function(size=20){
        this.r = size;
        this.resetShape(this.shape);
    }

    this.resetShape = function(sh){
            World.remove(world,this.body);
            if(sh=="Rect"){
                if(callFromResetShape) this.body = Bodies.rectangle(this.body.position.x,this.body.position.y,this.r*sizeMul,this.r*sizeMul,param);
                else this.body = Bodies.rectangle(this.xr,this.yr,this.r*sizeMul,this.r*sizeMul,param);
                Body.setMass(this.body,masses[shapes.indexOf(sh)]);
                this.shape = "Rect";
            }else{
                if(callFromResetShape) this.body = Bodies.circle(this.body.position.x,this.body.position.y,this.r,param);
                else this.body = Bodies.circle(this.xr,this.yr,this.r,param);
                Body.setMass(this.body,masses[shapes.indexOf(sh)]);
                this.shape = "Circle";
            }
            if(!rotationStat){
                Body.setInertia(this.body,Infinity);
            }
            World.add(world,this.body);
            //console.log(`added ${this.shape} with ${this.r}`);
    }
}

function component(vel,angle){
    return {
        x : vel*Math.cos(angle),
        y : vel*Math.sin(angle)
    }
}



Energy = function(box){
    this.updateE = function()
    {
        //console.log(body.position);
        let vel = (resultant(box.body.velocity)).toFixed(2);
        let ke = +(0.5*box.body.mass*(vel**2)).toFixed(2);
        let pE = 0;
        if(box.shape=="Circle"){
            pE = (box.body.mass*resultant(engine.gravity)*gPl[selected][0]*((height-box.body.position.y-box.r)/60)).toFixed(2);
        }else{
            pE = (box.body.mass*resultant(engine.gravity)*gPl[selected][0]*((height-box.body.position.y-(box.r*sizeMul/2))/60)).toFixed(2);
        }
        this.RKE = round(0.5*box.body.mass*Inertias[shapes.indexOf(box.shape)]*(box.body.angularVelocity**2),2);
        this.KE = ke;
        this.PE = pE;
        this.VEL = vel;
        return Energy;
    };
}

function resultant(vel){
    return Math.sqrt(vel.x**2 + vel.y**2);
}
