// Thêm giỏ hàng ở phần product-details
function addCart(id) {
    num = $("#num").val();
    $.post('addCart.php', {
        'id': id,
        'num': num
    }, function (data) {
        $("#numberCart").text(data);
        window.location.href = "cart.php";
    });
}

// Thêm giỏ hàng ở phần product
function addToCart(id) {
    $.post('action.php', {
        'id': id
    }, function (data) {
        item = data.split["-"];
        $("#numberCart").text(item[0]);

    });
    setTimeout(function () {
        location.reload(true);
    }, 1000)

}

// Tăng số lượng + update thành tiền
function updateCart(id) {
    num = $("#quantity_" + id).val();
    $.post('updateCart.php', {
        'id': id,
        'num': num
    }, function (data) {});
    location.reload(true);
}

// xóa giỏ hàng
function deleteCart(id) {
    $.post('updateCart.php', {
        'id': id,
        'num': 0
    }, function (data) {
        $("#listCart").load("http://localhost:8081/Kangaroo/cart.php #Cart");
    });
    location.reload(true);
}

$(document).ready(function () {

    //pass the images to Fancybox
    $("#zoom_03").elevateZoom({
        constrainType: "height",
        zoomType: "lens",
        containLensZoom: true,
        gallery: 'gallery_01',
        cursor: 'pointer',
        galleryActiveClass: "active"
    });

    $("#zoom_03").on("click", function (e) {
        var ez = $('#zoom_03').data('elevateZoom');
        $.fancybox(ez.getGalleryList());
        return false;
    });


    // meanmenu
    jQuery('.mobile').meanmenu();

    // sticky
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('#header-mid').addClass("sticky");
        } else {
            $('#header-mid').removeClass("sticky");
        }
    });

    //ScrollUp
    $.scrollUp({
        scrollText: '<i class="fas fa-chevron-up"></i>',
        easingType: 'linear',
        scrollSpeed: 600,
        animation: 'fade'
    });

    // Carousel
    $('.slider-images-wrapper').owlCarousel({
        loop: true,
        autoplay: true,
        margin: 2,
        responsive: {
            0: {
                items: 2
            },
            480: {
                items: 4
            },
            768: {
                items: 6
            },
            992: {
                items: 6
            },
            1200: {
                items: 8
            }
        }
    });
    $('.thumnail-item').owlCarousel({
        loop: true,
        autoplay: true,
        margin: 0,
        navText: ['<i class="fas fa-long-arrow-alt-left"></i>',
            '<i class="fas fa-long-arrow-alt-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 2
            },

        }
    });

    // Tooltip
    $(function () {
        $('[data-hieuung="tooltip"]').tooltip();
    });

    //Scroll Menu
    $(window).scroll(function () {
        var height = $(window).scrollTop();
        if (height >= 500) {
            $('.scroll-menu, .scroll-qc').addClass("visible");
        } else {
            $('.scroll-menu, .scroll-qc').removeClass("visible");
        }
    });


    // Tăng giảm số lượng thẻ input
    jQuery('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter('.quantity input');
    jQuery('.quantity').each(function () {
        var spinner = jQuery(this),
            input = spinner.find('input[type="number"]'),
            btnUp = spinner.find('.quantity-up'),
            btnDown = spinner.find('.quantity-down'),
            min = input.attr('min'),
            max = input.attr('max');

        btnUp.click(function () {
            var oldValue = parseFloat(input.val());
            if (oldValue >= max) {
                var newVal = oldValue;

            } else {
                var newVal = oldValue + 1;

            }

            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });

        btnDown.click(function () {
            var oldValue = parseFloat(input.val());
            if (oldValue <= min) {
                var newVal = oldValue;

            } else {
                var newVal = oldValue - 1;

            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });

    });

    // Hiệu ứng bay
    $(document).on('click', '.btn-buy', function (e) {
        e.preventDefault();
        var parent = $(this).parents('.product-single');
        var cart = $(document).find('#cart-shop');
        var src = parent.find('img').attr('src');
        var parTop = parent.offset().top;
        var parLeft = parent.offset().left;
        $('<img />', {
            class: 'img-product-fly',
            src: src
        }).appendTo('body').css({
            'top': parTop,
            'left': parseInt(parLeft) + parseInt(parent.width()) - 50
        });

        setTimeout(function () {
            $(document).find('.img-product-fly').css({
                'top': cart.offset().top,
                'left': cart.offset().left
            });
            setTimeout(function () {
                $(document).find('.img-product-fly').remove();
                var countItem = parseInt(cart.find('#cart-number').data('count')) + 1;
                cart.find('#cart-number').text(countItem).data('count', countItem);
            }, 1000);

        }, 500);
    });

});