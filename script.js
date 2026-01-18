// MENU TOGGLE (MOBILE)
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if(menuBtn && navLinks){
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  document.querySelectorAll("#navLinks a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
}


// ------------------- THEME TOGGLE -------------------
function addThemeButton(){
  const navbar = document.querySelector(".navbar");
  if(!navbar) return null;

  const btn = document.createElement("button");
  btn.className = "theme-toggle";
  btn.id = "themeToggle";
  btn.innerHTML = "🌙 <span>Dark</span>";

  navbar.appendChild(btn);
  return btn;
}

const themeBtn = addThemeButton();

if(themeBtn){
  const savedTheme = localStorage.getItem("theme");
  if(savedTheme === "light"){
    document.body.classList.add("light");
    themeBtn.innerHTML = "☀️ <span>Light</span>";
  }

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){
      themeBtn.innerHTML = "☀️ <span>Light</span>";
      localStorage.setItem("theme", "light");
    } else {
      themeBtn.innerHTML = "🌙 <span>Dark</span>";
      localStorage.setItem("theme", "dark");
    }
  });
}


// ------------------- REVEAL ANIMATION -------------------
const revealEls = document.querySelectorAll(".section, .hero, .footer");

revealEls.forEach(el => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
},{ threshold:0.12 });

revealEls.forEach(sec => revealObserver.observe(sec));


// ------------------- SKILL BAR ANIMATION (FIXED) -------------------
const fills = document.querySelectorAll(".fill");

fills.forEach(fill=>{
  const w = fill.getAttribute("data-width") || "60%";
  fill.style.width = "0%";
  fill.setAttribute("data-width", w);
});

const skillObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const fill = entry.target;
      fill.style.width = fill.getAttribute("data-width");
    }
  });
},{ threshold:0.35 });

fills.forEach(fill => skillObserver.observe(fill));


// ------------------- ACTIVE NAV HIGHLIGHT -------------------
const navA = document.querySelectorAll(".nav-links a");
const sectionsAll = document.querySelectorAll("section");

function setActiveLink(){
  let current = "";

  sectionsAll.forEach(section=>{
    const sectionTop = section.offsetTop - 120;
    if(window.scrollY >= sectionTop){
      current = section.getAttribute("id");
    }
  });

  navA.forEach(a=>{
    a.classList.remove("active");
    if(a.getAttribute("href") === "#" + current){
      a.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);


// ------------------- SCROLL PROGRESS BAR -------------------
const scrollBar = document.getElementById("scrollBar");

window.addEventListener("scroll", () => {
  if(!scrollBar) return;

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (scrollTop / docHeight) * 100;

  scrollBar.style.width = scrolled + "%";
});


// ------------------- HERO TYPEWRITER -------------------
const typeTarget = document.getElementById("typewriter");

const words = ["Full Stack Developer", "Java Backend Developer"];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect(){
  if(!typeTarget) return;

  const currentWord = words[wordIndex];

  if(!deleting){
    typeTarget.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;

    if(charIndex === currentWord.length){
      deleting = true;
      setTimeout(typeEffect, 1100);
      return;
    }
  } else {
    typeTarget.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;

    if(charIndex === 0){
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, deleting ? 55 : 85);
}
typeEffect();


// ------------------- PROJECT MODAL -------------------
const modal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");

const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalFeatures = document.getElementById("modalFeatures");
const modalLive = document.getElementById("modalLive");
const modalCode = document.getElementById("modalCode");

const projectsData = [
  {
    title: "🧮 Quantum Calc",
    desc: "Quantum Calc is a professional calculator suite with Simple + Robust modes supporting scientific functions, graph plotting, currency conversion, unit converter, matrix, complex, programmer & statistics modes.",
    img: "assets/project1.jpg",
    features: ["Scientific Calculator", "Graph Plotting (Zoom/Drag)", "Currency + Unit Converters", "Matrix & Statistics Modes"],

     live: "https://viswesdharani.github.io/Quantum-Calc/",
    code: "https://github.com/viswesdharani/Quantum-Calc"
  },
  {
    title: "🖼️ Wallpaper Wallet",
    desc: "Wallpaper Wallet is a modern wallpaper gallery web app with category browsing, global wallpaper search (Unsplash API), custom image upload, built-in editor tools, and AI Generator that converts images into an 8-second HD animated video using Node.js + FFmpeg.",
    img: "assets/project2.jpg",
    features: ["Category browsing", "Unsplash API Search", "Upload + Editor tools", "AI HD video generator (Node.js + FFmpeg)"],
    live: "https://viswesdharani.github.io/Wallpaper-Wallet/",
    code: "https://github.com/viswesdharani/Wallpaper-Wallet"
  }
];


document.querySelectorAll(".project-card").forEach((card, i) => {
  card.style.cursor = "pointer";

  card.addEventListener("click", () => {
    if(!modal) return;
    const p = projectsData[i] || projectsData[0];

    modalImg.src = p.img;
    modalTitle.textContent = p.title;
    modalDesc.textContent = p.desc;

    modalFeatures.innerHTML = "";
    p.features.forEach(f => {
      const li = document.createElement("li");
      li.textContent = f;
      modalFeatures.appendChild(li);
    });

    modalLive.href = p.live;
    modalCode.href = p.code;

    modal.classList.add("show");
  });
});

function closeModal(){
  if(modal) modal.classList.remove("show");
}

if(modalClose) modalClose.addEventListener("click", closeModal);

if(modal){
  modal.addEventListener("click", (e)=>{
    if(e.target === modal) closeModal();
  });
}

window.addEventListener("keydown", (e)=>{
  if(e.key === "Escape") closeModal();
});


// ------------------- CONTACT FORM -------------------
const contactForm = document.querySelector(".contact-form");

if(contactForm){
  contactForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    alert("✅ Message sent successfully! Thank you 😄");
    contactForm.reset();
  });
}


// ------------------- BACK TO TOP -------------------
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", ()=>{
  if(!backToTop) return;

  if(window.scrollY > 600){
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

if(backToTop){
  backToTop.addEventListener("click", ()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
