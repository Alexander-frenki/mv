<?php
/*
Template Name: Home page
*/
?>

<?php get_header(); ?>

<?php
$terms = get_terms([
	'taxonomy' => 'category',
	'hide_empty' => false,
]);

usort($terms, function($a, $b){
  return $b -> count - $a -> count;
});

$posts = get_posts(array(
	'numberposts' => 15,
  'tag' => 'use-in-home-page',
));

?>

<section class="categories scroll_animate">
  <div class="container">
    <div class="categories_wrapper">
    
    <?php foreach ($terms as $cat) {
      $is_available = $cat -> count > 0 ? '' : 'not_available';
      $url = $actual_link . '/work/?category=' . $cat -> slug;
      echo '<div data-itm-category="'. $cat -> slug .'" class="categories_item '. $is_available .'">
              <a href="'. $url .'">
                <h3>'. $cat -> name .'</h3>
              </a>
            </div>';
      };?>

      <div class="categories_hover_img">
        <?php foreach ($posts as $post) {
          $categories = array_map(function($cat){
            return $cat -> slug;
          }, get_the_category());
          $cat = array_shift($categories);
          echo '<img data-img-category="'. $cat .'" src="'. get_the_post_thumbnail_url($post -> ID, 'medium') .'" alt= />';
        }; ?>
      </div>



    </div>
  </div>
</section>

<?php get_footer(); ?>