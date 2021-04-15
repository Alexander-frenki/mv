<?php get_header(); ?>

<?php $slug = get_post_field( 'post_name', get_post() ); ?>

<main>
  <?php dynamic_sidebar($slug . '_widget'); ?>
</main>


<?php get_footer(); ?>