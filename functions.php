<?php
if (!defined('ABSPATH')) exit;

add_action('wp_enqueue_scripts', function () {
    $bundle_path = get_stylesheet_directory() . '/assets/dist/bundle.js';
    if (!file_exists($bundle_path)) return;

    wp_enqueue_script(
        'doitarts-react-bundle',
        get_stylesheet_directory_uri() . '/assets/dist/bundle.js',
        [],
        filemtime($bundle_path),
        true
    );
}, 30);
