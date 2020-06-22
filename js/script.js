var global = {
  init: function () {
    this.minicart();
    this.getProducts();
    this.listeners();
  },
  listeners: function () {
    $(".newsletter-submit").click(function () {
      global.validateName();
      global.validateEmail();
      global.newsletterSend();
    });

    $("#newsletter-name-input").focus(function () {
      $(".newsletter-name-validation.erro").hide();
      $("#newsletter-name-input").css("border", "1px solid #BDBDBD");
    });

    $("#newsletter-email-input").focus(function () {
      $(".newsletter-email-validation.erro").hide();
      $("#newsletter-email-input").css("border", "1px solid #BDBDBD");
    });
  },
  minicart: function () {
    // SOMA DE ITENS NO CARRINHO AO CLICAR EM "COMPRAR"
    const badgeCounter = localStorage.getItem("badgeCounter");
    var count = badgeCounter ? badgeCounter : 0;
    var badge = $(".cart-counter-number");
    badge.text(count);
    $(document).on("click", ".product-description-buy", function (e) {
      e.preventDefault;
      count++;
      badge.text(count);
      localStorage.setItem("badgeCounter", count);
    });
  },
  slickProduct: function () {
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
          breakpoint: 500,
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
  },
  hoverProduct: function () {
    // Quando existe o evento hover no produto ele mostra o botao se for desk
    var tam = $(window).width();
    if (tam >= 1024) {
      $(".product").hover(function () {
        $(this).find(".product-description").toggleClass("active");
      });
    }
  },
  validateName: function () {
    // Valida se o nome inserido é valido

    //atribuindo o valor do campo
    var sName = $("#newsletter-name-input").val();
    // condição
    if (sName == "" || sName.length < 3) {
      $("#newsletter-name-input").css("border", "1px solid #D7182A");
      $(".newsletter-name-validation")
        .show()
        .addClass("erro")
        .text("Preencha com seu nome completo");
      return false;
    }
    $(".newsletter-name-validation").hide();
    return true;
  },
  validateEmail: function () {
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
        .addClass("erro")
        .text("Preencha com um e-mail válido");
      return false;
    }
    $(".newsletter-email-validation").hide();
    return true;
  },
  newsletterSend: function () {
    if (global.validateName() && global.validateEmail()) {
      const body = {
        email: $("#newsletter-email-input").val(),
        name: $("#newsletter-name-input").val(),
      };
      $.ajax({
        url: "https://corebiz-test.herokuapp.com/api/v1/newsletter",
        type: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(body),
        dataType: "json",
        success: function (data) {
          alert("Sucesso");
        },
        error: function (request, error) {
          console.log(error);
        },
      });
    }
  },
  getProducts: function () {
    $.ajax({
      url: "https://corebiz-test.herokuapp.com/api/v1/products",
      type: "GET",
      dataType: "json",
      success: function (data) {
        global.renderProducts(data);
      },
      error: function (request, error) {
        console.log(error);
      },
    });
  },
  formatValue: function (value) {
    const newValue = value / 100;
    return newValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  },
  renderProducts: function (data) {
    // adicinei um item a mais pra ativar o slick com 5 items
    data.push(data[0]);
    for (var i = 0; i < data.length; i++) {
      const product = data[i];
      const discount = product.listPrice
        ? '<p class="product-description-sold">de ' +
          global.formatValue(product.listPrice) +
          "</p>"
        : '<p class="product-description-sold"></p>';

      const installmentQuantity = product.installments[0]
        ? '<p class="product-description-price-installment"> ou em ' +
          product.installments[0].quantity +
          "x de R$ " +
          global.formatValue(product.installments[0].value) +
          "</p>"
        : '<p class="product-description-price-installment"></p>';

      var productHtml = `
        <div class="product ${
          product.productId
        }" style="width: 100%; display: inline-block;">
        <img src="${product.imageUrl}">
        <div class="product-description">
          <p class="product-description-title">
            ${product.productName}
          </p>
          <div class="product-description-rating"></div>
          ${discount}
          <p class="product-description-price">
            por ${global.formatValue(product.price)}
          </p>
          ${installmentQuantity}
          <button class="product-description-buy" tabindex="0">
            Comprar
          </button>
        </div>
      </div>
      `;

      $(".best-sellers-carousel").append(productHtml);
    }

    global.slickProduct();

    global.hoverProduct();
  },
};

$(document).ready(function () {
  global.init();
});
