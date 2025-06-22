// ===================== Tamanho da fonte (Acessibilidade) =====================
const $body = $('body');
const $fontToggle = $('<button id="fontToggleBtn" class="btn btn-outline-primary position-fixed" style="bottom: 20px; right: 20px; z-index: 1000;">A+</button>');
$body.append($fontToggle);

function applyFontSize(size) {
  $body.css('font-size', size + 'px');
  localStorage.setItem('fontSize', size);
}

function toggleFontSize() {
  const currentSize = parseInt($body.css('font-size'));
  let newSize = currentSize === 14 ? 16 : currentSize === 16 ? 18 : 14;
  applyFontSize(newSize);
}

const storedFontSize = parseInt(localStorage.getItem('fontSize')) || 16;
applyFontSize(storedFontSize);

$fontToggle.on('click', toggleFontSize);

// ===================== Tema claro/escuro =====================
const modeToggle = document.getElementById('modeToggle');
const html = document.documentElement;
const logo = document.getElementById('imglogo');
const footerLogo = document.getElementById('footer-logo');

function applyTheme(theme) {
  html.setAttribute('data-bs-theme', theme);
  modeToggle.innerHTML = theme === 'dark'
    ? '<i class="bi bi-sun-fill"></i>'
    : '<i class="bi bi-moon-stars-fill"></i>';

  // Troca logo header
  logo.src = theme === 'dark'
    ? 'imagens-projeto/telecall-logo-white-1.png'
    : 'imagens-projeto/logo-hdr-475x110.png';

  // Troca logo footer
  footerLogo.src = theme === 'dark'
    ? 'imagens-projeto/telecall-logo-white-1.png'
    : 'imagens-projeto/logo-hdr-475x110.png';

  // Muda estilos do footer
  const footer = document.getElementById('footer');
  if (theme === 'dark') {
    footer.classList.remove('bg-light');
    footer.classList.add('bg-dark', 'text-light');
    footer.querySelectorAll('a').forEach(a => {
      a.classList.remove('text-secondary');
      a.classList.add('text-light');
    });
    footer.querySelectorAll('small').forEach(s => {
      s.classList.remove('text-muted');
      s.classList.add('text-light');
    });
  } else {
    footer.classList.remove('bg-dark', 'text-light');
    footer.classList.add('bg-light');
    footer.querySelectorAll('a').forEach(a => {
      a.classList.remove('text-light');
      a.classList.add('text-secondary');
    });
    footer.querySelectorAll('small').forEach(s => {
      s.classList.remove('text-light');
      s.classList.add('text-muted');
    });
  }

  localStorage.setItem('theme', theme);
}

// Tema salvo
const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
  applyTheme(storedTheme);
} else {
  applyTheme('light');
}

// Alternância de tema ao clicar
modeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-bs-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
});
