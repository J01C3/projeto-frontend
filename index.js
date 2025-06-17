$(document).ready(function () {
      const $body = $('body');
      const $navbar = $('#navbar');
      const $logo = $('#imglogo');
      const $modeToggle = $('#modeToggle');
      const $fontToggle = $('#fontToggle');

      // Caminhos das imagens para trocar
    const modavoApiImages = {
      light: 'imagens-projeto/Modavo-01-gt.png',
      dark: 'imagens-projeto/Modavo-02-gt.png'
    };

    const modavoPngImages = {
      light: 'imagens-projeto/Modavo-PNG.png',
      dark: 'imagens-projeto/Modavo-PNG-w.png' 
    };

      function applyTheme(theme) {
        if (theme === 'dark') {
          $body.removeClass('bg-light text-dark').addClass('bg-dark text-light');
          $navbar.removeClass('navbar-light bg-light').addClass('navbar-dark bg-dark');
          $modeToggle.html('<i class="bi bi-sun-fill"></i>');
          $logo.attr('src', 'imagens-projeto/telecall-logo-white-1.png');

          // Trocar imagens da seção-3 para versão branca
        $('.section-3 img[src*="caixa-api.png"]').attr('src', 'imagens-projeto/icones/caixa-api-w.png');
        $('.section-3 img[src*="varejo-api.png"]').attr('src', 'imagens-projeto/icones/varejo-api-w.png');
        $('.section-3 img[src*="call-api.png"]').attr('src', 'imagens-projeto/icones/call-api-w.png');
        $('.section-3 img[src*="saude-api.png"]').attr('src', 'imagens-projeto/icones/saude-api-w.png');

         // Trocar imagens Modavo para versão branca
        $('.modavo-api').attr('src', 'imagens-projeto/Modavo-02-gt.png');
        $('.modavo-png').attr('src','imagens-projeto/Modavo-PNG-w.png');

        // TROCA DE TEMA DO FOOTER
        $('#footer').removeClass('light-theme').addClass('dark-theme');
        $('#footer-logo').attr('src', 'imagens-projeto/telecall-logo-white-1.png'); // logo clara para dark

        // Ícones das redes sociais: escuros no modo claro
        $('.social-icon').removeClass('text-dark').addClass('text-light');
        
        // TROCA DE IMG ANTES DO FOOTER MODO ESCURO
        $('.modavo-platform-img').attr('src', 'imagens-projeto/modavo-platform-w.png');

      } else {
        $body.removeClass('bg-dark text-light').addClass('bg-light text-dark');
        $navbar.removeClass('navbar-dark bg-dark').addClass('navbar-light bg-light');
        $modeToggle.html('<i class="bi bi-moon-stars-fill"></i>');
        $logo.attr('src', 'imagens-projeto/logo-hdr-475x110.png');

        // Voltar imagens da seção-3 para versões normais
        $('.section-3 img').each(function () {
          const src = $(this).attr('src');
          const normalSrc = src.replace('-w.png', '.png');
          $(this).attr('src', normalSrc);
        });

         // Voltar imagens Modavo para versão normal
        $('.modavo-api').attr('src', 'imagens-projeto/Modavo-01-gt.png');
        $('.modavo-png').attr('src', 'imagens-projeto/Modavo-PNG.png');

         // TROCA DE TEMA DO FOOTER
        $('#footer').removeClass('dark-theme').addClass('light-theme');
        $('#footer-logo').attr('src', 'imagens-projeto/logo-hdr-475x110.png'); // logo normal

        // Ícones das redes sociais: claros no modo escuro
        $('.social-icon').removeClass('text-light').addClass('text-dark');
        
        // TROCA DE IMG ANTES DO FOOTER MODO CLARO
        $('.modavo-platform-img').attr('src', 'imagens-projeto/modavo-platform.png');
      }
        localStorage.setItem('theme', theme);
      }
      
      function applyFontSize(size) {
        $body.css('font-size', size + 'px');
        localStorage.setItem('fontSize', size);
      }
      function toggleFontSize() {
        const currentSize = parseInt($body.css('font-size'));
        let newSize = currentSize === 14 ? 16 : currentSize === 16 ? 18 : 14;
        applyFontSize(newSize);
      }
      const $carouselIndicators = $('#carouselExampleIndicators .carousel-indicators');
      const $carouselItems = $('#carouselExampleIndicators .carousel-item');
      $carouselIndicators.empty();
      $carouselItems.each(function(index) {
        const isActive = $(this).hasClass('active') ? 'active' : '';
        const ariaCurrent = $(this).hasClass('active') ? 'aria-current="true"' : '';
        const button = `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" class="${isActive}" ${ariaCurrent} aria-label="Slide ${index + 1}"></button>`;
        $carouselIndicators.append(button);
      });
      const storedTheme = localStorage.getItem('theme') || 'light';
      applyTheme(storedTheme);
      const storedFontSize = parseInt(localStorage.getItem('fontSize')) || 16;
      applyFontSize(storedFontSize);
      $modeToggle.on('click', () => {
        const newTheme = $body.hasClass('bg-light') ? 'dark' : 'light';
        applyTheme(newTheme);
      });
      $fontToggle.on('click', toggleFontSize);
    });