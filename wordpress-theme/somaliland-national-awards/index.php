<?php
get_header();
?>

<main style="max-width: 1200px; margin: 40px auto; padding: 0 24px;">
    <section class="glass-card" style="text-align: center; padding: 60px 24px; margin-bottom: 40px;">
        <h1 class="gradient-text" style="font-size: 42px; margin-bottom: 16px;">CELEBRATING SOMALILAND'S FINEST</h1>
        <p style="font-size: 18px; max-width: 700px; margin: 0 auto 32px; color: #D0D7D0;">
            Honoring leaders, innovators, artists, and public servants building the future of the Republic of Somaliland.
        </p>
        <div style="display: flex; gap: 16px; justify-content: center;">
            <a href="#categories" style="background: #1B5E20; color: #FFFFFF; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold;">Browse Categories</a>
            <a href="#submit" style="border: 1px solid #CFA93F; color: #CFA93F; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold;">Submit Nomination</a>
        </div>
    </section>

    <section id="categories">
        <h2 style="font-size: 28px; color: #CFA93F; margin-bottom: 24px;">Award Categories</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
            <?php
            $categories_query = new WP_Query(array(
                'post_type'      => 'somaliland_award',
                'posts_per_page' => 12,
            ));
            
            if ($categories_query->have_posts()) :
                while ($categories_query->have_posts()) : $categories_query->the_post();
            ?>
                    <article class="glass-card">
                        <div style="font-size: 32px; margin-bottom: 12px;">🏆</div>
                        <h3 style="margin: 0 0 8px 0; font-size: 20px; color: #FFFFFF;"><?php the_title(); ?></h3>
                        <p style="font-size: 14px; color: #A0ABA0; line-height: 1.5;"><?php echo get_the_excerpt(); ?></p>
                        <a href="<?php the_permalink(); ?>" style="color: #CFA93F; text-decoration: none; font-weight: bold; font-size: 14px;">View Nominees &rarr;</a>
                    </article>
            <?php
                endwhile;
                wp_reset_postdata();
            else :
            ?>
                <!-- Fallback Default Categories -->
                <article class="glass-card">
                    <div style="font-size: 32px; margin-bottom: 12px;">🤝</div>
                    <h3 style="margin: 0 0 8px 0; color: #FFFFFF;">Leadership & Community</h3>
                    <p style="font-size: 14px; color: #A0ABA0;">Honoring community organizers, youth leaders, and public servants.</p>
                </article>
                <article class="glass-card">
                    <div style="font-size: 32px; margin-bottom: 12px;">💡</div>
                    <h3 style="margin: 0 0 8px 0; color: #FFFFFF;">Business & Innovation</h3>
                    <p style="font-size: 14px; color: #A0ABA0;">Recognizing tech startups, local enterprises, and economic pioneers.</p>
                </article>
                <article class="glass-card">
                    <div style="font-size: 32px; margin-bottom: 12px;">🎙️</div>
                    <h3 style="margin: 0 0 8px 0; color: #FFFFFF;">Arts & Culture</h3>
                    <p style="font-size: 14px; color: #A0ABA0;">Celebrating Somali poetry, visual arts, music, and cultural preservation.</p>
                </article>
            <?php endif; ?>
        </div>
    </section>
</main>

<?php
get_footer();
?>
