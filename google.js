const modeToggle = document.getElementById('modeToggle');
const html = document.documentElement;
const logo = document.getElementById('imglogo');

const $grafico = $('#graficoImg');
const $telefone = $('#telefoneImg');
const $mulher = $('#mulherImg');
const $engrenagem = $('#engrenagemImg');
const $celular = $('#celularImg');
const $icones = $('#iconesImg');

function applyTheme(theme) {
  html.setAttribute('data-bs-theme', theme);

  modeToggle.innerHTML = theme === 'dark'
    ? '<i class="bi bi-sun-fill"></i>'
    : '<i class="bi bi-moon-stars-fill"></i>';

  logo.src = theme === 'dark'
    ? 'imagens-projeto/telecall-logo-white-1.png'
    : 'imagens-projeto/logo-hdr-475x110.png';

  if (theme === 'dark') {
    $grafico.attr('src', 'imagens-projeto/graficomodoescuro.png');
    $telefone.attr('src', 'imagens-projeto/telefonemodoescuro.png');
    $mulher.attr('src', 'imagens-projeto/mulhermodoescuro.png');
    $engrenagem.attr('src', 'imagens-projeto/engrenagemmodoescuro.png');
    $celular.attr('src', 'imagens-projeto/celularmodoescuro.png');
    $icones.attr('src', 'imagens-projeto/iconesmodoescuro.png');

    // TROCA DE TEMA DO FOOTER
    $('#footer').removeClass('light-theme').addClass('dark-theme');
    $('#footer-logo').attr('src', 'imagens-projeto/telecall-logo-white-1.png'); // logo clara para dark

  } else {
    $grafico.attr('src', 'imagens-projeto/graficomodoclaro.png');
    $telefone.attr('src', 'imagens-projeto/telefonemodoclaro.png');
    $mulher.attr('src', 'imagens-projeto/mulhermodoclaro.png');
    $engrenagem.attr('src', 'imagens-projeto/engrenagemmodoclaro.png');
    $celular.attr('src', 'imagens-projeto/celularmodoclaro.png');
    $icones.attr('src' , 'imagens-projeto/iconesmodoclaro.png');

    // TROCA DE TEMA DO FOOTER
    $('#footer').removeClass('dark-theme').addClass('light-theme');
    $('#footer-logo').attr('src', 'imagens-projeto/logo-hdr-475x110.png'); // logo normal
  }

  localStorage.setItem('theme', theme);
}


const $body = $('body');
const $fontToggle = $('#fontToggle');

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


// Aplica o tema salvo no localStorage ao carregar
const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
  applyTheme(storedTheme);
} else {
  applyTheme('light');
}

// Botão que alterna o tema
modeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-bs-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
});