<?php

/**
* css読み込み
*/
add_action('wp_enqueue_scripts', function () {
    if (! is_admin()) {
        wp_deregister_style('wp-block-library');
        wp_enqueue_style('style', get_template_directory_uri() . '/style.css', array(), wp_get_theme()->get('Version'));
    }
});

/**
* js読み込み
*/
add_action('wp_enqueue_scripts', function () {
    if (! is_admin()) {
        wp_enqueue_script('common-script', get_template_directory_uri() . '/assets/js/main.js', array(), wp_get_theme()->get('Version'), true);
    }
});
