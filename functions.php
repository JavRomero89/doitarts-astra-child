<?php
if (!defined('ABSPATH')) exit;

add_action('wp_enqueue_scripts', function () {
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

add_shortcode('doitarts_react', function () {
    return '<div id="doitarts-react-root"></div>';
});
