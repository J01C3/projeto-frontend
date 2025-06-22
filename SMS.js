document.addEventListener('DOMContentLoaded', function () {
  const html = document.documentElement;
  const $body = $('body');
  const $navbar = $('#navbar');
  const $modeToggle = $('#modeToggle');
  const $logo = $('#imglogo');
  const $footer = $('#footer');
  const $footerLogo = $('#footer-logo');
  const $fontToggle = $('#fontToggle');
  const $fontToggleIcon = $('#fontToggle i');

  // Aplica o tema (light ou dark)
  function applyTheme(theme) {
    html.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);

    if (theme === 'dark') {
      $body.removeClass('bg-light text-dark').addClass('bg-dark text-light');
      $navbar.removeClass('navbar-light bg-light').addClass('navbar-dark bg-dark');
      $modeToggle.html('<i class="bi bi-sun-fill"></i>');
      $logo.attr('src', 'imagens-projeto/telecall-logo-white-1.png');
      $footer.removeClass('light-theme').addClass('dark-theme');
      $footerLogo.attr('src', 'imagens-projeto/telecall-logo-white-1.png');
      $fontToggleIcon.css('color', 'white');
    } else {
      $body.removeClass('bg-dark text-light').addClass('bg-light text-dark');
      $navbar.removeClass('navbar-dark bg-dark').addClass('navbar-light bg-light');
      $modeToggle.html('<i class="bi bi-moon-stars-fill"></i>');
      $logo.attr('src', 'imagens-projeto/logo-hdr-475x110.png');
      $footer.removeClass('dark-theme').addClass('light-theme');
      $footerLogo.attr('src', 'imagens-projeto/logo-hdr-475x110.png');
      $fontToggleIcon.css('color', 'black');
    }
  }

  // Aplica o tamanho da fonte no body
  function applyFontSize(size) {
    $body.css('font-size', size + 'px');
    localStorage.setItem('fontSize', size);
  }

  // Alterna o tamanho da fonte entre 14, 16 e 18
  function toggleFontSize() {
    const currentSize = parseInt($body.css('font-size'));
    let newSize;

    console.log("Botão de fonte clicado");

    if (currentSize <= 14) {
      newSize = 16;
    } else if (currentSize === 16) {
      newSize = 18;
    } else {
      newSize = 14;
    }

    applyFontSize(newSize);
  }

  // Inicialização: aplica tema salvo ou light por padrão
  const storedTheme = localStorage.getItem('theme');
  applyTheme(storedTheme || 'light');

  // Inicialização: aplica tamanho de fonte salvo ou padrão 14
  const savedSize = localStorage.getItem('fontSize');
  if (savedSize) {
    applyFontSize(savedSize);
  } else {
    applyFontSize(14);
  }

  // Eventos dos botões
  $modeToggle.on('click', () => {
    const currentTheme = html.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  });

  $fontToggle.on('click', toggleFontSize);
});

