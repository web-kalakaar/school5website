

/* ===================== PARTICLES ===================== */
(function(){
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let W,H,particles=[];
  function resize(){W=canvas.width=innerWidth;H=canvas.height=innerHeight;}
  resize();window.addEventListener('resize',resize);
  function makeParticle(){
    return{
      x:Math.random()*W,y:Math.random()*H,
      vx:(Math.random()-0.5)*0.4,vy:(Math.random()-0.5)*0.4,
      r:Math.random()*1.5+0.5,
      alpha:Math.random()*0.4+0.1
    };
  }
  for(let i=0;i<100;i++)particles.push(makeParticle());
  function draw(){
    ctx.clearRect(0,0,W,H);
    particles.forEach((p,i)=>{
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0)p.x=W;if(p.x>W)p.x=0;
      if(p.y<0)p.y=H;if(p.y>H)p.y=0;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(201,168,76,${p.alpha})`;ctx.fill();
      // Connect nearby
      particles.slice(i+1).forEach(p2=>{
        const dx=p.x-p2.x,dy=p.y-p2.y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<120){
          ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p2.x,p2.y);
          ctx.strokeStyle=`rgba(201,168,76,${(1-d/120)*0.12})`;
          ctx.lineWidth=0.5;ctx.stroke();
        }
      });
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ===================== CURSOR ===================== */
const cursor=document.getElementById('cursor');
const trail=document.getElementById('cursor-trail');
document.addEventListener('mousemove',e=>{
  cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';
  trail.style.left=e.clientX+'px';trail.style.top=e.clientY+'px';
});
document.addEventListener('mousedown',()=>cursor.style.transform='translate(-50%,-50%) scale(0.6)');
document.addEventListener('mouseup',()=>cursor.style.transform='translate(-50%,-50%) scale(1)');

/* ===================== LOADER ===================== */
window.addEventListener('load',()=>{
  setTimeout(()=>{
    document.getElementById('loader').classList.add('hide');
    startCounters();
  },2200);
});

/* ===================== NAVBAR ===================== */
let lastScroll=0;
window.addEventListener('scroll',()=>{
  const nav=document.getElementById('navbar');
  const y=scrollY;
  if(y>80){nav.classList.add('scrolled');}else{nav.classList.remove('scrolled');}
  if(y>lastScroll&&y>200){nav.classList.add('hidden');}else{nav.classList.remove('hidden');}
  lastScroll=y;
  document.getElementById('back-top').classList.toggle('visible',y>400);
  updateActiveNav();
});

function updateActiveNav(){
  const sections=['hero','about','principal','teachers','achievers','gallery','academics','fees','contact'];
  const links=document.querySelectorAll('.nav-link');
  let current='hero';
  sections.forEach(id=>{
    const el=document.getElementById(id);
    if(el&&scrollY>=el.offsetTop-120)current=id;
  });
  links.forEach((l,i)=>{
    const mapping=['hero','about','principal','teachers','achievers','gallery','academics','contact'];
    l.classList.toggle('active',mapping[i]===current);
  });
}

/* Hamburger */
const ham=document.getElementById('hamburger');
const mob=document.getElementById('mobileMenu');
ham.addEventListener('click',()=>{
  ham.classList.toggle('open');mob.classList.toggle('open');
});
function closeMobile(){ham.classList.remove('open');mob.classList.remove('open');}

/* ===================== SCROLL TO SECTION ===================== */
function scrollToSection(id){
  const el=document.getElementById(id);
  if(el)el.scrollIntoView({behavior:'smooth',block:'start'});
}

/* ===================== THEME TOGGLE ===================== */
const themeBtn=document.getElementById('themeToggle');
let dark=false;
themeBtn.addEventListener('click',()=>{
  dark=!dark;
  document.documentElement.setAttribute('data-theme',dark?'dark':'light');
  themeBtn.textContent=dark?'☀️':'🌙';
});

/* ===================== SCROLL REVEAL ===================== */
const revealEls=document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale');
const observer=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('active');});
},{threshold:0.1,rootMargin:'0px 0px -50px 0px'});
revealEls.forEach(el=>observer.observe(el));

/* ===================== COUNTERS ===================== */
function startCounters(){
  document.querySelectorAll('.counter').forEach(el=>{
    const target=+el.dataset.target;
    let current=0;
    const step=target/60;
    const timer=setInterval(()=>{
      current+=step;
      if(current>=target){current=target;clearInterval(timer);}
      el.textContent=Math.round(current);
    },25);
  });
}
// Also trigger on scroll for stats section
const statsObserver=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.counter').forEach(el=>{
        if(el.dataset.done)return;
        el.dataset.done='1';
        const target=+el.dataset.target;
        let current=0,step=target/60;
        const timer=setInterval(()=>{
          current+=step;
          if(current>=target){current=target;clearInterval(timer);}
          el.textContent=Math.round(current);
        },25);
      });
    }
  });
},{threshold:0.3});
document.querySelectorAll('.stats-section,.hero-stats').forEach(el=>statsObserver.observe(el));

/* ===================== TEACHER FILTER ===================== */
document.querySelectorAll('.filter-btn[data-filter]').forEach(btn=>{
  btn.addEventListener('click',function(){
    document.querySelectorAll('.filter-btn[data-filter]').forEach(b=>b.classList.remove('active'));
    this.classList.add('active');
    const filter=this.dataset.filter;
    document.querySelectorAll('.teacher-card').forEach(card=>{
      if(filter==='all'||card.dataset.subject===filter){
        card.dataset.hidden='false';card.style.display='';
      }else{
        card.dataset.hidden='true';card.style.display='none';
      }
    });
  });
});

/* ===================== GALLERY FILTER ===================== */
document.querySelectorAll('.filter-btn[data-gfilter]').forEach(btn=>{
  btn.addEventListener('click',function(){
    document.querySelectorAll('.filter-btn[data-gfilter]').forEach(b=>b.classList.remove('active'));
    this.classList.add('active');
    const filter=this.dataset.gfilter;
    document.querySelectorAll('.gallery-item').forEach(item=>{
      if(filter==='all'||item.dataset.cat===filter){
        item.style.display='';
      }else{
        item.style.display='none';
      }
    });
  });
});

/* ===================== LIGHTBOX ===================== */
const lightbox=document.getElementById('lightbox');
const lightboxImg=document.getElementById('lightboxImg');
document.querySelectorAll('.gallery-item').forEach(item=>{
  item.addEventListener('click',()=>{
    const src=item.querySelector('img').src;
    lightboxImg.src=src;
    lightbox.classList.add('active');
    document.body.style.overflow='hidden';
  });
});
document.getElementById('lightboxClose').addEventListener('click',closeLightbox);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox();});
function closeLightbox(){lightbox.classList.remove('active');document.body.style.overflow='';}

/* ===================== CONTACT FORM ===================== */
document.getElementById('contactForm').addEventListener('submit',function(e){
  e.preventDefault();
  showToast('✅ Enquiry sent! We will contact you shortly.');
  this.reset();
});

/* ===================== TOAST ===================== */
function showToast(msg){
  const toast=document.getElementById('toast');
  document.getElementById('toastMsg').textContent=msg;
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),3500);
}

/* ===================== PARALLAX ON ABOUT IMAGE ===================== */
window.addEventListener('scroll',()=>{
  const aboutImg=document.querySelector('.about-img-wrap img');
  if(aboutImg){
    const rect=aboutImg.closest('.about-img-wrap').getBoundingClientRect();
    const parallax=(rect.top/window.innerHeight)*15;
    aboutImg.style.transform=`translateY(${parallax}px) scale(1.05)`;
  }
});

/* ===================== CARD TILT EFFECT ===================== */
document.querySelectorAll('.principal-card,.achiever-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const rect=card.getBoundingClientRect();
    const x=(e.clientX-rect.left)/rect.width-0.5;
    const y=(e.clientY-rect.top)/rect.height-0.5;
    card.style.transform=`perspective(800px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave',()=>{
    card.style.transform='';
    card.style.transition='transform 0.5s var(--ease)';
  });
});
