const canvas = document.getElementById("mechanic-canvas");
const context = canvas.getContext("2d");
context.globalAlpha = 0.5;


let particlesArray = [];



const twisterCheckbox = document.getElementById("twister");

document.addEventListener("change", () => {
    if (twisterCheckbox.checked) {
        document.addEventListener("click", drawTwister);

    }
    else {
        document.removeEventListener("click", drawTwister);

    }
});

addEventListener("resize", () => setSize());


const cursor = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  };

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    scaleX = canvas.width / rect.width,
    scaleY = canvas.height / rect.height;
    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    };
}

function getCanvasPos(canvas, event){
    var pos = getMousePos(canvas, event);
    var imatrix = context.getTransform().invertSelf();
    // apply to point:
    return {
        x: pos.x * imatrix.a + pos.y * imatrix.c + imatrix.e,
        y: pos.x * imatrix.b + pos.y * imatrix.d + imatrix.f
    }
}

//Twister
function drawTwister(event){
    var pos = getCanvasPos(canvas, event);
    cursor.x = pos.x;
    cursor.y = pos.y;

    context.globalAlpha = 0.5;
    generateParticles(11, pos.x, pos.y);
    setSize();
    anim();

    console.log("canvas x:" + pos.x + " canvas y:" + pos.y); 
    console.log("mouse x:" + event.clientX + " mouse y:" + event.clientY);    

}

function drawCastBar(event){
    var pos = getCanvasPos(canvas, event);
    cursor.x = pos.x;
    cursor.y = pos.y;

    context.globalAlpha = 0.5;
    
    setSize();
    //anim();

}

// place the mechanic based on client mouse position 

function generateParticles(amount, posx, posy) {
    for (let i = 0; i < amount; i++) {
      particlesArray[i] = new Particle(
        posx,
        posy,
        3,
        generateColor(),
        0.02
      );
    }
  }
  
  function generateColor() {
    let hexSet = "0123456789ABCDEF";
    let finalHexString = "#05"; // close to twister color
    for (let i = 0; i < 6; i++) {
      finalHexString += hexSet[Math.ceil(Math.random() * 15)];
    }
    return finalHexString;
  }
  

  // kind of resets and cleans up the last mechanic?
  function setSize() {
    canvas.height = innerHeight;
    canvas.width = innerWidth;
  }
  
  function Particle(x, y, particleTrailWidth, strokeColor, rotateSpeed) {
    this.x = x;
    this.y = y;
    this.particleTrailWidth = particleTrailWidth;
    this.strokeColor = strokeColor;
    this.theta = Math.random() * Math.PI * 2;
    this.rotateSpeed = rotateSpeed;
    this.t = Math.random() * 150;
  
    this.rotate = () => {
      const ls = {
        x: this.x,
        y: this.y,
      };
      this.theta += this.rotateSpeed;
      this.x = cursor.x + Math.cos(this.theta) * this.t;
      this.y = cursor.y + Math.sin(this.theta) * this.t;
      context.beginPath();
      context.lineWidth = this.particleTrailWidth;
      context.strokeStyle = this.strokeColor;
      context.moveTo(ls.x, ls.y);      
      context.lineTo(this.x, this.y);
      context.stroke();
    };
  }
  
  function anim() {
    requestAnimationFrame(anim);
  
    //context.fillStyle = "rgba(0,0,0,0.05)";
    //context.fillRect(0, 0, canvas.width, canvas.height);
  
    particlesArray.forEach((particle) => particle.rotate());
  }