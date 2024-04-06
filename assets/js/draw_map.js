let deslocamentoMapa = 34;

function rotIN(x, y, angle, ctx){
    angle = angle - 90;
    ctx.translate(x, y);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.translate(-x, -y);
    return {'x':x, 'y':y, 'angle':angle, 'ctx':ctx}
}

function rotReset(obj){
    ctx = obj['ctx']
    ctx.translate(obj['x'], obj['y']);
    ctx.rotate((-obj['angle'] * Math.PI) / 180);
    ctx.translate(-obj['x'], -obj['y']);
}

function eraseScreen(ctx){
    ctx.beginPath();  
    ctx.fillStyle = "#202125";
    ctx.fillRect(-200, -200, 1000, 1000);
}

function resetRotation(ctx){
    ctx.translate(300, 250);
    ctx.rotate((-deslocamentoMapa * Math.PI) / 180);
    ctx.translate(-300, -250);
}

function rotateCanvas(ctx){
    ctx.translate(300, 250);
    ctx.rotate((deslocamentoMapa * Math.PI) / 180);
    ctx.translate(-300, -250);
}

const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

document.getElementById('inputQDR').oninput = function() {
    drawQdr();
};

function drawQdr(){
    var input = document.getElementById("inputQDR").value;    
    if (input == 0){
        reset();
        return;
    }
    if (input < 0){
        document.getElementById("inputQDR").value = 360;
        return;
    }
    if (input > 360){
        document.getElementById("inputQDR").value = 1;
        return;
    }
    if (input < 1 || input > 360 || isNaN(input) || input.length > 3){
        appendAlert('Número incorreto!', 'danger');
        return;
    }
    drawLine(parseInt(input), 'INPUT')
}

function reset(){
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");        
        eraseScreen(ctx);
        drawBackground(ctx);
    }
}

function drawLine(angle, ad){
    var canvas = document.getElementById("canvas");
    if (ad !== 'INPUT'){
        document.getElementById("inputQDR").value = "";
    }
    
    let qdr = angle;
    let qdm = angle - 180;
    let qdms = String(qdm);
    let qdrs = String(qdr);

    if (qdr < 180){
        qdms = qdr + 180;
        qdm = qdr + 180;
    }
    if (qdm < 100){
        qdms = '0' + qdms;
    }
    if (qdm < 10){
        qdms = '0' + qdms;
    }
    if (qdr < 100){
        qdrs = '0' + qdrs;
    }
    if (qdr < 10){
        qdrs = '0' + qdrs;
    }

    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        
        eraseScreen(ctx);
        drawBackground(ctx);

        let n = (angle-90)/5
        ctx.beginPath();
        ctx.strokeStyle = '#00FF00';
        ctx.lineWidth = 3;
        var y = Math.sin((n * 10) * Math.PI / 360) * 280+250;
        var x = Math.cos((n * 10) * Math.PI / 360) * 280+300;
        ctx.moveTo(300, 250);
        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(300, 250, 10, 0,(Math.PI/180)*360, true);
        ctx.closePath();
        ctx.stroke();

        resetRotation(ctx);
        ctx.beginPath();
        ctx.font = "28px Verdana";
        ctx.fillStyle = "#00FF00";
        ctx.fillText(ad, 30, 50);
        ctx.font = "14px Verdana";
        ctx.fillStyle = "white";
        ctx.fillText('QDR '+ qdrs, 511, 40);
        ctx.fillText('QDM '+ qdms, 510, 57);
        rotateCanvas(ctx);
    }
}

function drawBackground(ctx){    
    for (i = 0; i<24; i++){
        ctx.beginPath();
        ctx.strokeStyle = '#555555';
        if(i%3 == 0){
            ctx.strokeStyle = 'white';
        }
        ctx.lineWidth = 3;
        let grau = ((i*15)-90)/5;
        var y = Math.sin((grau* 10) * Math.PI / 360) * 255+250;
        var x = Math.cos((grau* 10) * Math.PI / 360) * 255+300;
        ctx.moveTo(300, 250);
        ctx.lineTo(x, y);
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(300, 250, 240, 0,(Math.PI/180)*360, true); 
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = 'orange';
    ctx.arc(300, 250, 240, 0,(Math.PI/180)*360, true); 
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();  //PISTA
    let rot = rotIN(309, 257, 146, ctx);
    ctx.fillStyle = "black";
    ctx.fillRect(240, 250, 115, 20);
    
    rotReset(rot)

    let northPoint = new Path2D();
    northPoint.lineWidth = 5;
    northPoint.moveTo(300,0);
    northPoint.lineTo(300,20);
    northPoint.closePath();
    ctx.strokeStyle = "white";
    ctx.stroke(northPoint);

    let southPoint = new Path2D();
    southPoint.moveTo(300,480);
    southPoint.lineTo(300,500);
    southPoint.closePath();
    ctx.strokeStyle = "white";
    ctx.stroke(southPoint);

    let westPoint = new Path2D();
    westPoint.moveTo(50,250);
    westPoint.lineTo(70,250);
    westPoint.closePath();
    ctx.strokeStyle = "white";
    ctx.stroke(westPoint);

    let eastPoint = new Path2D();
    eastPoint.moveTo(530,250);
    eastPoint.lineTo(550,250);
    eastPoint.closePath();
    ctx.strokeStyle = "white";
    ctx.stroke(eastPoint);

    ctx.beginPath();
    ctx.font = "14px Verdana";
    ctx.fillStyle = "white";
    ctx.fillText("N", 295, 35);
    ctx.fillText("S", 295, 475);
    ctx.fillText("O", 75, 255);
    ctx.fillText("L", 515, 255);
    ctx.fillText("NE", 450, 100);
    ctx.fillText("SE", 445, 410);
    ctx.fillText("SO", 130, 410);
    ctx.fillText("NO", 130, 100);

    //Aproximação da RWY15
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 3;
    ctx.beginPath(); 
    ctx.arc(222, 134, 2, 0,(Math.PI/180)*360, true); //KG004
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(150, 177, 2, 0,(Math.PI/180)*360, true);  //KG017
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath(); 
    ctx.arc(288, 84, 2, 0,(Math.PI/180)*360, true); //KG016
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath(); 
    ctx.arc(177, 67, 2, 0,(Math.PI/180)*360, true); //KG002
    ctx.closePath();
    ctx.stroke();

    ctx.lineWidth = 1;
    ctx.setLineDash([3,5]);
    ctx.beginPath(); //linhas
    ctx.arc(177, 67, 1, 0,(Math.PI/180)*360, true); //KG002
    ctx.arc(263, 196, 1, 0,(Math.PI/180)*360, true); //TWR15
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath(); //linhas
    ctx.arc(222, 134, 1, 0,(Math.PI/180)*360, true); //KG004
    ctx.arc(150, 177, 1, 0,(Math.PI/180)*360, true);  //KG017
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath(); //linhas
    ctx.arc(222, 134, 1, 0,(Math.PI/180)*360, true); //KG004
    ctx.arc(288, 84, 1, 0,(Math.PI/180)*360, true); //KG016
    ctx.closePath();
    ctx.stroke();
    
    ctx.setLineDash([]);

    //Aproximação da RWY33
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 3;
    ctx.beginPath(); 
    ctx.arc(447, 325, 2, 0,(Math.PI/180)*360, true); //kg013
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath(); 
    ctx.arc(423, 432 , 2, 0,(Math.PI/180)*360, true); //kg009
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath(); 
    ctx.arc(378, 366, 2, 0,(Math.PI/180)*360, true); //kg007
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath(); 
    ctx.arc(309, 415, 2, 0,(Math.PI/180)*360, true); //kg014
    ctx.closePath();
    ctx.stroke();

    ctx.lineWidth = 1;
    ctx.setLineDash([3,5]);
    ctx.beginPath(); //linhas
    ctx.arc(423, 432, 1, 0,(Math.PI/180)*360, true); //kg009
    ctx.arc(336, 303, 1, 0,(Math.PI/180)*360, true); //TWR33
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath(); //linhas
    ctx.arc(378, 366, 1, 0,(Math.PI/180)*360, true); //kg007
    ctx.arc(309, 415, 1, 0,(Math.PI/180)*360, true); //kg014
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath(); //linhas
    ctx.arc(378, 366, 1, 0,(Math.PI/180)*360, true); //kg007
    ctx.arc(447, 325, 1, 0,(Math.PI/180)*360, true); //kg013
    ctx.closePath();
    ctx.stroke();
    
    ctx.setLineDash([]);
    ctx.strokeStyle = '#FFF';

    ctx.beginPath(); //linhas
    ctx.arc(278, 217, 0, 0,(Math.PI/180)*360, true); 
    ctx.arc(323, 283, 0, 0,(Math.PI/180)*360, true); 
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath(); //linhas
    ctx.arc(253, 154, 0, 0,(Math.PI/180)*360, true); 
    ctx.arc(259, 155, 0, 0,(Math.PI/180)*360, true); 
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath(); 
    ctx.arc(256, 154.5, 6, 0,(Math.PI/180)*360, true); //kg014
    ctx.closePath();
    ctx.stroke();

    resetRotation(ctx);
    ctx.font = "12px Verdana";
    ctx.fillText("15", 292, 205);
    ctx.fillText("33", 292, 303);

    ctx.font = "10px Verdana";
    ctx.fillStyle = "#008866";
    ctx.fillText("KG017", 183, 95);
    ctx.fillText("KG004", 262, 124);
    ctx.fillText("KG002", 308, 40);
    ctx.fillText("KG016", 378, 95);

    ctx.fillText("KG013", 378, 410);
    ctx.fillText("KG009", 258, 470);
    ctx.fillText("KG007", 308, 380);
    ctx.fillText("KG014", 183, 410);

    ctx.fillStyle = "#ff6";
    ctx.fillText("SNKB", 326, 154); //Aeroclube

    rotateCanvas(ctx);
}

function draw_map() {
    let canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "orange";
        ctx.strokeStyle = "orange";

        eraseScreen(ctx);

        rotateCanvas(ctx);

        drawBackground(ctx);

        // let n = (337-90)/5 ;
        // // let n = (117-90)/5 //kg013
        // // let n = (177-90)/5 //kg014
        // // let n = (296-90)/5 //kg017
        // // let n = (356-90)/5 //kg016

        // let d = 102.66;
        // // 140 10,5NM
        // // 166 12,5NM
        // // 220 16,5NM
        // 106,66 10 334 graus
        // 102,66 28 337 graus

        // var y = Math.sin((n * 10) * Math.PI / 360) * d+250;
        // var x = Math.cos((n * 10) * Math.PI / 360) * d+300;
        // console.log(x,y);
        // ctx.moveTo(300, 250);
        // ctx.lineTo(x, y);
        // ctx.stroke();

    }
  }
