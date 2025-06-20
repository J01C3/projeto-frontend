$(document).ready(function () {
  // Seletores dos campos e feedback
  const $form = $('#cadastroForm');
  const $nome = $('#nomeInput');
  const $dataNascimento = $('#dataNascimento');
  const $sexo = $('#sexo');
  const $nomeMaterno = $('#nomeMaterno');
  const $cpf = $('#cpf');
  const $celular = $('#celular');
  const $fixo = $('#fixo');
  const $endereco = $('#endereco');
  const $login = $('#loginInput');
  const $senha = $('#passwordInput');
  const $confirmarSenha = $('#confirmarSenha');

  const $nomeFeedback = $('#nomeFeedback');
  const $dataFeedback = $('#dataFeedback');
  const $sexoFeedback = $('#sexoFeedback');
  const $nomeMaternoFeedback = $('#nomeMaternoFeedback');
  const $cpfFeedback = $('#cpfFeedback');
  const $celularFeedback = $('#celularFeedback');
  const $fixoFeedback = $('#fixoFeedback');
  const $enderecoFeedback = $('#enderecoFeedback');
  const $loginFeedback = $('#loginFeedback');
  const $senhaFeedback = $('#senhaFeedback');
  const $confirmarSenhaFeedback = $('#confirmarSenhaFeedback');

  // Toasts do Bootstrap
  const toastSucesso = new bootstrap.Toast($('#toastSucesso')[0]);
  const toastErro = new bootstrap.Toast($('#toastErro')[0]);

  // Variáveis para tema, logo e botões
  const $html = $('html');
  const $logo = $('#logoTelecall');
  const $themeBtn = $('#themeToggle');
  const $themeIcon = $('#themeIcon');
  const $cadastrarBtn = $('#cadastrarBtn');
  const $fontSizeBtn = $('#fontSizeBtn');

  // Função para setar tema (dark ou light)
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

  // Aplica o tema salvo no localStorage ou padrão 'light'
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  // Clique no botão de tema: alterna entre dark e light
    $themeBtn.on('click', function () {
    const currentTheme = $html.attr('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  

  // Função para alterar o tamanho da fonte cíclicamente
  function alterarFonte() {
    const currentFontSize = parseInt($('body').css('font-size'));
    let newFontSize;

    if (currentFontSize === 16) newFontSize = 18;
    else if (currentFontSize === 18) newFontSize = 22;
    else newFontSize = 16;

    $('body').css('font-size', newFontSize + 'px');
    localStorage.setItem('fontSize', newFontSize);
  }

  // Aplica tamanho de fonte salvo se houver
  const savedFontSize = localStorage.getItem('fontSize');
  if (savedFontSize) {
    $('body').css('font-size', savedFontSize + 'px');
  }

  // Clique para alterar o tamanho da fonte
  $fontSizeBtn.on('click', alterarFonte);

  // Máscara para telefone no formato (+55)XX-XXXXXXXX
function aplicarMascaraTelefone($campo) {
  $campo.on('input', function () {
    let valorNumerico = this.value.replace(/\D/g, '');

    if (valorNumerico.startsWith('55')) {
      valorNumerico = valorNumerico.substring(2);
    }

    if (valorNumerico.length > 11) {
      valorNumerico = valorNumerico.slice(0, 11);
    }

    let resultado = '(+55)';

    if (valorNumerico.length <= 2) {
      resultado += valorNumerico;
    } else {
      resultado += valorNumerico.substring(0, 2) + '-' + valorNumerico.substring(2, 10);
    }

    this.value = resultado;
  });

  $campo.on('keydown', function (e) {
    if (e.key === 'Backspace' && this.value === '(+55)') {
      this.value = '';
      e.preventDefault();
    }
  });
}

  aplicarMascaraTelefone($celular);
  aplicarMascaraTelefone($fixo);

  // Validação e envio do formulário
  $form.on('submit', function (e) {
    e.preventDefault();

    // Limpa erros anteriores
    $('input, select').removeClass('is-invalid');
    $('.invalid-feedback').text('');

    let valido = true;

    // Validações conforme regras
    if (!/^[A-Za-zÀ-ÿ\s]{15,60}$/.test($nome.val().trim())) {
      $nome.addClass('is-invalid');
      $nomeFeedback.text('Nome deve ter entre 15 e 60 letras (somente letras e espaços).');
      valido = false;
    }

    if (!$dataNascimento.val()) {
      $dataNascimento.addClass('is-invalid');
      $dataFeedback.text('Informe a data de nascimento.');
      valido = false;
    }

    if (!$sexo.val()) {
      $sexo.addClass('is-invalid');
      $sexoFeedback.text('Selecione o sexo.');
      valido = false;
    }

    if (!/^[A-Za-zÀ-ÿ\s]{15,60}$/.test($nomeMaterno.val().trim())) {
      $nomeMaterno.addClass('is-invalid');
      $nomeMaternoFeedback.text('Nome materno deve ter entre 15 e 60 letras (somente letras e espaços).');
      valido = false;
    }


  if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test($cpf.val().trim())) {
  $cpf.addClass('is-invalid');
  $cpfFeedback.text('CPF deve estar no formato 000.000.000-00.');
  valido = false;
}


    if (!/^\(\+55\)\d{2}-\d{8}$/.test($celular.val().trim())) {
      $celular.addClass('is-invalid');
      $celularFeedback.text('Celular deve estar no formato (+55)XX-XXXXXXXX.');
      valido = false;
    }

    if (!/^\(\+55\)\d{2}-\d{8}$/.test($fixo.val().trim())) {
      $fixo.addClass('is-invalid');
      $fixoFeedback.text('Fixo deve estar no formato (+55)XX-XXXXXXXX.');
      valido = false;
    }

    if (!$endereco.val().trim()) {
      $endereco.addClass('is-invalid');
      $enderecoFeedback.text('Informe o endereço completo.');
      valido = false;
    }

    if (!/^[A-Za-z]{6}$/.test($login.val().trim())) {
      $login.addClass('is-invalid');
      $loginFeedback.text('Login deve ter exatamente 6 letras (somente letras).');
      valido = false;
    }

    if (!/^[A-Za-z]{8}$/.test($senha.val().trim())) {
      $senha.addClass('is-invalid');
      $senhaFeedback.text('Senha deve ter exatamente 8 letras (somente letras).');
      valido = false;
    }

    if ($senha.val().trim() !== $confirmarSenha.val().trim()) {
      $confirmarSenha.addClass('is-invalid');
      $confirmarSenhaFeedback.text('As senhas não coincidem.');
      valido = false;
    }

    if (!valido) {
      toastErro.show();
      return;
    }

    // Armazena dados no localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    usuarios.push({
      nome: $nome.val().trim(),
      dataNascimento: $dataNascimento.val().trim(),
      sexo: $sexo.val().trim(),
      nomeMaterno: $nomeMaterno.val().trim(),
      cpf: $cpf.val().trim(),
      celular: $celular.val().trim(),
      fixo: $fixo.val().trim(),
      endereco: $endereco.val().trim(),
      login: $login.val().trim(),
      senha: $senha.val().trim()
    });

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    toastSucesso.show();
    $form[0].reset();

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);
  });
});




