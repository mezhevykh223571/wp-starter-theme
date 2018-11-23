<?php
function global_scripts() {
  wp_enqueue_style('main-style', get_stylesheet_directory_uri() . '/assets/css/style.min.css', []);
  wp_enqueue_script('main-script', get_template_directory_uri() . '/assets/js/main.min.js', ['jquery']);
}

add_action('wp_enqueue_scripts', 'global_scripts');

function remove_head_scripts() {
  remove_action('wp_head', 'wp_print_scripts');
  remove_action('wp_head', 'wp_print_head_scripts', 9);
  remove_action('wp_head', 'wp_enqueue_scripts', 1);
  remove_action('wp_head', 'wp_print_styles', 99);
  remove_action('wp_head', 'wp_enqueue_style', 99);
  add_action('wp_footer', 'wp_print_scripts', 5);
  add_action('wp_footer', 'wp_enqueue_scripts', 5);
  add_action('wp_footer', 'wp_print_head_scripts', 5);
  add_action('wp_head', 'wp_print_styles', 30);
  add_action('wp_head', 'wp_enqueue_style', 30);
}

add_action('wp_enqueue_scripts', 'remove_head_scripts');

//show_admin_bar(FALSE);

function cc_mime_types($mimes) {
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}

add_filter('upload_mimes', 'cc_mime_types');

require_once(get_template_directory() . '/core/core.php');

require_once(get_template_directory() . '/inc/template-tags.php');