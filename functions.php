<?php
if (!defined('ABSPATH')) exit;

add_action('wp_enqueue_scripts', function () {
    if (!is_product()) return;

    $bundle_path = get_stylesheet_directory() . '/dist/bundle.js';
    if (!file_exists($bundle_path)) return;

    wp_enqueue_script(
        'doitarts-react',
        get_stylesheet_directory_uri() . '/dist/bundle.js',
        [],
        filemtime($bundle_path),
        true
    );

    // Datos mínimos para el customizer
    $product_id = get_queried_object_id();

    wp_localize_script('doitarts-react', 'DOITARTS', [
        'productId' => $product_id,
        'currencySymbol' => function_exists('get_woocommerce_currency_symbol') ? get_woocommerce_currency_symbol() : '€',
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('doitarts_nonce'),
        // CTA WhatsApp (editable)
        'whatsAppPhone' => '34XXXXXXXXX', // <-- pon tu número con prefijo país, sin "+"
    ]);
});


