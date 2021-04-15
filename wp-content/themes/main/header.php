<?php
$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

function generate_sub_link($main_url, $sub_url) {
  $category = get_link_category($sub_url);
  return $main_url . '?category=' . $category;
};

function get_link_category($url) {
  $url_chunks = array_filter(explode('/', $url), function($item) {
    return !empty($item);
  });
  $category = array_pop($url_chunks);
  return $category;
}

global $wp;
$current_url = home_url(add_query_arg(array(), $wp->request));
$current_page_slug = array_pop(explode('/', $current_url));
$isWorkPage = $current_page_slug == 'work';
?>

<!DOCTYPE html>
<html lang="en">

<head <?php language_attributes(); ?>>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
  <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
  <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
  <?php wp_head(); ?>
</head>

<body>

  <header class="header">
    <div class="container">
      <div class="header_burger"><span></span></div>
      <?php
        $header_menu_name = 'header';
        $locations = get_nav_menu_locations();
        $menu_items = wp_get_nav_menu_items($locations[$header_menu_name]);

        $map_items = array_reduce($menu_items, function($acc, $item) {
          $item_id = $item -> db_id;
          $parent_id = $item -> menu_item_parent;

          if ($parent_id == 0) {
            $acc[$item_id] = [
              'url' => $item -> url,
              'title' => $item -> title,
              'submenu' => []
            ];
          } else {
            $acc[$parent_id]['submenu'][] = array_push($acc[$parent_id]['submenu'], $item -> to_array());
          }
          return $acc;
        }, []);

      ?>

      <nav class="header_nav">
        <ul class="header_nav_first">
          <?php foreach ($map_items as $item) {
            echo '<li> <a href='. $item['url'] .'>'. $item['title'] .'</a>'; ?>

            <?php if (count($item['submenu']) > 0) { echo '<ul class="header_nav_second">'; ?>

            <?php foreach ($item['submenu'] as $sub_item) {
              $category = get_link_category($sub_item['url']);
              $sub_url = generate_sub_link($item['url'], $sub_item['url']);
                if (is_array($sub_item)) {
                  if ($isWorkPage) {
                    echo '<li data-link-category="'. $category .'">
                      <a href='. $sub_url .'>'. $sub_item['title'] .'</a>
                    </li>';
                  } else {
                    echo'<li>
                      <a href='. $sub_url .'>'. $sub_item['title'] .'</a>
                    </li>';
                  };
                }
              };?>

            <?= '</ul>
              <button class="sub_menu_btn">
                <svg width="16" height="11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M8 .858L.222 8.636l1.414 1.414L8 3.686l6.364 6.364 1.414-1.414L8 .858z" fill="#fff" />
                </svg>
              </button>'; }; ?>
            <?= '</li>'; ?>
          <?php }; ?>
        </ul>
      </nav>
      <h1 class="header_logo">
        <a href="<?php bloginfo('url'); ?>"><?php bloginfo('name'); ?></a>
      </h1>
      <div class="header_social">
        <?php 
          $instagram_menu_name = 'instagram';
          $inst_menu_items = wp_get_nav_menu_items($locations[$instagram_menu_name]);
          $inst_url = array_shift($inst_menu_items) -> url;
        ?>

        <a href="<?= $inst_url; ?>" target="_blank">
          <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.05 12c0-2.25-1.8-4.05-4.05-4.05S7.95 9.75 7.95 12s1.8 4.05 4.05 4.05 4.05-1.8 4.05-4.05zm2.1 0c0 3.45-2.7 6.15-6.15 6.15S5.85 15.45 5.85 12 8.55 5.85 12 5.85s6.15 2.7 6.15 6.15zm1.65-6.45c0 .9-.6 1.5-1.5 1.5s-1.5-.6-1.5-1.5.6-1.5 1.5-1.5 1.5.75 1.5 1.5zM12 2.1c-1.8 0-5.55-.15-7.05.45C3.9 3 3 3.9 2.7 4.95c-.6 1.5-.45 5.25-.45 7.05 0 1.8-.15 5.55.45 7.05C3 20.1 3.9 21 4.95 21.3c1.5.6 5.4.45 7.05.45 1.65 0 5.55.15 7.05-.45 1.05-.45 1.8-1.2 2.25-2.25.6-1.65.45-5.4.45-7.05 0-1.65.15-5.55-.45-7.05C21 3.9 20.1 3 19.05 2.7c-1.5-.75-5.25-.6-7.05-.6zM24 12v4.95c0 1.8-.6 3.6-1.95 5.1C20.7 23.4 18.9 24 16.95 24h-9.9c-1.8 0-3.6-.6-5.1-1.95A7.691 7.691 0 010 16.95v-9.9C0 5.1.75 3.3 1.95 1.95 3.45.75 5.25 0 7.05 0h9.9c1.8 0 3.6.6 5.1 1.95A7.691 7.691 0 0124 7.05V12z"
              fill="#432D2F" />
          </svg></a>
      </div>
    </div>
  </header>