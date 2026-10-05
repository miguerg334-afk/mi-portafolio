// 1. Scroll suave con Lenis
const lenis = new Lenis({
  autoRaf: true,
  anchors: {
    offset: -70,
    duration: 1.35,
  },
  duration: 1.35,
  easing: (t) => 1 - Math.pow(1 - t, 4),
  smoothWheel: true,
  wheelMultiplier: 0.85,
  syncTouch: true,
  syncTouchLerp: 0.08,
  touchInertiaMultiplier: 22,
});

// 2. Escena, Cámara y Renderizador
const canvas = document.querySelector("#webgl");
const scene = new THREE.Scene();

// Niebla para dar profundidad al túnel
scene.fog = new THREE.FogExp2(0x030712, 0.035);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);
camera.position.z = 0;

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// 3. Creación del Túnel de Partículas
const count = 6000;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

const colorCyan = new THREE.Color(0x38bdf8);
const colorPurple = new THREE.Color(0xa855f7);

for (let i = 0; i < count; i++) {
  // Coordenadas en un cilindro (Túnel)
  const radius = 3 + Math.random() * 1.5;
  const angle = Math.random() * Math.PI * 2;
  const z = -Math.random() * 100; // Longitud del túnel

  positions[i * 3] = Math.cos(angle) * radius;
  positions[i * 3 + 1] = Math.sin(angle) * radius;
  positions[i * 3 + 2] = z;

  // Mezcla de colores entre Cyan y Púrpura
  const mixedColor = colorCyan.clone().lerp(colorPurple, Math.random());
  colors[i * 3] = mixedColor.r;
  colors[i * 3 + 1] = mixedColor.g;
  colors[i * 3 + 2] = mixedColor.b;
}

geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

// Material de puntos
const material = new THREE.PointsMaterial({
  size: 0.04,
  vertexColors: true,
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending,
});

const particleTunnel = new THREE.Points(geometry, material);
scene.add(particleTunnel);

// 4. Control del Scroll
let scrollProgress = 0;
let targetZ = 0;

window.addEventListener("scroll", () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress = window.scrollY / maxScroll;
  // Mueve la cámara hasta -80 unidades en el eje Z al scrollear al final
  targetZ = -scrollProgress * 80;
});

// 5. Redimensionamiento Responsive
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 6. Bucle de Animación
const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();

  // Rotación constante del túnel para dar vida a la escena
  particleTunnel.rotation.z = elapsedTime * 0.05;

  // Interpolación suave (lerp) para el movimiento de cámara
  camera.position.z += (targetZ - camera.position.z) * 0.05;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

// 7. Diccionario y Lógica Multilenguaje
const translations = {
  es: {
    nav_start: "Inicio",
    nav_skills: "Habilidades",
    nav_projects: "Proyectos",
    nav_contact: "Contacto",
    hero_tag: "// INICIO",
    hero_status: "DISPONIBLE PARA NUEVOS PROYECTOS",
    hero_subtitle: "SOFTWARE DEVELOPER & TECH ENTHUSIAST",
    hero_desc: "Desarrollador enfocado en la creación de soluciones digitales, sistemas y software a medida. Tengo capacidad para construir e implementar una amplia variedad de aplicaciones, desde arquitecturas web avanzadas hasta integraciones de backend y componentes interactivos.",
    hero_projects: "VER PROYECTOS",
    hero_contact: "CONTACTAR",
    skills_tag: "// CORE_SYSTEMS_DIAGNOSTIC",
    skills_title: "HABILIDADES & ARQUITECTURA",
    skills_desc: "Capacidades técnicas organizadas por capas de desarrollo:",
    mod1_title: "INTERFACES & EXPERIENCIA 3D",
    mod2_title: "LOGIC & BACKEND CORE",
    mod3_title: "AUTOMATIZACIÓN & BOTS IA",
    mod4_title: "DATOS & DESPLIEGUE",
    proj_tag: "// REPOSITORIOS_DESPLEGADOS",
    proj_title: "PROYECTOS DESTACADOS",
    proj_desc: "Una selección de experiencias digitales desarrolladas para organizaciones reales.",
    project_summary: "Sitio institucional moderno para presentar su propuesta educativa, oferta académica y canales de contacto de forma clara y accesible.",
    project_link: "VISITAR SITIO",
    github_prompt: "Puedes ver más proyectos y explorar mi código en GitHub.",
    github_link: "VER MÁS EN GITHUB",
    contact_tag: "// TRANSMISSION_MODULE",
    contact_title: "ESTABLECER CONTACTO",
    contact_desc: "¿Tienes una propuesta, un proyecto en mente o quieres colaborar? Elige tu canal preferido para iniciar la transmisión:",
    email_label: "EMAIL DIRECTO",
    response_time: "RESPUESTA ESTIMADA: < 24 HRS"
  },
  en: {
    nav_start: "Home",
    nav_skills: "Skills",
    nav_projects: "Projects",
    nav_contact: "Contact",
    hero_tag: "// START",
    hero_status: "AVAILABLE FOR NEW PROJECTS",
    hero_subtitle: "SOFTWARE DEVELOPER & TECH ENTHUSIAST",
    hero_desc: "Developer focused on building digital solutions, systems, and custom software. Able to build and deploy a wide range of applications, from advanced web architectures to backend integrations and interactive components.",
    hero_projects: "VIEW PROJECTS",
    hero_contact: "CONTACT ME",
    skills_tag: "// CORE_SYSTEMS_DIAGNOSTIC",
    skills_title: "SKILLS & ARCHITECTURE",
    skills_desc: "Technical skills organized by development layers:",
    mod1_title: "INTERFACES & 3D EXPERIENCE",
    mod2_title: "LOGIC & BACKEND CORE",
    mod3_title: "AUTOMATION & AI BOTS",
    mod4_title: "DATA & DEPLOYMENT",
    proj_tag: "// DEPLOYED_REPOSITORIES",
    proj_title: "FEATURED PROJECTS",
    proj_desc: "A selection of digital experiences developed for real organizations.",
    project_summary: "A modern institutional website that clearly presents the school's educational approach, academic offering, and contact channels.",
    project_link: "VISIT WEBSITE",
    github_prompt: "You can see more projects and explore my code on GitHub.",
    github_link: "SEE MORE ON GITHUB",
    contact_tag: "// TRANSMISSION_MODULE",
    contact_title: "GET IN TOUCH",
    contact_desc: "Have a proposal, project in mind, or want to collaborate? Choose your preferred channel to start transmission:",
    email_label: "DIRECT EMAIL",
    response_time: "ESTIMATED RESPONSE: < 24 HRS"
  }
};

let currentLang = 'es';
const langToggleBtn = document.getElementById('lang-toggle');
const langEs = document.getElementById('lang-es');
const langEn = document.getElementById('lang-en');

langToggleBtn.addEventListener('click', () => {
  currentLang = currentLang === 'es' ? 'en' : 'es';

  // Cambiar clases visuales en el botón
  if (currentLang === 'en') {
    langEs.classList.remove('active');
    langEn.classList.add('active');
  } else {
    langEn.classList.remove('active');
    langEs.classList.add('active');
  }

  // Actualizar todos los elementos con data-key
  document.querySelectorAll('[data-key]').forEach(element => {
    const key = element.getAttribute('data-key');
    if (translations[currentLang][key]) {
      element.textContent = translations[currentLang][key];
    }
  });
});

// 8. Lógica del Menú Hamburguesa Responsivo
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('#nav-menu a');

if (menuToggle && navMenu) {
  // Abrir / Cerrar menú al hacer clic en el botón hamburguesa
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('is-active');
    navMenu.classList.toggle('is-active');
  });

  // Cerrar el menú automáticamente al hacer clic en un enlace de navegación
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('is-active');
      navMenu.classList.remove('is-active');
    });
  });
}
