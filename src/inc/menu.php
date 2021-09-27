<?php

/**
 * メニューの有効化
 */
add_action('after_setup_theme', function () {
    register_nav_menus(
        array(
            'header'  => 'ヘッダーナビ',
        )
    );
});

/**
 * wp_nav_menuのliにclass追加
 * wp_nav_menuの引数にadd_li_classを追加してそのプロパティにクラス名を書く
 */
add_filter('nav_menu_css_class', function ($classes, $item, $args) {
    if (isset($args->add_li_class)) {
        $classes['class'] = $args->add_li_class;
    }
    return $classes;
}, 1, 3);

/**
 * wp_nav_menuのaにclass追加
 * wp_nav_menuの引数にadd_a_classを追加してそのプロパティにクラス名を書く
 */
add_filter('nav_menu_link_attributes', function ($classes, $item, $args) {
    if (isset($args->add_li_class)) {
        $classes['class'] = $args->add_a_class;
    }
    return $classes;
}, 1, 3);
