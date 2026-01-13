<?php
if (!defined('ABSPATH')) exit;

add_action('wp_enqueue_scripts', function () {
    if (!function_exists('is_product') || !is_product()) return;

    $bundle_path = get_stylesheet_directory() . '/dist/bundle.js';
    if (!file_exists($bundle_path)) return;

    wp_enqueue_script(
        'doitarts-react',
        get_stylesheet_directory_uri() . '/dist/bundle.js',
        [],
        filemtime($bundle_path),
        true
    );
});

add_action('woocommerce_after_add_to_cart_button', function () {
    echo '<div id="doitarts-react-root" style="margin-top:16px;"></div>';
}, 25);

add_filter('woocommerce_add_cart_item_data', function ($cart_item_data, $product_id) {
    foreach (['doitarts_tipo','doitarts_tam','doitarts_texto','doitarts_total_aprox'] as $k) {
        if (isset($_POST[$k]) && $_POST[$k] !== '') {
            $cart_item_data[$k] = sanitize_text_field(wp_unslash($_POST[$k]));
        }
    }
    return $cart_item_data;
}, 10, 2);

add_filter('woocommerce_get_item_data', function ($item_data, $cart_item) {
    $labels = [
        'doitarts_tipo' => 'Producto',
        'doitarts_tam' => 'Tamaño',
        'doitarts_texto' => 'Texto',
        'doitarts_total_aprox' => 'Total aprox',
    ];
    foreach ($labels as $k => $label) {
        if (!empty($cart_item[$k])) {
            $item_data[] = ['key' => $label, 'value' => $cart_item[$k]];
        }
    }
    return $item_data;
}, 10, 2);

add_action('woocommerce_checkout_create_order_line_item', function ($item, $cart_item_key, $values) {
    $map = [
        'doitarts_tipo' => 'Tipo',
        'doitarts_tam' => 'Tamaño',
        'doitarts_texto' => 'Texto',
        'doitarts_total_aprox' => 'Total aprox',
    ];
    foreach ($map as $k => $label) {
        if (!empty($values[$k])) {
            $item->add_meta_data($label, $values[$k], true);
        }
    }
}, 10, 3);

add_action('woocommerce_before_calculate_totals', function ($cart) {
    if (is_admin() && !defined('DOING_AJAX')) return;

    foreach ($cart->get_cart() as $cart_item) {
        if (empty($cart_item['doitarts_total_aprox'])) continue;

        $total = (float) $cart_item['doitarts_total_aprox'];
        $qty = max(1, (int) ($cart_item['quantity'] ?? 1));
        $unit = $total / $qty;

        if ($unit > 0) {
            $cart_item['data']->set_price($unit);
        }
    }
}, 10, 1);

add_action('wp_loaded', function () {
    if (function_exists('WC') && WC()->cart) {
        WC()->cart->calculate_totals();
    }
});

add_filter('woocommerce_add_cart_item_data', function ($cart_item_data, $product_id) {
    foreach (['doitarts_tipo','doitarts_tam','doitarts_texto','doitarts_total_aprox'] as $k) {
        if (isset($_POST[$k]) && $_POST[$k] !== '') {
            $cart_item_data[$k] = sanitize_text_field(wp_unslash($_POST[$k]));
        }
    }
    $cart_item_data['doitarts_unique'] = md5(microtime(true) . rand());
    return $cart_item_data;
}, 10, 2);

add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style(
        'doitarts-header',
        get_stylesheet_directory_uri() . '/assets/css/header.css',
        [],
        filemtime(get_stylesheet_directory() . '/assets/css/header.css')
    );
});
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style(
        'doitarts-child-style',
        get_stylesheet_uri(),
        [],
        filemtime(get_stylesheet_directory() . '/style.css')
    );
}, 20);
add_action('wp_head', function () { echo '<style>body{background:#fff7fb!important}</style>'; }, 999);

add_action('wp_enqueue_scripts', function () {
    $css = get_stylesheet_directory() . '/style.css';
    if (!file_exists($css)) return;

    // Carga el CSS del tema hijo DESPUÉS del CSS de Astra
    wp_enqueue_style(
        'doitarts-child-style',
        get_stylesheet_uri(),
        ['astra-theme-css'],
        filemtime($css)
    );
}, 999);
