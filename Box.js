function Box(x,y,r){
    this.c = count;
    this.xr = x;
    this.yr = y;
    this.r = r;
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
        rectMode(CENTER);
        ellipse(0,0,this.r*2);
        fill('white');
        line(0,0,this.r,0)
        rotate(-angle);
        //sfill('red');
        textSize(15);
        text(this.c,0,0);
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
        World.remove(world,this.body);
        this.body = Bodies.circle(this.xr,this.yr,this.r,param);
        if(!rotationStat){
            Body.setInertia(this.body,Infinity);
        }
        World.add(world,this.body);
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
        pE = (box.body.mass*resultant(engine.gravity)*gPl[selected][0]*((height-box.body.position.y-box.r)/60)).toFixed(2);
        this.KE = ke;
        this.PE = pE;
        this.VEL = vel;
        return Energy;
    };
}

function resultant(vel){
    return Math.sqrt(vel.x**2 + vel.y**2);
}
