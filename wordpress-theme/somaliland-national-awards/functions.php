<?php
/**
 * Somaliland National Awards Theme Functions
 * Engine: M2 Creative & Consulting WordPress Suite v1.0
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

function somaliland_awards_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('align-wide');
    add_theme_support('editor-styles');
    
    register_nav_menus(array(
        'primary-menu' => __('Primary Header Menu', 'somaliland-awards'),
        'footer-menu'  => __('Footer Menu', 'somaliland-awards'),
    ));
}
add_action('after_setup_theme', 'somaliland_awards_theme_setup');

function somaliland_awards_enqueue_scripts() {
    wp_enqueue_style('somaliland-awards-style', get_stylesheet_uri(), array(), '1.0.0');
}
add_action('wp_enqueue_scripts', 'somaliland_awards_enqueue_scripts');

/**
 * Register Custom Post Types: Awards & Nominees
 */
function somaliland_awards_register_cpts() {
    // Awards CPT
    register_post_type('somaliland_award', array(
        'labels' => array(
            'name'          => __('Awards', 'somaliland-awards'),
            'singular_name' => __('Award Category', 'somaliland-awards'),
        ),
        'public'      => true,
        'has_archive' => true,
        'supports'    => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
        'menu_icon'   => 'dashicons-awards',
        'show_in_rest' => true,
    ));

    // Nominees CPT
    register_post_type('somaliland_nominee', array(
        'labels' => array(
            'name'          => __('Nominees', 'somaliland-awards'),
            'singular_name' => __('Nominee', 'somaliland-awards'),
        ),
        'public'      => true,
        'has_archive' => true,
        'supports'    => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
        'menu_icon'   => 'dashicons-groups',
        'show_in_rest' => true,
    ));
}
add_action('init', 'somaliland_awards_register_cpts');

/**
 * Custom REST API Endpoint for Public Voting & Submissions
 */
add_action('rest_api_init', function () {
    register_rest_route('somaliland-awards/v1', '/vote', array(
        'methods'  => 'POST',
        'callback' => 'somaliland_awards_handle_vote',
        'permission_callback' => '__return_true',
    ));
});

function somaliland_awards_handle_vote($request) {
    $params = $request->get_json_params();
    $nominee_id = isset($params['nominee_id']) ? intval($params['nominee_id']) : 0;
    
    if (!$nominee_id) {
        return new WP_Error('invalid_nominee', 'Invalid nominee ID', array('status' => 400));
    }
    
    $current_votes = (int) get_post_meta($nominee_id, '_vote_count', true);
    update_post_meta($nominee_id, '_vote_count', $current_votes + 1);
    
    return array(
        'success' => true,
        'new_vote_count' => $current_votes + 1,
        'message' => 'Vote recorded successfully.',
    );
}
