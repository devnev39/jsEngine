function Box(x,y,r){
    this.r = r;
    param = {
        friction : 0,
        frictionStatic : 0,
        frictionAir : 0,
        inertia : Infinity
    }
    this.energy = new Energy(this);
    this.body = Bodies.circle(x,y,r,param);
    World.add(world,this.body);

    this.show = function(){
        pos = this.body.position;
        angle = this.body.angle;
        this.energy.updateE();
        push();
        translate(pos.x,pos.y);
        stroke(255);
        fill('white');
        rotate(angle);
        rectMode(CENTER);
        ellipse(0,0,this.r*2);
        stroke('red');
        strokeWeight(5);
        line(0,0,this.r,0)
        rotate(-angle);
        //sfill('red');
        pop();
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
}

Energy = function(box){
    this.updateE = function()
    {
        //console.log(body.position);
        let vel = (resultant(box.body.velocity)).toFixed(2);
        let ang = box.body.angularVelocity;
        this.KE = +(0.5*box.body.mass*(vel**2)).toFixed(3);
        this.RKE = +(0.5* box.body.mass* box.r**2 * ang**2).toFixed(3);
        this.TE = this.KE + this.RKE;
        return Energy;
    };
}

function component(vel,angle){
    return {
        x : vel*Math.cos(angle),
        y : vel*Math.sin(angle)
    }
}

function resultant(vel){
    return Math.sqrt(vel.x**2 + vel.y**2);
}