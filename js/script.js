// SLICK CARROSSEL DOS MAIS VENDIDOS
$(".best-sellers-carousel").slick({
  arrows: false,
  dots: true,
  slidesToShow: 2,
  slidesToScroll: 1,
  infinite: true,
  mobileFirst: true,
  responsive: [
    {
      breakpoint: 899,
      settings: {
        slidesToShow: 4,
        arrows: true,
        dots: false,
        infinite: true,
      },
    },
    {
      breakpoint: 767,
      settings: {
        infinite: true,
        dots: true,
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 419,
      settings: {
        infinite: true,
        dots: true,
        centerMode: false,
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 200,
      settings: {
        infinite: true,
        dots: true,
        centerMode: false,
        slidesToShow: 2,
      },
    },
  ],
});

// SOMA DE ITENS NO CARRINHO AO CLICAR EM "COMPRAR"
$(document).ready(function () {
  var count = 0;
  var badge = $(".cart-counter-number");
  badge.text(count);
  $(document).on("click", ".product-buy", function (e) {
    e.preventDefault;
    count++;
    badge.text(count);
  });
});

// VALIDACAO DE NOME
$(document).ready(function () {
  $(".newsletter-name-validation").hide();
  $(".newsletter-submit").click(function () {
    //atribuindo o valor do campo
    var sName = $("#newsletter-name-input").val();
    // condição
    if (sName == "" || sName.length < 3) {
      $("#newsletter-name-input").css("border", "1px solid #D7182A");
      $(".newsletter-name-validation")
        .show()
        .removeClass("ok")
        .addClass("erro")
        .text("Preencha com seu nome completo");
    }
  });
  $("#newsletter-name-input").focus(function () {
    $(".newsletter-name-validation.erro").hide();
    $("#newsletter-name-input").css("border", "1px solid #BDBDBD");
  });
});

// // VALIDACAO DE EMAIL
$(document).ready(function () {
  $(".newsletter-email-validation").hide();
  $(".newsletter-submit").click(function () {
    //atribuindo o valor do campo
    var sEmail = $("#newsletter-email-input").val();
    // filtros
    var emailFilter = /^.+@.+\..{2,}$/;
    var illegalChars = /[\(\)\<\>\,\;\:\\\/\"\[\]]/;
    // condição
    if (!emailFilter.test(sEmail) || sEmail.match(illegalChars)) {
      $("#newsletter-email-input").css("border", "1px solid #D7182A");
      $(".newsletter-email-validation")
        .show()
        .removeClass("ok")
        .addClass("erro")
        .text("Preencha com um e-mail válido");
    }
  });
  $("#newsletter-email-input").focus(function () {
    $(".newsletter-email-validation.erro").hide();
    $("#newsletter-email-input").css("border", "1px solid #BDBDBD");
  });
});
