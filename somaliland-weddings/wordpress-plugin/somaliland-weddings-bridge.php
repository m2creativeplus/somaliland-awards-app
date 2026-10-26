<?php
/**
 * Plugin Name: Somaliland Weddings & Events Bridge
 * Plugin URI:  https://m2creative.sl/weddings
 * Description: Embeds the Somaliland Weddings & Events verified directory, package comparison, and booking requests into any WordPress site.
 * Version:     1.0.0
 * Author:      M2 Creative & Consulting
 * Author URI:  https://m2creative.sl
 * License:     GPL-2.0+
 * Text Domain: somaliland-weddings
 */

defined('ABSPATH') or die('Direct access forbidden.');

class SomalilandWeddingsBridge {
    public function __construct() {
        add_shortcode('somaliland_weddings', [$this, 'render_marketplace']);
        add_action('wp_enqueue_scripts', [$this, 'enqueue_assets']);
    }

    public function enqueue_assets() {
        wp_register_style(
            'slw-bridge-css',
            plugins_url('assets/bridge.css', __FILE__),
            [],
            '1.0.0'
        );
    }

    public function render_marketplace($atts) {
        $atts = shortcode_atts([
            'category' => 'all',
            'city'     => 'Hargeisa',
            'limit'    => 6,
        ], $atts, 'somaliland_weddings');

        wp_enqueue_style('slw-bridge-css');

        ob_start();
        ?>
        <div class="slw-wp-bridge-container" style="font-family: inherit; margin: 2rem 0;">
            <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 12px 16px; margin-bottom: 20px; font-size: 13px; color: #065f46; display: flex; align-items: center; justify-content: space-between;">
                <span><strong>Somaliland Weddings & Events</strong> · Powered by M2 Creative</span>
                <span style="font-size: 11px; background: #059669; color: #fff; padding: 2px 8px; border-radius: 9999px;">✓ Verified Hargeisa Vendors</span>
            </div>
            <iframe 
                src="<?php echo esc_url(get_option('slw_app_url', 'http://localhost:3000/providers')); ?>" 
                style="width: 100%; min-height: 800px; border: 1px solid #e2e8f0; border-radius: 12px;"
                title="Somaliland Weddings Marketplace"
            ></iframe>
        </div>
        <?php
        return ob_get_clean();
    }
}

new SomalilandWeddingsBridge();
