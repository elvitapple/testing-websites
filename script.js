// MOBILE MENU
function toggleMenu(){
document.getElementById("menu").classList.toggle("active");
}

// SCROLL ANIMATION
const cards = document.querySelectorAll('.card');
const steps = document.querySelectorAll('.process-step');

function handleScrollAnimations() {
cards.forEach(card => {
const rect = card.getBoundingClientRect();
if(rect.top < window.innerHeight - 50){
card.style.opacity = 1;
card.style.transform = "translateY(0)";
}
});

steps.forEach((step, index) => {
const rect = step.getBoundingClientRect();
if(rect.top < window.innerHeight - 50 && !step.classList.contains('visible')){
setTimeout(()=>{
step.classList.add('visible');
}, index * 200); // stagger effect
}
});
}

window.addEventListener('scroll', handleScrollAnimations);
window.addEventListener('load', handleScrollAnimations);
setTimeout(handleScrollAnimations, 100); // Fallback explicitly for fast loaders

// INTERACTIVE MOUSE-REACTIVE PARTICLE NETWORK
const canvas = document.getElementById("network");

if(canvas){
    const ctx = canvas.getContext("2d");
    
    let particles = [];
    let mouse = { x: null, y: null, radius: 180 };

    window.addEventListener('mousemove', function(event){
        mouse.x = event.x;
        mouse.y = event.y;
    });

    window.addEventListener('mouseout', function(){
        mouse.x = null;
        mouse.y = null;
    });

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }

    window.addEventListener('resize', resize);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function initParticles() {
        particles = [];
        // Adaptive particle count based on screen size so it never lags
        let particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 120);
        
        for(let i=0; i<particleCount; i++){
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                size: Math.random() * 2 + 1
            });
        }
    }

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            if(p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if(p.y < 0 || p.y > canvas.height) p.vy *= -1;
            
            // Subtle Mouse Repulsion Effect
            if(mouse.x != null && mouse.y != null) {
                let dx = mouse.x - p.x;
                let dy = mouse.y - p.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if(distance < mouse.radius) {
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let force = (mouse.radius - distance) / mouse.radius;
                    let movementX = forceDirectionX * force * 1.5;
                    let movementY = forceDirectionY * force * 1.5;
                    p.x -= movementX;
                    p.y -= movementY;
                }
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(0, 229, 255, 0.7)";
            ctx.fill();
        });

        // Draw connections
        for(let i=0; i<particles.length; i++) {
            for(let j=i; j<particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if(distance < 160) {
                    let opacity = 1 - (distance/160);
                    
                    // Highlight lines dramatically near the mouse cursor
                    if (mouse.x != null && mouse.y != null) {
                        let mouseDx = mouse.x - particles[i].x;
                        let mouseDy = mouse.y - particles[i].y;
                        let mouseDistance = Math.sqrt(mouseDx*mouseDx + mouseDy*mouseDy);
                        if (mouseDistance < mouse.radius) {
                            ctx.strokeStyle = `rgba(0, 229, 255, ${opacity * 0.9})`;
                            ctx.lineWidth = 1.2;
                        } else {
                            ctx.strokeStyle = `rgba(0, 229, 255, ${opacity * 0.15})`;
                            ctx.lineWidth = 0.5;
                        }
                    } else {
                        ctx.strokeStyle = `rgba(0, 229, 255, ${opacity * 0.15})`;
                        ctx.lineWidth = 0.5;
                    }
                    
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }
    
    initParticles();
    animate();
}

// Steps animation logic moved above to handleScrollAnimations

// FAQ ACCORDION
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
item.querySelector('.faq-question').addEventListener('click', () => {
const isActive = item.classList.contains('active');

// Close all others
faqItems.forEach(other => other.classList.remove('active'));

if(!isActive){
item.classList.add('active');
}
});
});