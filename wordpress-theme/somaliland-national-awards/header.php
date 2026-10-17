<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <div class="sl-flag-bar"></div>
    <header style="background: rgba(18, 24, 18, 0.95); border-bottom: 1px solid rgba(255,255,255,0.1); padding: 16px 32px; display: flex; justify-content: space-between; align-items: center;">
        <div class="site-branding" style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 24px;">🏆</span>
            <div>
                <a href="<?php echo home_url('/'); ?>" style="color: #1B5E20; text-decoration: none; font-weight: bold; font-size: 20px; text-transform: uppercase;">Somaliland National Awards</a>
                <div style="font-size: 11px; color: #CFA93F; letter-spacing: 1px;">M2 CREATIVE & CONSULTING PLATFORM</div>
            </div>
        </div>
        <nav style="display: flex; gap: 24px;">
            <?php
            wp_nav_menu(array(
                'theme_location' => 'primary-menu',
                'container'      => false,
                'menu_style'     => 'display:flex; gap:20px; list-style:none;',
                'fallback_cb'    => false,
            ));
            ?>
        </nav>
    </header>
