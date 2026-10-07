
const CONFIG = {
  email: "pedro300606henrique@gmail.com",
  github: "https://github.com/Pxm700",
  linkedin: "https://www.linkedin.com/in/pedro-henrique-machado-freitas/",
  whatsapp: "5511942992879"
};

const PROJETOS = [
  { t: "Comitê Burnout", tag: "Destaque", hi: true,
    d: "Projeto em Python (Jupyter Notebook) que usa pandas para trabalhar com uma base de dados sobre burnout do Kaggle, escolhida por mim. A partir dela, prevê o nível de burnout de uma pessoa (leve, médio ou alto) e calcula a acurácia para medir o quanto o resultado acerta.",
    tech: ["Python", "Pandas", "Jupyter Notebook", "Kaggle", "Predição", "Acurácia"],
    code: "https://github.com/Pxm700/Comite--Burnout", live: "" },
  { t: "Sistema de Chamados", tag: "No ar",
    d: "Cadastro e gestão de chamados por loja. Os chamados mudam de cor conforme o tempo em aberto, e há filtros por número, status, equipe e loja. Os dados ficam salvos no navegador, sem banco de dados.",
    tech: ["JavaScript", "HTML", "CSS", "localStorage", "Vercel"],
    code: "https://github.com/Pxm700/Sistema-Chamados", live: "https://machadoz.vercel.app/" },
  { t: "EcoKids", tag: "Projeto acadêmico",
    d: "Jogo web educativo (Missão Reciclagem) que ensina crianças sobre reciclagem, coleta seletiva e sustentabilidade de forma divertida e interativa. Feito como projeto A3 de usabilidade.",
    tech: ["JavaScript", "HTML", "CSS", "Usabilidade"],
    code: "https://github.com/Pxm700/Projeto-A3-Usabilidade---Eco-Kids", live: "https://ecokids-zeta.vercel.app/" },
  { t: "Login e Dashboard", tag: "Estudo",
    d: "Sistema de login com redirecionamento para um dashboard, feito com HTML, CSS e JavaScript.",
    tech: ["JavaScript", "HTML", "CSS"],
    code: "https://github.com/Pxm700/longin-page-dashboard", live: "" }
];


const $ = s => document.querySelector(s);
const reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;

const ASSUNTO = "Contato pelo portfólio";
const CORPO = "Olá, Pedro! Vi seu portfólio e gostaria de conversar.";
const mailto = "mailto:" + CONFIG.email + "?subject=" + encodeURIComponent(ASSUNTO) + "&body=" + encodeURIComponent(CORPO);
const gmail = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(CONFIG.email) + "&su=" + encodeURIComponent(ASSUNTO) + "&body=" + encodeURIComponent(CORPO);
$("#cta").href = mailto;
$("#c-gh").href = CONFIG.github; $("#c-gh b").textContent = "/" + CONFIG.github.split("/").pop();
$("#c-in").href = CONFIG.linkedin; $("#c-in b").textContent = "/in/" + CONFIG.linkedin.split("/in/")[1].replace("/", "");
$("#c-em").href = mailto; $("#c-em b").textContent = CONFIG.email;

const desktop = matchMedia("(hover:hover) and (pointer:fine)").matches;
[$("#cta"), $("#c-em")].forEach(a => a.addEventListener("click", e => {
  if (!desktop) return;
  e.preventDefault();
  window.open(gmail, "_blank", "noopener");
}));

if (CONFIG.whatsapp) {
  const w = document.createElement("a");
  w.href = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(CORPO);
  w.target = "_blank"; w.rel = "noopener";
  w.innerHTML = "<small>WhatsApp</small><b>Conversar agora</b>";
  document.querySelector(".cards").appendChild(w);
}

$("#lista").innerHTML = PROJETOS.map((p, i) => `
  <div class="item">
    <button class="row" aria-expanded="${i === 0}" aria-controls="d${i}">
      <span class="n">0${i + 1}</span><span class="t">${p.t}</span>
      <span class="tag ${p.hi ? "hi" : ""}">${p.tag}</span><span class="pl" aria-hidden="true">+</span>
    </button>
    <div class="det" id="d${i}"><div>
      <p>${p.d}</p>
      <div class="chips">${p.tech.map(t => `<span>${t}</span>`).join("")}</div>
      <div class="links"><a href="${p.code}" target="_blank" rel="noopener">Ver código ↗</a>${p.live ? `<a href="${p.live}" target="_blank" rel="noopener">Ver online ↗</a>` : ""}</div>
    </div></div>
  </div>`).join("");
document.querySelectorAll(".row").forEach(b => b.addEventListener("click", () => {
  const abrir = b.getAttribute("aria-expanded") !== "true";
  document.querySelectorAll(".row").forEach(r => r.setAttribute("aria-expanded", "false"));
  b.setAttribute("aria-expanded", String(abrir));
}));

const cmds = ['git commit -m "um projeto de cada vez"', "npm start", "git push origin main"];
const el = $("#typed");
if (reduz) el.textContent = cmds[0];
else (function tick(i = 0, n = 0, apagando = false) {
  const c = cmds[i];
  el.textContent = c.slice(0, n);
  let t = apagando ? 28 : 65;
  if (!apagando && n === c.length) { apagando = true; t = 1600; }
  else if (apagando && n === 0) { apagando = false; i = (i + 1) % cmds.length; t = 400; }
  setTimeout(() => tick(i, n + (apagando ? -1 : 1), apagando), t);
})();


function contar(e) {
  const alvo = +e.dataset.to; if (reduz) { e.textContent = alvo; return; }
  const ini = performance.now();
  (function f(agora) {
    const p = Math.min((agora - ini) / 1100, 1);
    e.textContent = Math.round(alvo * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(f);
  })(ini);
}
const io = new IntersectionObserver(es => es.forEach(x => {
  if (!x.isIntersecting) return;
  x.target.classList.add("in");
  x.target.querySelectorAll("[data-to]").forEach(contar);
  io.unobserve(x.target);
}), { threshold: .15 });
document.querySelectorAll(".rv").forEach(e => io.observe(e));


const links = [...document.querySelectorAll(".top nav a")];
const nav = new IntersectionObserver(es => es.forEach(x => {
  if (x.isIntersecting) links.forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + x.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section").forEach(s => nav.observe(s));


const glow = $(".glow");
if (!reduz && matchMedia("(hover:hover)").matches) {
  let mx = innerWidth / 2, my = innerHeight / 3, gx = mx, gy = my;
  addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; });
  (function anim() {
    gx += (mx - gx) * .06; gy += (my - gy) * .06;
    glow.style.transform = `translate(${gx}px,${gy}px)`;
    requestAnimationFrame(anim);
  })();
} else glow.style.display = "none";