// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  nav.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav__link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('nav__link--active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('nav__link--active');
  });

  // Header shadow
  const header = document.getElementById('header');
  if (scrollY > 50) header.classList.add('header--scrolled');
  else header.classList.remove('header--scrolled');
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Formulário -> WhatsApp
const whatsappNumber = '55819855535843';

const interesseLabels = {
  internacao: 'Internação',
  visita: 'Agendar visita',
  informacoes: 'Mais informações',
  outro: 'Outro assunto'
};

document.getElementById('contatoForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const interesse = document.getElementById('interesse').value;
  const mensagem = document.getElementById('mensagem').value.trim();

  if (!nome || !email) {
    alert('Por favor, preencha pelo menos seu nome e e-mail.');
    return;
  }

  if (!interesse) {
    alert('Por favor, selecione o interesse.');
    return;
  }

  const interesseTexto = interesseLabels[interesse] || interesse;

  let texto = `Olá! Gostaria de entrar em contato através do site.\n\n`;
  texto += `*Nome:* ${nome}\n`;
  texto += `*E-mail:* ${email}\n`;
  if (telefone) texto += `*Telefone:* ${telefone}\n`;
  texto += `*Interesse:* ${interesseTexto}\n`;
  if (mensagem) texto += `*Mensagem:* ${mensagem}\n`;

  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank');

  this.reset();
});
