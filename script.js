var ranum;
var Time = 60;
var temp = "";
var x = 0;
let timerInterval; 
const hitnum = document.querySelector('.hit');
const Timer = document.querySelector('.timer');
const mbotm = document.querySelector('.mbotm');
const Points = document.querySelector('.point');
const cur = document.querySelector('.cur');


function gethitnum() {
    ranum = Math.floor(Math.random() * 10);
    hitnum.innerHTML = ranum;
}


function Timing() {
    Time = 60; 
    Timer.innerHTML = Time;


    clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        Time--;
        Timer.innerHTML = Time;
        if (Time <= 0) {
            clearInterval(timerInterval);
            mbotm.innerHTML = `<h2 class="score">Your score is ${x}</h2><br/> <button onclick="restart()" class="rebtn">Restart</button>`;
        }
    }, 1000);
}

function addBubble() {
    temp = ""; 
    mbotm.innerHTML = "";
    for (var i = 0; i < 240; i++) {
        const rn = Math.floor(Math.random() * 10);
        temp += `<div class="bubble">${rn}</div>`;
    }
    mbotm.innerHTML = temp; 
}

mbotm.addEventListener('click', (dets) => {
    if (dets.target.classList.contains('bubble') && dets.target.textContent == ranum) {
        addPoint();        
        addBubble();
        gethitnum();  

         gsap.to(dets.target,{
            scale: 0, 
            duration: 0.3,
            onComplete: () => {
                dets.target.remove(); 
            }
         })
    }
});

function addPoint() {
    x += 10;
    Points.textContent = x;
}


function restart() {
    x = 0; 
    Points.textContent = x;
    addBubble();
    gethitnum();
    Timing();
}


addBubble();
gethitnum();
Timing();

window.addEventListener('mousemove', (e) => {
    cur.style.top = e.y + 'px';
    cur.style.left = e.x-80 + 'px';
});

  


const bubbles = document.querySelectorAll('.bubble');
bubbles.forEach(bubble => {
    gsap.from(bubble, {
        scale: 0, 
        duration: 2.5,
        ease: "back.out(1.7)", 
        onComplete: () => {
            
            bubble.addEventListener('mouseenter', () => {
                gsap.to(bubble, { scale: 1.1, duration: 0.2 });
            });
            bubble.addEventListener('mouseleave', () => {
                gsap.to(bubble, { scale: 1, duration: 0.2 });
            });
        }
    });
});
