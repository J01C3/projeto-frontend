$(document).ready(function () {
  const $form = $('#LoginForm');
  const $login = $('#loginInput');  // Mudou para o campo de Login
  const $senha = $('#passwordInput');

  const $loginFeedback = $('#loginFeedback');
  const $senhaFeedback = $('#senhaFeedback');

  const toastSucesso = new bootstrap.Toast($('#toastSucesso')[0]);
  const toastErro = new bootstrap.Toast($('#toastErro')[0]);
  const toastInvalido = new bootstrap.Toast($('#toastInvalido')[0]); //
  const $html = $('html');
  const $themeBtn = $('#themeToggle');
  const $themeIcon = $('#themeIcon');
  const $logo = $('#logoTelecall');
  const $cadastrarBtn = $('#cadastrarBtn');
  const $fontSizeBtn = $('#fontSizeBtn');
  const $fontIcon = $('#fontIcon');

  // Redirecionar para cadastro
  $cadastrarBtn.on('click', function () {
    window.location.href = 'cadastro.html';
  });

  // Alterar tema
  function setTheme(theme) {
    $html.attr('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    $logo.fadeOut(200, function () {
      if (theme === 'dark') {
        $themeIcon.removeClass().addClass('bi bi-sun-fill');
        $logo.attr('src', 'imagens-projeto/telecall-logo-white-1.png');
        $cadastrarBtn.removeClass().addClass('btn btn-light w-100 py-2 my-2');
      } else {
        $themeIcon.removeClass().addClass('bi bi-moon-stars-fill');
        $logo.attr('src', 'imagens-projeto/logo-hdr-475x110.png');
        $cadastrarBtn.removeClass().addClass('btn btn-dark w-100 py-2 my-2');
      }
      $logo.fadeIn(200);
    });
  }

  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  $themeBtn.on('click', function () {
    const currentTheme = $html.attr('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  // Alterar tamanho da fonte
  function alterarFonte() {
    const currentFontSize = parseInt($('body').css('font-size'));
    let newFontSize;

    if (currentFontSize === 16) newFontSize = 18;
    else if (currentFontSize === 18) newFontSize = 22;
    else newFontSize = 16;

    $('body').css('font-size', newFontSize + 'px');
    localStorage.setItem('fontSize', newFontSize);
  }

  const savedFontSize = localStorage.getItem('fontSize');
  if (savedFontSize) {
    $('body').css('font-size', savedFontSize + 'px');
  }

  $fontSizeBtn.on('click', alterarFonte);

  // Preencher login salvo
  const rememberedLogin = localStorage.getItem('rememberedLogin');
  if (rememberedLogin) {
    $login.val(rememberedLogin);
    $('#flexCheckDefault').prop('checked', true);
  }

  // Validação e Login
  $form.on('submit', function (e) {
    e.preventDefault();

    $login.removeClass('is-invalid');
    $senha.removeClass('is-invalid');
    $loginFeedback.text('');
    $senhaFeedback.text('');

    // Validação do Login: exatamente 6 letras
    const loginValido = /^[A-Za-z]{6}$/.test($login.val());

    // Validação da Senha: exatamente 8 letras
    const senhaValida = /^[A-Za-z]{8}$/.test($senha.val());
    
    let valido = true;

    if (!loginValido) {
      $login.addClass('is-invalid');
      $loginFeedback.text('O login deve ter exatamente 6 letras (somente A-Z, a-z).');
      valido = false;
    }

    if (!senhaValida) {
      $senha.addClass('is-invalid');
      $senhaFeedback.text('A senha deve ter exatamente 8 caracteres alfabéticos.');
      valido = false;
    }

    if (!valido) {
      toastErro.show();
      return;
    }

    // Se "Lembrar login" estiver marcado
    if ($('#flexCheckDefault').is(':checked') && loginValido) {
      localStorage.setItem('rememberedLogin', $login.val());
    } else {
      localStorage.removeItem('rememberedLogin');
    }

    // Buscar usuário no localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioValido = usuarios.find(user => user.login === $login.val() && user.senha === $senha.val());

if (usuarioValido) {
  toastSucesso.show();
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1500);
} else {
  toastInvalido.show();
  $senha.val('');
  $senha.focus();
  return;
}
  });
});

