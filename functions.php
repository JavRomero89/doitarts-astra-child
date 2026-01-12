<?php
if (!defined('ABSPATH')) exit;

add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style(
        'doitarts-astra-child',
        get_stylesheet_uri(),
        ['astra-theme-css'],
        wp_get_theme()->get('Version')
    );
}, 20);
