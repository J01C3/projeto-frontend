
    $(document).ready(function () {
      const $form = $('#LoginForm');
      const $login = $('#emailInput');
      const $senha = $('#passwordInput');
      const $emailFeedback = $('#emailFeedback');
      const $senhaFeedback = $('#senhaFeedback');
      const toastSucesso = new bootstrap.Toast($('#toastSucesso')[0]);
      const toastErro = new bootstrap.Toast($('#toastErro')[0]);
      const $html = $('html');
      const $themeBtn = $('#themeToggle');
      const $themeIcon = $('#themeIcon');
      const $logo = $('#logoTelecall');
      const $cadastrarBtn = $('#cadastrarBtn').on('click', function() { window.location.href = 'cadastro.html'; });
      const $fontSizeBtn = $('#fontSizeBtn');
      const $fontIcon = $('#fontIcon');

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

      // Preencher email salvo
      const rememberedEmail = localStorage.getItem('rememberedEmail');
      if (rememberedEmail) {
        $login.val(rememberedEmail);
        $('#flexCheckDefault').prop('checked', true);
      }

      $form.on('submit', function (e) {
  e.preventDefault();

  $login.removeClass('is-invalid');
  $senha.removeClass('is-invalid');
  $emailFeedback.text('');
  $senhaFeedback.text('');

  let valido = true;
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($login.val());
  const senhaValida = /^[A-Za-z]{8,}$/.test($senha.val());

  if (!emailValido) {
    $login.addClass('is-invalid');
    $emailFeedback.text('Formato de e-mail inválido.');
    valido = false;
  }

  if (!senhaValida) {
    $senha.addClass('is-invalid');
    $senhaFeedback.text('A senha deve ter no mínimo 8 caracteres alfabéticos (sem números ou símbolos).');
    valido = false;
  }

  if ($('#flexCheckDefault').is(':checked') && emailValido) {
    localStorage.setItem('rememberedEmail', $login.val());
  } else {
    localStorage.removeItem('rememberedEmail');
  }

  if (valido) {
    // Recupera os dados salvos
    const usuarioSalvo = localStorage.getItem("usuario");
    const senhaSalva = localStorage.getItem("senha");

    // Verifica se o que foi digitado bate com o que está salvo
    if ($login.val() === usuarioSalvo && $senha.val() === senhaSalva) {
      toastSucesso.show();
      setTimeout(() => {
        window.location.href = 'indexT302.html'; // redireciona
      }, 1500);
    } else {
      toastErro.show();
    }
  } else {
    toastErro.show();
        }
      });
    });
