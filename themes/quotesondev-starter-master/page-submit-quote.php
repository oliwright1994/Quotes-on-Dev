<?php
/**
 * The template for displaying all pages.
 *
 * @package QOD_Starter_Theme
 */

get_header(); ?>


<?php get_site_url(); ?>





<div id="primary" class="content-area">
	<main id="main" class="site-main" role="main">

		<?php while (have_posts()) : the_post(); ?>

			<?php get_template_part('template-parts/content', 'page'); ?>

			<form action="<?php echo esc_url_raw(rest_url()) . 'wp/v2/posts/' ?>" method="POST" id="submit-quote-form">

				<fieldset>
					<label for="author">Author of Quote</label>
					<input type="text" id="author" name="author">
					<label for="quote">Quote</label>
					<textarea id="quote" name="quote" rows="4"></textarea>
					<label for="quote_source">Where did you find this quote? (e.g. book name) </label>
					<input type="text" id="quote_source" name="quote_source">
					<label for="quote_url">Provide the URL of the quote source, if available.</label>
					<input type="text" id="quote_url" name="quote_url">
					<input type="submit" value="Submit Quote" class='submit-button'>
				</fieldset>
			</form>

			<a href="<?php echo get_permalink() ?>" id="submit-another-quote-button" style="display: none"> Submit another quote.</a>

		<?php endwhile;
	?>

	</main><!-- #main -->
</div><!-- #primary -->

<?php get_footer(); ?>
