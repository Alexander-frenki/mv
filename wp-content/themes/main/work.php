<?php
/*
Template Name: Work page
*/
?>

<?php
$terms = get_terms([
	'taxonomy' => 'category',
	'hide_empty' => true,
]);

usort($terms, function($a, $b){
  return $b -> count - $a -> count;
});

$categories = array_map(function($cat) {
  return '<div class="gallery_categories_item" data-btn-category="'. $cat -> slug .'" data-btn-name="'. $cat -> name .'">
            <a href="#">'. $cat -> name .'</a>
          </div>';
}, $terms)

?>

<?php get_header(); ?>

<main>


<?php 
$wpb_all_query = new WP_Query(array('post_type'=>'post', 'post_status'=>'publish', 'posts_per_page'=>-1)); ?>
 
<?php if ( $wpb_all_query->have_posts() ) : ?>

  <div class="gallery">
      <div class="container">
        <aside class="gallery_categories scroll_animate">
          <?php echo implode($categories); ?>
        </aside>

        <div class="gallery_wrapper">

          <section class="gallery_category">
            <h2 class="gallery_category_title scroll_animate" data-title></h2>
            <?php
              $index=0;
            ?>
            <?php while ( $wpb_all_query->have_posts() ) : $wpb_all_query->the_post(); ?>

              <?php
                $tags = array_map(function($tag) {
                  return $tag -> name;
                }, get_the_tags());

                $isAvailableClass = in_array('available', $tags) ? 'available' : '';
                $isAvailableTitle = in_array('available', $tags) ? 'Available' : 'Not available';

                $categories = array_map(function($cat){
                  return $cat -> slug;
                }, get_the_category());
              ?>
              <div data-item-index=<?= $index; ?> class="gallery_category_item scroll_animate" data-item-categories="<?= implode($categories, '/'); ?>">
                <div class="gallery_category_item_img">
                  <img src=<?php the_post_thumbnail_url('large'); ?> alt="<?php the_title(); ?>" />
                </div>
                <div class="gallery_category_item_info">
                  <div class="gallery_category_item_params">
                    <?php the_content() ?>
                  </div>

                  <div class="gallery_category_item_description">
                    <div class="gallery_category_item_text">
                      <?php the_excerpt(); ?>
                    </div>
                    <?php if (in_array('available', $tags) or in_array('not-available', $tags)) {
                      echo '<div class="gallery_category_item_status '. $isAvailableClass .'">
                              <span>'. $isAvailableTitle .'</span>
                            </div>';
                    }; ?>

                  </div>
                </div>
              </div>

              <?php $index++; ?>
            <?php endwhile; ?>
          </section>
        </div>
      </div>

      <section class="gallery_slider">
        <?php while ( $wpb_all_query->have_posts() ) : $wpb_all_query->the_post(); ?>
        
        <?php
          $tags = array_map(function($tag) {
            return $tag -> name;
          }, get_the_tags());
          $isAvailableTitle = in_array('available', $tags) ? 'Available' : 'Not available';
        ?>

        <div class="gallery_slider_item_wrapper">
          <div class="gallery_slider_item">
            <div class="gallery_slider_item_img" data-zoom-img=<?php the_post_thumbnail_url(); ?>>
              <img src=<?php the_post_thumbnail_url(); ?> alt=<?php the_title(); ?> />
            </div>
            <div class="gallery_slider_item_info">
              <div>
                <?php the_content() ?>
                <?php the_excerpt(); ?>
              </div>
              <div class="gallery_slider_item_additional">
                <button class="slick-clone-btn clone-arrow-prev"><svg width='30' height='22' viewBox='0 0 30 22' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M9 21L1 11m0 0L9 1M1 11h28' stroke='#fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg></button>

                <?php if (in_array('available', $tags) or in_array('not-available', $tags)) {
                  echo '<span class="gallery_slider_item_status">'. $isAvailableTitle .'</span>';
                }; ?>

                <button class="slick-clone-btn clone-arrow-next"><svg width="30" height="22" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 1l8 10m0 0l-8 10m8-10H1" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
              </div>
            </div>

            <div class="gallery_slider_item_contact">
              <a href="/contacts">Contact me</a>
            </div>
          </div>
        </div>
        <?php endwhile; ?>
      </section>
      <button class="gallery_slider_close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.9 2.1L2.1 21.9M21.9 21.9L2.1 2.1" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>
 

 
<?php wp_reset_postdata(); ?>
 
<?php else : ?>
    <p><?php _e( 'Sorry, no posts matched your criteria.' ); ?></p>
<?php endif; ?>





</main>

<?php get_footer(); ?>