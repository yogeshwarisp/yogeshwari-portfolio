
document.documentElement.classList.add("js");
/* ======= EDIT YOUR CONTENT HERE ======= */
const CONFIG = {
  photoAlt: "Portrait of Yogeshwari Sandip Pawar",
  resumeUrl: "",        // Optional: link to your resume (e.g. Google Drive). Empty = the built-in PDF below is offered for download.
  email: "yogeshwaripawar2003@gmail.com",
  formEndpoint: ""      // Optional: URL of an email service/backend (e.g. Formspree). Empty = form is front-end only.
};
const SKILLS = {
  "Programming Languages":["Python","SQL","C"],
  "Databases and DBMS":["MySQL","SQLite","SQL Joins","Aggregations","Data Modeling","Data Validation"],
  "Core Computer Science":["Data Structures","Database Management Systems","Analytical Problem Solving"],
  "Cloud, APIs and Tools":["AWS S3","API Integration","Git","GitHub","VS Code","Jupyter Notebook"],
  "Python Libraries":["Pandas","NumPy","Matplotlib"],
  "Data Analysis and Visualization":["Data Cleaning","Data Transformation","EDA","Power BI","Excel Dashboards","KPI Reporting"],
  "Statistics and ML Fundamentals":["Statistics","Probability","Hypothesis Testing","Regression","Classification","Supervised Learning"]
};
const CERTS = [
  ["AMCAT Certification","Aspiring Minds, 2025"],
  ["Power BI Workshop","OfficeMaster, 2025"],
  ["SQL Basics","Newton School, 2025"],
  ["Skillsoft Certification","Data & Technology"],
  ["Codesoft Internship Certificate",""]
];
/* ======= END EDIT AREA ======= */

const IMG={"hero": "images/hero.webp", "about": "images/about.webp", "face": "images/face.webp", "splashBase": "images/splashBase.webp", "splashHair": "images/splashHair.webp", "splashFace": "images/splashFace.webp", "irisL": "images/irisL.webp", "irisR": "images/irisR.webp"};

const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=t=>t.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;

// photos
$("#heroImg").src=IMG.hero;$("#aboutImg").src=IMG.about;
document.documentElement.style.setProperty("--face",'url("'+IMG.face+'")');



// skills + certs
$("#skillGrid").innerHTML=Object.entries(SKILLS).map(([k,v],i)=>`<div class="card rv" style="--d:${(i%3)*.08}s"><h3>${esc(k)}</h3><div class="tags">${v.map(s=>`<span class="tag t">${esc(s)}</span>`).join("")}</div></div>`).join("");
$("#certGrid").innerHTML=CERTS.map((c,i)=>`<div class="card cert rv" style="--d:${i*.1}s"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="9" r="6"/><path d="M8.5 14.5 7 22l5-3 5 3-1.5-7.5"/></svg><div><h3>${esc(c[0])}</h3>${c[1]?`<p>${esc(c[1])}</p>`:""}</div></div>`).join("");

// reveal + counters + timeline
const fmt=(el,v)=>{const dec=+el.dataset.dec||0;el.textContent=(dec?v.toFixed(dec):Math.round(v).toLocaleString("en-US"))+(el.dataset.suf||"")};
const count=el=>{const n=+el.dataset.n;if(reduce){fmt(el,n);return}const t0=performance.now(),d=1400;(function f(t){const p=Math.min((t-t0)/d,1);fmt(el,n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0)};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add("in");$$("[data-n]",e.target).forEach(count);io.unobserve(e.target)}),{threshold:.15});
$$(".rv").forEach(el=>io.observe(el));
$$("[data-n]").forEach(el=>fmt(el,0));
const yr=$("[data-year]");if(yr&&!reduce){yr.style.opacity=0;yr.style.transition="opacity 1.2s ease .3s";new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){yr.style.opacity=1;o.disconnect()}}),{threshold:.5}).observe(yr)}

// nav: a single dropdown (#menuList). Header "Menu" opens it on larger screens, the bottom bar's "More" opens it on phones.
const menuBtn=$("#menuBtn"),moreBtn=$("#moreBtn"),menuList=$("#menuList"),mn=$(".mn");
const PHONE=matchMedia("(max-width:600px), (max-height:520px) and (pointer:coarse)");   // keep in sync with the CSS bottom-bar breakpoint
const openers=[menuBtn,moreBtn].filter(Boolean);
let lastOpener=menuBtn;
const visibleOpener=()=>openers.find(b=>b.offsetParent!==null)||menuBtn;
const isOpen=()=>menuList.classList.contains("open");
const setMenu=(o,opener)=>{if(opener)lastOpener=opener;menuList.classList.toggle("open",o);openers.forEach(b=>b.setAttribute("aria-expanded",o))};
const items=()=>$$("a,button",menuList).filter(x=>x.offsetParent!==null);
const toggleMenu=(btn,e)=>{e.stopPropagation();const o=!isOpen();setMenu(o,btn);if(o&&e.detail===0){const f=items()[0];if(f)f.focus()}};   // keyboard open -> focus the first item
openers.forEach(b=>b.addEventListener("click",e=>toggleMenu(b,e)));
menuList.addEventListener("click",e=>{if(e.target.closest("a,button"))setMenu(false)});
addEventListener("click",e=>{if(isOpen()&&!menuList.contains(e.target)&&!openers.some(b=>b.contains(e.target)))setMenu(false)});
addEventListener("keydown",e=>{if(e.key==="Escape"&&isOpen()){setMenu(false);visibleOpener().focus()}});
menuList.addEventListener("keydown",e=>{const f=items(),i=f.indexOf(document.activeElement);
  if(e.key==="ArrowDown"){e.preventDefault();f[(i+1)%f.length].focus()}
  else if(e.key==="ArrowUp"){e.preventDefault();f[(i-1+f.length)%f.length].focus()}
  else if(e.key==="Home"){e.preventDefault();f[0].focus()}
  else if(e.key==="End"){e.preventDefault();f[f.length-1].focus()}});
menuList.addEventListener("focusout",e=>{if(isOpen()&&e.relatedTarget&&!menuList.contains(e.relatedTarget)&&!openers.includes(e.relatedTarget))setMenu(false)});
// on phones the dropdown lives at the end of <body> so it can sit above the bottom bar (the header's glass blur would otherwise trap fixed positioning)
const placeMenu=()=>{const host=PHONE.matches?document.body:mn;if(menuList.parentNode!==host)host.appendChild(menuList);setMenu(false)};
PHONE.addEventListener("change",placeMenu);placeMenu();
const links=$$("#menuList a");
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>{const on=a.getAttribute("href")==="#"+e.target.id;a.classList.toggle("on",on);on?a.setAttribute("aria-current","true"):a.removeAttribute("aria-current")})}),{rootMargin:"-45% 0px -50% 0px"});
$$("section[id]").forEach(s=>so.observe(s));
const topBtn=$("#top");
topBtn.onclick=()=>scrollTo({top:0,behavior:reduce?"auto":"smooth"});

// form (front-end only unless CONFIG.formEndpoint is set)
const f=$("#f"),ok=$("#ok");
const fields=[["n","en","Please enter your name.",v=>v.trim()],["e","ee","Please enter a valid email address.",v=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())],["m","em","Please enter your message.",v=>v.trim()]];
const check=([i,e,msg,fn],show=true)=>{const el=$("#"+i),good=fn(el.value);$("#"+e).textContent=good?"":msg;el.setAttribute("aria-invalid",!good);return !!good};
fields.forEach(x=>$("#"+x[0]).addEventListener("input",()=>{if($("#"+x[0]).getAttribute("aria-invalid")==="true")check(x)}));
f.addEventListener("submit",async ev=>{
  ev.preventDefault();
  const res=fields.map(x=>check(x));
  if(res.includes(false)){$("#"+fields[res.indexOf(false)][0]).focus();return}
  const d={name:$("#n").value.trim(),email:$("#e").value.trim(),message:$("#m").value.trim()};
  if(CONFIG.formEndpoint){
    try{const r=await fetch(CONFIG.formEndpoint,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(d)});if(!r.ok)throw 0;
      ok.innerHTML="<p><strong>Thank you, "+esc(d.name)+".</strong> Your message was sent.</p>"}
    catch{ok.innerHTML="<p><strong>Message could not be sent.</strong> Please email me directly at <a href=\"mailto:"+CONFIG.email+"\">"+CONFIG.email+"</a>.</p>"}
  }else{
    const q=encodeURIComponent,sub=q("Portfolio message from "+d.name),body=q(d.message+"\n\nFrom: "+d.name+" ("+d.email+")");
    const gm="https://mail.google.com/mail/?view=cm&fs=1&to="+q(CONFIG.email)+"&su="+sub+"&body="+body, mt="mailto:"+CONFIG.email+"?subject="+sub+"&body="+body;
    ok.innerHTML="<p><strong>Your message is ready, "+esc(d.name)+".</strong> Gmail should open with it filled in. Press Send there to deliver it. This page does not send email by itself.</p><a class=\"btn p\" href=\""+gm+"\" target=\"_blank\" rel=\"noopener noreferrer\">Open in Gmail</a><a class=\"btn s\" href=\""+mt+"\">Use default mail app</a>";
    window.open(gm,"_blank","noopener");
  }
  f.style.display="none";ok.classList.add("show");ok.focus();
});

// ===== app shell behaviour =====
const root=document.documentElement;
let dark=matchMedia("(prefers-color-scheme: dark)").matches;
const applyTheme=()=>{root.setAttribute("data-theme",dark?"dark":"light");$("#theme").setAttribute("aria-pressed",dark)};
applyTheme();$("#theme").onclick=()=>{dark=!dark;applyTheme()};
const prog=$("#prog"),updP=()=>{const h=document.documentElement.scrollHeight-innerHeight;prog.style.transform="scaleX("+(h>0?Math.min(scrollY/h,1):0)+")"};
let scrollTick=false;addEventListener("scroll",()=>{if(scrollTick)return;scrollTick=true;requestAnimationFrame(()=>{scrollTick=false;topBtn.classList.toggle("show",scrollY>600);updP()})},{passive:true});updP();topBtn.classList.toggle("show",scrollY>600);
const tabMap={home:"home",about:"about",skills:"skills",projects:"projects",contact:"contact",experience:"more",education:"more",certifications:"more"};
const tabEls=$$(".tabs [data-t]");
const tio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const t=tabMap[e.target.id];tabEls.forEach(el=>{const on=el.dataset.t===t;el.classList.toggle("on",on);on?el.setAttribute("aria-current","true"):el.removeAttribute("aria-current")})}),{rootMargin:"-45% 0px -50% 0px"});
$$("section[id]").forEach(x=>tio.observe(x));


// ===== resume + header =====
const toast=(html)=>{const t=$("#toast");t.innerHTML=html;t.classList.add("show");clearTimeout(toast.k);toast.k=setTimeout(()=>t.classList.remove("show"),6000)};
$("#resumeBtn").onclick=()=>{if(CONFIG.resumeUrl){window.open(CONFIG.resumeUrl,"_blank","noopener");return}const a=document.createElement("a");a.href="assets/Yogeshwari_Pawar_Resume.pdf";a.download="Yogeshwari_Pawar_Resume.pdf";document.body.appendChild(a);a.click();a.remove()};


// ===== hire me details =====
const hire=$("#hire"),hireBtn=$("#hireBtn");
const setHire=o=>{hire.classList.toggle("open",o);hire.setAttribute("aria-hidden",!o);document.documentElement.classList.toggle("lock",o);if(o){const x=$("#hireX");let n=0;const tryFocus=()=>{x.focus();if(document.activeElement!==x&&hire.classList.contains("open")&&++n<20)setTimeout(tryFocus,40)};tryFocus()}else visibleOpener().focus()};   // the dialog turns visible a moment after opening, so retry until it can take focus
hire.addEventListener("keydown",e=>{if(e.key!=="Tab")return;const f=$$("button,a[href]",$(".mc",hire)).filter(x=>x.offsetParent!==null);if(!f.length)return;const first=f[0],last=f[f.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});
hireBtn.onclick=()=>setHire(true);
$("#hireX").onclick=()=>setHire(false);
$(".bd",hire).onclick=()=>setHire(false);
addEventListener("keydown",e=>{if(e.key==="Escape"&&hire.classList.contains("open"))setHire(false)});
$("#hireMsg").addEventListener("click",()=>{hire.classList.remove("open");hire.setAttribute("aria-hidden","true");document.documentElement.classList.remove("lock")});
$("#hireResume").onclick=()=>$("#resumeBtn").click();
$("#copyMail").onclick=async()=>{try{await navigator.clipboard.writeText(CONFIG.email);toast("Email address copied.")}catch{toast('Copy this address: <a href="mailto:'+CONFIG.email+'">'+CONFIG.email+'</a>')}};

// ===== scroll-reactive anime background (sakura, sparkles, speed lines) =====
(function(){
  if(reduce)return;
  const c=document.createElement("canvas");c.id="bg";c.setAttribute("aria-hidden","true");document.body.prepend(c);
  const x=c.getContext("2d");if(!x)return;
  const small=innerWidth<700,NP=small?14:26,NS=small?26:46,NL=small?10:18;
  const rnd=(a,b)=>a+Math.random()*(b-a);
  let W,H,dpr;
  const size=()=>{dpr=Math.min(devicePixelRatio||1,small?1.5:2);W=innerWidth;H=innerHeight;c.width=W*dpr;c.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0)};
  size();addEventListener("resize",size);
  const mkP=top=>({x:rnd(0,W),y:top?rnd(-60,-10):rnd(0,H),s:rnd(.6,1.3),vy:rnd(.25,.7),sw:rnd(.6,1.6),ph:rnd(0,6.28),r:rnd(0,6.28),vr:rnd(-.02,.02),a:rnd(.4,.75)});
  const petals=Array.from({length:NP},()=>mkP(false));
  const stars=Array.from({length:NS},(_,i)=>({x:rnd(0,W),y:rnd(0,H),r:rnd(1.6,3.6),ph:rnd(0,6.28),sp:rnd(.01,.03),z:rnd(.3,1),k:i%3}));
  const lines=Array.from({length:NL},()=>({x:rnd(0,W),o:rnd(0,H),l:rnd(.6,1.4)}));
  let last=scrollY,vel=0,t=0;
  const dark=()=>root.getAttribute("data-theme")==="dark";
  function star(px,py,r){x.beginPath();x.moveTo(px,py-r*2);x.lineTo(px+r*.45,py-r*.45);x.lineTo(px+r*2,py);x.lineTo(px+r*.45,py+r*.45);x.lineTo(px,py+r*2);x.lineTo(px-r*.45,py+r*.45);x.lineTo(px-r*2,py);x.lineTo(px-r*.45,py-r*.45);x.closePath();x.fill()}
  function frame(){
    t++;const y=scrollY,dy=y-last;last=y;vel=vel*.88+dy*.12;
    root.style.setProperty("--sy",y);
    x.clearRect(0,0,W,H);
    const d=dark(),av=Math.min(Math.abs(vel),40);
    // anime speed lines appear while scrolling fast
    if(av>3){
      x.save();x.lineWidth=1.5;x.globalAlpha=Math.min(av/60,.3);x.strokeStyle=d?"#c9beff":"#7a5cff";
      const dir=vel>0?-1:1;
      for(const l of lines){const len=av*5*l.l,yy=((l.o+t*av*.9*dir)%(H+len)+H+len)%(H+len)-len;x.beginPath();x.moveTo(l.x,yy);x.lineTo(l.x,yy+len);x.stroke()}
      x.restore();
    }
    // twinkling sparkles with parallax
    for(const s of stars){
      const sy=(((s.y-y*s.z*.15)%H)+H)%H,al=.2+.6*(.5+.5*Math.sin(t*s.sp*4+s.ph));
      x.globalAlpha=al;x.fillStyle=d?(s.k?"#ffd0e8":"#ffffff"):(s.k===0?"#ff6fae":s.k===1?"#7a5cff":"#3ec6ff");
      star(s.x,sy,s.r*(.7+.3*Math.sin(t*s.sp+s.ph)));
    }
    // sakura petals drift and speed up with scroll
    for(const p of petals){
      p.y+=p.vy*1.2+vel*.3*p.s;p.x+=Math.sin(t*.02*p.sw+p.ph)*.7+vel*.04;p.r+=p.vr+vel*.002;
      if(p.y>H+30){Object.assign(p,mkP(true))}
      else if(p.y<-60){p.y=H+20;p.x=rnd(0,W)}
      if(p.x>W+30)p.x=-20;else if(p.x<-30)p.x=W+20;
      x.save();x.translate(p.x,p.y);x.rotate(p.r);x.scale(p.s,p.s);
      x.globalAlpha=d?p.a*.8:p.a;x.fillStyle=d?"#ffb3d6":"#ff9fc8";
      x.beginPath();x.moveTo(0,-9);x.quadraticCurveTo(8,-4,0,10);x.quadraticCurveTo(-8,-4,0,-9);x.fill();
      x.restore();
    }
    x.globalAlpha=1;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();







// ===== developer + anime effects =====
(function(){
  if(reduce)return;
  const el=$("#typed");
  if(el){const roles=["Associate System Engineer","Junior Python Developer","AI/ML Engineer","Data Analyst"];let ri=0,ci=roles[0].length,del=true;
    function tick(){const r=roles[ri];ci+=del?-1:1;el.textContent=r.slice(0,ci);let d=del?40:85;
      if(!del&&ci===r.length){d=2200;del=true}else if(del&&ci===0){del=false;ri=(ri+1)%roles.length;d=350}
      setTimeout(tick,d)}
    document.addEventListener("splashdone",()=>setTimeout(tick,2600),{once:true});
  }
  const fine=matchMedia("(hover:hover) and (pointer:fine)").matches;
  const spark=(x,y,dx,dy,b)=>{const e=document.createElement("i");e.className="spk"+(b?" b":"");e.style.left=x+"px";e.style.top=y+"px";e.style.setProperty("--dx",dx+"px");e.style.setProperty("--dy",dy+"px");document.body.appendChild(e);setTimeout(()=>e.remove(),850)};
  if(fine){let last=0;addEventListener("pointermove",e=>{const n=performance.now();if(n-last<70)return;last=n;spark(e.clientX,e.clientY,(Math.random()-.5)*30,10+Math.random()*24,Math.random()>.5)},{passive:true});
    $$(".proj,.stat").forEach(c=>{c.addEventListener("pointerenter",()=>c.classList.add("done"));
      c.addEventListener("pointermove",e=>{const r=c.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;c.style.transform="perspective(800px) rotateX("+(-py*7).toFixed(2)+"deg) rotateY("+(px*9).toFixed(2)+"deg) translateY(-6px)"});
      c.addEventListener("pointerleave",()=>{c.style.transform=""})})}
  // star burst when a button or link is pressed
  addEventListener("pointerdown",e=>{if(!e.target.closest(".btn,.soc a,.ml a,.ml button,.theme"))return;for(let i=0;i<9;i++){const a=i/9*Math.PI*2;spark(e.clientX,e.clientY,Math.cos(a)*(34+Math.random()*18),Math.sin(a)*(34+Math.random()*18),i%2)}});
})();

// ===== interactive portrait rig (used by the opening screen and the front page) =====
// layers: base (eyes cleared) + face (shifts a little more than the head) + irises (slide inside the eye outline) + eyelids (blink) + hair (own layer, rippled by a noise map)
const RIG_SVG=s=>`<svg class="sp-eyes" viewBox="0 0 768 758" aria-hidden="true" focusable="false"><defs><clipPath id="lidClipL${s}"><polygon points="178.1,222.5 186.3,216.2 199.2,210.8 215.7,208.9 229.8,211.9 237.3,219.0 234.5,226.1 227.4,231.7 213.3,235.2 198.1,234.7 185.1,229.6"/></clipPath><clipPath id="eyeClipL${s}"><polygon points="180.1,220.1 187.8,214.2 199.9,209.1 215.3,207.4 228.5,210.2 235.5,216.8 232.9,223.4 226.3,228.7 213.1,232.0 198.8,231.5 186.7,226.7"/></clipPath><clipPath id="lidClipR${s}"><polygon points="296.5,219.8 308.2,209.7 324.7,205.3 341.1,206.2 356.4,213.0 364.6,219.8 357.6,224.5 348.2,232.1 331.7,234.6 314.1,233.0 302.4,227.1"/></clipPath><clipPath id="eyeClipR${s}"><polygon points="298.8,217.5 309.7,208.0 325.1,203.9 340.5,204.7 354.8,211.1 362.5,217.5 355.9,221.9 347.1,228.9 331.7,231.3 315.2,229.8 304.3,224.3"/></clipPath></defs><g clip-path="url(#eyeClipL${s})"><image id="irisL${s}" x="195.1" y="200.3" width="38.7" height="37.8" preserveAspectRatio="none"/></g><g clip-path="url(#lidClipL${s})"><rect id="lidRectL${s}" x="178.1" y="205.4" width="59.4" height="0" fill="rgb(224,144,105)" data-y="205.4" data-h="36.6"/><line id="lidLineL${s}" x1="178.1" x2="237.5" y1="205.4" y2="205.4" stroke="#2b1a14" stroke-width="2.6" stroke-linecap="round" opacity="0"/></g><g clip-path="url(#eyeClipR${s})"><image id="irisR${s}" x="306.7" y="197.7" width="38.7" height="39.5" preserveAspectRatio="none"/></g><g clip-path="url(#lidClipR${s})"><rect id="lidRectR${s}" x="296.8" y="201.9" width="67.7" height="0" fill="rgb(225,142,102)" data-y="201.9" data-h="39.5"/><line id="lidLineR${s}" x1="296.8" x2="364.5" y1="201.9" y2="201.9" stroke="#2b1a14" stroke-width="2.6" stroke-linecap="round" opacity="0"/></g></svg>`;
const clampN=(v,a,b)=>Math.max(a,Math.min(b,v)),easeN=x=>x*x*(3-2*x);
let rigWaveAt=0;
function rigWave(t,vel){if(t-rigWaveAt<33)return;rigWaveAt=t;const T=$("#hwT"),D=$("#hwD");if(!T||!D)return;
  const bf=.011+.006*Math.sin(t*.0011);T.setAttribute("baseFrequency",bf.toFixed(4)+" "+(bf*1.7).toFixed(4));
  D.setAttribute("scale",(9+5*Math.sin(t*.0017)+Math.min(6,vel*3)).toFixed(2))}
function createRig(stage,s,alt){
  stage.insertAdjacentHTML("beforeend",'<div class="sp-tilt"><div class="sp-fig"><img class="sp-base" width="768" height="758"><div class="sp-face" aria-hidden="true"><img class="sp-faceimg" alt="" width="768" height="758">'+RIG_SVG(s)+'</div><img class="sp-hair" alt="" aria-hidden="true" width="768" height="758"></div></div>');
  const q=x=>stage.querySelector(x),base=q(".sp-base"),fimg=q(".sp-faceimg"),hair=q(".sp-hair"),tilt=q(".sp-tilt"),face=q(".sp-face");
  base.alt=alt||"";base.src=IMG.splashBase;fimg.src=IMG.splashFace;hair.src=IMG.splashHair;
  const eyes=["L","R"].map(c=>{const rect=q("#lidRect"+c+s),iris=q("#iris"+c+s);iris.setAttribute("href",IMG["iris"+c]);return{iris,rect,line:q("#lidLine"+c+s),y0:+rect.dataset.y,h:+rect.dataset.h}});
  const setLid=(e,c)=>{e.rect.setAttribute("height",(e.h*c).toFixed(2));const y=(e.y0+e.h*c).toFixed(2);e.line.setAttribute("y1",y);e.line.setAttribute("y2",y);e.line.setAttribute("opacity",c>.03?1:0)};
  const lidAmt=el=>el<90?easeN(el/90):el<140?1:el<300?1-easeN((el-140)/160):0;   // close 90ms, hold 50ms, open 160ms
  let cx=0,cy=0,gx=0,gy=0,vel=0,ptx=0,pty=0,k=1,blinkAt=0,blinkStart=-1;
  const measure=()=>{k=stage.clientWidth/768};
  // p = {tx,ty (-1..1 pointer position), idle (no recent pointer), tilt (3D tilt allowed)}
  const step=(t,p)=>{
    cx+=(p.tx-cx)*.08;cy+=(p.ty-cy)*.08;
    vel+=(Math.min(1,Math.abs(p.tx-ptx)+Math.abs(p.ty-pty))*10-vel)*.1;ptx=p.tx;pty=p.ty;
    if(p.tilt)tilt.style.transform="scale(1.03) rotateY("+(cx*7).toFixed(2)+"deg) rotateX("+(-cy*2.5).toFixed(2)+"deg) translate3d("+(cx*8).toFixed(1)+"px,0,0)";
    face.style.transform="translate3d("+(cx*4.2*k).toFixed(2)+"px,"+(cy*3*k).toFixed(2)+"px,0)";
    const wx=p.idle?Math.sin(t*.0006)*.45:0,wy=p.idle?Math.sin(t*.0009+1)*.25:0;
    gx+=((p.tx+wx)-gx)*.16;gy+=((p.ty+wy)-gy)*.16;
    const ix=(gx*5.4).toFixed(2),iy=(gy*3.3).toFixed(2);
    eyes.forEach(e=>e.iris.setAttribute("transform","translate("+ix+" "+iy+")"));
    if(!blinkAt)blinkAt=t+2400;
    if(blinkStart<0&&t>blinkAt)blinkStart=t;
    if(blinkStart>=0){const el=t-blinkStart;eyes.forEach((e,i)=>setLid(e,lidAmt(i?Math.max(0,el-18):el)));
      if(el>330){blinkStart=-1;eyes.forEach(e=>setLid(e,0));blinkAt=t+(Math.random()<.18?170:2300+Math.random()*3400)}}   // irregular, sometimes a quick double blink
    hair.style.transform="translate3d("+(cx*3+Math.sin(t*.0014)*2).toFixed(2)+"px,"+(cy*2+Math.cos(t*.0011)*1.4).toFixed(2)+"px,0)";
    rigWave(t,vel)};
  measure();
  return{layers:[base,fimg,hair],step,measure};
}

// ===== opening screen: portrait with blinking eyes, cursor-tracking gaze and head, wavy hair; four-direction reveal =====
(function(){
  const sp=$("#splash");if(!sp)return;
  const root=document.documentElement;
  if(reduce){root.classList.remove("splashing");document.dispatchEvent(new Event("splashdone"));return}
  const fine=matchMedia("(hover:hover) and (pointer:fine)").matches;
  let done=false,raf=0,started=false;const timers=[];
  const later=(fn,ms)=>{const t=setTimeout(fn,ms);timers.push(t);return t};
  const rig=createRig($("#spStage"),"s","Illustration of Yogeshwari Sandip Pawar resting her chin on her hand");
  const P={tx:0,ty:0,idle:true,tilt:fine};let lastMove=-1e9,moved=false,lastPct=-1,t0=0;
  const pc=$("#pc");
  const onMove=e=>{P.tx=clampN((e.clientX/innerWidth-.5)*2,-1,1);P.ty=clampN((e.clientY/innerHeight-.5)*2,-1,1);lastMove=performance.now();moved=true};
  const onLeave=()=>{P.tx=0;P.ty=0};
  const end=()=>{if(done)return;done=true;cancelAnimationFrame(raf);timers.forEach(t=>{clearTimeout(t);clearInterval(t)});
    sp.removeEventListener("pointermove",onMove);sp.removeEventListener("pointerleave",onLeave);
    sp.style.animation="iris .6s cubic-bezier(.7,0,.3,1) forwards";root.classList.remove("splashing");scrollTo(0,0);
    document.dispatchEvent(new Event("splashdone"));setTimeout(()=>{sp.style.display="none"},700)};
  sp.addEventListener("click",end);
  $("#spEnter").addEventListener("click",e=>{e.stopPropagation();end()});
  $("#spContact").addEventListener("click",e=>{e.stopPropagation();end();setTimeout(()=>{const c=document.getElementById("contact");if(c)c.scrollIntoView({behavior:"smooth"})},760)});
  addEventListener("keydown",e=>{if(e.key==="Escape")end()});
  const loop=t=>{if(done)return;const now=performance.now();
    if(now-lastMove>1400){P.tx*=.93;P.ty*=.93}
    P.idle=!moved||now-lastMove>1800;
    rig.step(t,P);
    const p=Math.round(clampN((t-t0-600)/11000,0,1)*100);if(p!==lastPct){lastPct=p;pc.textContent="Loading "+p+"%"}
    raf=requestAnimationFrame(loop)};
  // the intro timeline starts once the portrait layers have decoded, so nothing animates before the photo exists
  const start=()=>{if(started||done)return;started=true;sp.classList.add("sp-ready");t0=performance.now();
    addEventListener("resize",rig.measure);rig.measure();
    sp.addEventListener("pointermove",onMove);sp.addEventListener("pointerleave",onLeave);
    // name: left, right, top, bottom in turn, one copy at a time (first entrance after the portrait is in)
    const nm=$("#spName"),dirs=[[-110,0],[110,0],[0,-80],[0,80]];let di=0;
    const showName=()=>{if(done)return;const [x,y]=dirs[di%4];
      nm.animate([{opacity:0,transform:`translate(${x}px,${y}px)`,filter:"blur(6px)"},{opacity:1,transform:"translate(0,0)",filter:"blur(0px)"}],{duration:700,easing:"cubic-bezier(.2,.8,.2,1)",fill:"forwards"});
      if(di%4===3&&di<4){di++;return}                                   // the last side stays on screen as the screen opens
      later(()=>{if(done)return;nm.animate([{opacity:1,transform:"translate(0,0)",filter:"blur(0px)"},{opacity:0,transform:`translate(${-x}px,${-y}px)`,filter:"blur(4px)"}],{duration:420,easing:"ease-in",fill:"forwards"});di++;later(showName,440)},2300)};
    later(showName,1500);
    // "I'm a ..." slides in from the right (CSS), then the four titles swap one by one
    const roles=$$("#spRoles .r");let ri=0;
    later(()=>{timers.push(setInterval(()=>{if(done)return;const cur=roles[ri];ri=(ri+1)%roles.length;cur.classList.remove("on");cur.classList.add("out");roles[ri].classList.add("on");setTimeout(()=>cur.classList.remove("out"),650)},2100))},4000);
    raf=requestAnimationFrame(loop);
    later(end,13000)};
  Promise.race([Promise.all(rig.layers.map(i=>i.decode?i.decode().catch(()=>{}):Promise.resolve())),new Promise(r=>setTimeout(r,2000))]).then(start);
})();
