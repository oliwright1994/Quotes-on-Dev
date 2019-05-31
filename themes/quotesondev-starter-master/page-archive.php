<?php
/**
 * The template for displaying all pages.
 *
 * @package QOD_Starter_Theme
 */

get_header(); ?>

<div id="primary" class="content-area">
	<main id="main" class="site-main" role="main">

		<?php while (have_posts()) : the_post(); ?>

			<?php get_template_part('template-parts/content', 'page'); ?>
			<h2> Quote Authors </h2>
			<ul class="quotes-authors custom-archive-list">
				<?php
				$args = array(
					'posts_per_page'   => -1,
					'post_type'        => 'post',
				);

				$the_query = new WP_Query($args);

				while ($the_query->have_posts()) : $the_query->the_post();
					echo '<a rel="' . get_permalink() . '" href="' . get_permalink() . ' ">';
					the_title();
					echo '</a>';
				endwhile;

				wp_reset_postdata();

				?>
			</ul>
			<h2>Categories</h2>
			<ul class="categories-list custom-archive-list">
				<?php $cat_args = array(
					'title_li' => '',
				); ?>
				<?php wp_list_categories($cat_args); ?>
			</ul>
			<h2>Tags</h2>
			<ul class="tags-list custom-archive-list">
				<?php
				$tags = get_tags();
				if ($tags) :
					foreach ($tags as $tag) : ?>
						<li><a href="<?php echo esc_url(get_tag_link($tag->term_id)); ?>" title="<?php echo esc_attr($tag->name); ?>"><?php echo esc_html($tag->name); ?></a></li>
					<?php endforeach; ?>
				<?php endif; ?>
			</ul>

		<?php endwhile;
	?>

	</main><!-- #main -->
</div><!-- #primary -->

<?php get_footer(); ?>
