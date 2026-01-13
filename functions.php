<?php
if (!defined('ABSPATH')) exit;

add_action('wp_enqueue_scripts', function () {
    $bundle = get_stylesheet_directory() . '/dist/bundle.js';
    if (!file_exists($bundle)) return;

    wp_enqueue_script(
        'doitarts-react',
        get_stylesheet_directory_uri() . '/dist/bundle.js',
        [],
        filemtime($bundle),
        true
    );
});

