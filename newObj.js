function new_Obj(count){
    if(count==4){
        alert("Only three objects allowed.")
        return;
    }
    
    objName = "object"+String(count);
    div = document.createElement("div");
    div.setAttribute("id",objName);
    //div.setAttribute("class","relative");

    node = document.createElement("p");
    node.innerText = objName;

    vel = document.createElement("p");
    angle = document.createElement("p");
    mass = document.createElement("p");

    angle.innerText = "Angle (degrees) : ";
    vel.innerText = "Velocity : ";
    mass.innerText = "Mass : ";

    vel_inp = document.createElement("input");
    ang_inp = document.createElement("input");
    mas_inp = document.createElement("input");
    mas_inp.setAttribute("value","2.5");

    vel_inp.setAttribute("id",String("Vel"+count))
    ang_inp.setAttribute("id",String("ang"+count))
    mas_inp.setAttribute("id",String("mas"+count));

    vel.append(vel_inp);
    angle.append(ang_inp);
    mass.append(mas_inp);

    node.append(vel);
    node.append(angle);
    node.append(mass);

    vel_lb = document.createElement("p")
    vel_va = document.createElement("label")
    vel_lb.innerText = "Velocity : ";
    vel_va.setAttribute("id",String("vel_va"+count));

    ke_lb = document.createElement("p")
    ke_va = document.createElement("label")
    ke_lb.innerText = "K.E. : ";
    ke_va.setAttribute("id",String("ke_va"+count));

    pe_lb = document.createElement("p")
    pe_va = document.createElement("label")
    pe_lb.innerText = "P.E. : ";
    pe_va.setAttribute("id",String("pe_va"+count));

    ke_lb.append(ke_va);
    vel_lb.append(vel_va);
    pe_lb.append(pe_va);

    resetObj = document.createElement("button");
    resetObj.setAttribute("id",objName);
    resetObj.setAttribute("onclick","objReset(this.id)");
    resetObj.innerText = "Reset Object";

    cut = document.createElement("button");
    cut.setAttribute("id",objName);
    cut.setAttribute("onclick","nullify(this.id)");
    cut.innerText = "Normalize Obj";
    
    div.append(node);
    div.append(vel_lb);
    div.append(ke_lb);
    div.append(pe_lb);
    div.append(resetObj);
    div.append(cut);

    objDiv = document.getElementById("RadioDiv");
    radio = document.createElement("input");
    radio.setAttribute("type","radio");
    radio.setAttribute("name","radioInp");
    radio.setAttribute("onchange","radioChange(this)");
    radio.setAttribute("id","rad"+count);
    label = document.createElement("label");
    label.innerText = objName;

    document.body.appendChild(div);
    objDiv.append(radio);
    objDiv.append(label)
}