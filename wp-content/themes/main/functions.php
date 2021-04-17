<?php

add_action('wp_enqueue_scripts', 'main_scripts');
add_action( 'after_setup_theme', 'theme_register_nav_menu' );
add_action( 'after_setup_theme', 'theme_register_social_menu' );
add_action( 'widgets_init', 'mytheme_widgets_init' );
add_action( 'admin_enqueue_scripts', function() {
  wp_enqueue_script('main-scripts',
  get_template_directory_uri() . '/scripts/admin.js', [], '', true);
});
add_theme_support('post-thumbnails', ['post']);

function theme_register_nav_menu() {
	register_nav_menu( 'header', 'Header Menu' );
}

function theme_register_social_menu() {
	register_nav_menu( 'instagram', 'Instagram menu' );
}

function main_scripts() {
  wp_enqueue_style('main-style',
  get_template_directory_uri() . '/prod/index.css');

  wp_enqueue_script('main-scripts',
  get_template_directory_uri() . '/prod/index.js', [], '1', true);
}


function mytheme_widgets_init() {
  register_sidebar(array(
      'name'          => __('About Widgets', 'textdomain'),
      'id'            => 'about_widget',
      'description'   => __( '' ),
  ));
  register_sidebar(array(
    'name'          => __('Contacts Widgets', 'textdomain'),
    'id'            => 'contacts_widget',
    'description'   => __( '' ),
    'before_widget' => '',
    'after_widget'  => '',
    'before_title'  => '',
    'after_title'   => '',
  ));
};


class About_Page_Widget extends WP_Widget {
	function __construct() {
		parent::__construct(
			'about_page_widget', // Base ID
			esc_html__( 'About Page', 'text_domain' ), // Name
			array( 'description' => esc_html__( 'About Page Widget', 'text_domain' ), ) // Args
		);
	}

	public function widget( $args, $instance ) {
    global $post;
    $page_content = apply_filters('the_content', $post->post_content);

    $terms = get_terms([
      'taxonomy' => 'category',
      'hide_empty' => true,
    ]);
    
    usort($terms, function($a, $b){
      return intval($b -> description) - intval($a -> description);
    });

		echo '<section class="about">
    <div class="about_video">
      <h2 class="about_video_headline scroll_animate">'. $instance['title'] .'</h2>
      <div class="about_video_wrapper">
        <video muted autoplay src="'. $instance['video_uri'] .'"></video>
      </div>
    </div>

    <div class="container">
      <div class="about_info scroll_animate">
        '. $page_content .'
      </div>

      <div class="about_statistics scroll_animate">' ?>
      <?php foreach ($terms as $cat) {
          echo '<div class="about_statistics_item">
            <p class="about_statistics_item_quantity">'. $cat -> description .'</p>
            <p class="about_statistics_item_category">'. $cat -> name .'</p>
          </div>';
        };
      ?>

      <?= '</div>
      <div class="about_link scroll_animate">
        <a href="/contacts">Contact me</a>
      </div>
    </div>
    
  </section>';
	}

	public function form($instance) {
		$title = !empty($instance['title']) ? $instance['title'] : '';
    $video_uri = !empty($instance['video_uri']) ? $instance['video_uri'] : '';

		?>
		<p>
		  <label for="<?= $this -> get_field_id('title'); ?>">Title</label> 
		  <input class="widefat" id="<?= $this -> id ?>" name="<?= $this -> get_field_name('title'); ?>" type="text" value="<?= $instance['title'] ?? ''; ?>">
		</p>
    <p>
      <label for="<?= $this -> get_field_id('video_uri'); ?>">Video</label>
      <input type="text" class="widefat <?= $this -> id ?>_url" name="<?= $this -> get_field_name( 'video_uri' ); ?>" value="<?= $instance['video_uri'] ?? ''; ?>" style="margin-top:5px;" />
      <input type="button" id="<?= $this -> id ?>" class="button button-primary js_custom_upload_media" value="Upload Video" style="margin-top:5px;" />
    </p>
		<?php 
	}

	public function update( $new_instance, $old_instance ) {
		$instance = array();
    $instance['title'] = strip_tags( $new_instance['title'] );
    $instance['video_uri'] = strip_tags( $new_instance['video_uri'] );

		return $instance;
	}
};


class Contacts_Page_Widget extends WP_Widget {
	function __construct() {
		parent::__construct(
			'contacts_page_widget', // Base ID
			esc_html__( 'Contacts Page', 'text_domain' ), // Name
			array( 'description' => esc_html__( 'Contacts Page Widget', 'text_domain' ), ) // Args
		);
	}

	public function widget( $args, $instance ) {
    $instagram_menu_name = 'instagram';
    $locations = get_nav_menu_locations();
    $inst_menu_items = wp_get_nav_menu_items($locations[$instagram_menu_name]);
    $inst_url = array_shift($inst_menu_items) -> url;

		echo '<section class="contacts">
      <div class="container">
        <h2 class="contacts_headline scroll_animate">'. $instance['title'] .'</h2>
        <div class="contacts_wrapper">
          <div class="contacts_info">
            <div class="contacts_info_item scroll_animate">
              <h4>'. $instance['reason_title'] .'</h4>
              <p>'. $instance['reason_body'] .'</p>
            </div>
            <div class="contacts_info_item scroll_animate">
              <h4>'. $instance['schedule_title'] .'</h4>
              <p>
                <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M6 4H4V3H2v3h16V3h-2v1h-2V3H6v1zm12 4H2v10h16V8zm-4-7H6V0H4v1H2a2 2 0 00-2 2v15a2 2 0 002 2h16a2 2 0 002-2V3a2 2 0 00-2-2h-2V0h-2v1zM5 12v-2h2v2H5zm4 0h2v-2H9v2zm4 0v-2h2v2h-2zm-8 2v2h2v-2H5zm6 2H9v-2h2v2z"
                    fill="#432D2F" />
                </svg>
                <span>'. $instance['schedule_days'] .'</span>
                <svg width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M11 22C4.925 22 0 17.075 0 11S4.925 0 11 0s11 4.925 11 11-4.925 11-11 11zm0-2a9 9 0 100-18 9 9 0 000 18zm5-10h-4V5h-2v7h6v-2z"
                    fill="#432D2F" />
                </svg>
                <span>'. $instance['schedule_time'] .'</span>
              </p>
            </div>
            <div class="contacts_info_item scroll_animate">
              <h4>'. $instance['location_title'] .'</h4>
              <p>
                <svg width="18" height="23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M9 22.328l.658-.575C15.188 16.923 18 12.707 18 9c0-5.25-4.097-9-9-9S0 3.75 0 9c0 3.707 2.811 7.924 8.342 12.753l.658.575zm0-2.665C4.307 15.433 2 11.85 2 9c0-4.103 3.164-7 7-7s7 2.897 7 7c0 2.85-2.307 6.434-7 10.663zM9 4a5 5 0 110 10A5 5 0 019 4zM6 9a3 3 0 116 0 3 3 0 01-6 0z"
                    fill="#432D2F" />
                </svg>
                <span>'. $instance['location_body'] .'</span>
              </p>
            </div>

            <a href="'. $inst_url .'" class="contacts_info_social scroll_animate">
              Follow me on 
              <svg width="165" height="38" viewBox="0 0 165 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39.716.185c-2.682 1.13-5.631 4.325-6.562 8.336-1.18 5.081 3.729 7.23 4.131 6.525.474-.828-.88-1.107-1.158-3.744-.36-3.405 1.212-7.21 3.19-8.88.367-.31.35.122.35.92 0 1.429-.078 14.247-.078 16.923 0 3.62-.149 4.763-.415 5.892-.27 1.145-.705 1.918-.376 2.216.368.333 1.938-.46 2.846-1.737 1.09-1.532 1.472-3.372 1.54-5.37.083-2.41.08-6.231.083-8.412.003-2 .033-7.855-.035-11.375C43.215.616 40.838-.29 39.716.184zm95.253 16.94c-.087 1.883-.5 3.354-1.014 4.391-.993 2.009-3.055 2.633-3.931-.255-.477-1.574-.499-4.203-.156-6.399.349-2.238 1.324-3.928 2.938-3.775 1.593.15 2.338 2.217 2.163 6.039zm-26.846 11.677c-.022 3.127-.511 5.868-1.558 6.665-1.486 1.129-3.484.282-3.07-2 .366-2.019 2.096-4.081 4.632-6.6 0 0 .005.574-.004 1.935zm-.406-11.694c-.091 1.714-.532 3.436-1.014 4.409-.993 2.008-3.07 2.636-3.931-.256-.589-1.975-.448-4.532-.156-6.144.377-2.09 1.293-4.03 2.938-4.03 1.6 0 2.388 1.768 2.163 6.02zm-15.552-.027c-.098 1.816-.45 3.333-1.014 4.436-1.02 1.994-3.04 2.627-3.931-.256-.642-2.078-.424-4.912-.156-6.443.396-2.272 1.389-3.883 2.938-3.73 1.592.156 2.366 2.217 2.163 5.993zm71.271 2.12c-.389 0-.567.405-.714 1.085-.509 2.364-1.045 2.898-1.735 2.898-.772 0-1.465-1.17-1.644-3.514-.14-1.843-.117-5.236.062-8.61.037-.694-.153-1.38-2-2.056-.795-.29-1.95-.719-2.525.68-1.625 3.95-2.26 7.086-2.41 8.36-.008.066-.088.08-.102-.075-.095-1.02-.308-2.874-.335-6.77-.005-.76-.165-1.407-.998-1.937-.54-.344-2.181-.951-2.772-.228-.512.591-1.105 2.183-1.721 4.07-.501 1.533-.85 2.57-.85 2.57s.007-4.137.013-5.707c.002-.592-.401-.789-.523-.825-.547-.16-1.625-.427-2.083-.427-.565 0-.703.318-.703.781 0 .06-.089 5.448-.089 9.215 0 .163 0 .342.002.531-.313 1.732-1.326 4.082-2.427 4.082-1.103 0-1.624-.983-1.624-5.473 0-2.62.078-3.76.117-5.654.022-1.091.065-1.93.063-2.12-.008-.583-1.01-.877-1.476-.985-.468-.11-.874-.152-1.192-.134-.45.025-.768.322-.768.731 0 .22.003.636.003.636-.579-.917-1.511-1.555-2.13-1.74-1.669-.499-3.411-.056-4.725 1.795-1.044 1.471-1.673 3.137-1.921 5.531-.181 1.75-.122 3.525.2 5.025-.389 1.694-1.111 2.388-1.901 2.388-1.148 0-1.98-1.887-1.884-5.15.064-2.147.491-3.653.957-5.832.199-.929.037-1.415-.368-1.882-.371-.427-1.163-.645-2.301-.377-.81.192-1.969.398-3.029.556 0 0 .064-.257.116-.71.276-2.377-2.288-2.184-3.107-1.425-.488.453-.82.988-.947 1.949-.2 1.525 1.036 2.244 1.036 2.244-.406 1.869-1.399 4.31-2.425 6.074-.549.945-.969 1.646-1.512 2.39l-.004-.83c-.012-3.928.039-7.02.062-8.134.023-1.09.066-1.907.064-2.097-.006-.427-.254-.588-.768-.792a5.42 5.42 0 00-1.551-.348c-.704-.056-1.128.32-1.117.765.002.084.002.6.002.6-.579-.917-1.51-1.554-2.13-1.74-1.669-.498-3.41-.056-4.724 1.795-1.044 1.471-1.728 3.535-1.921 5.513-.18 1.843-.147 3.409.099 4.728-.266 1.321-1.029 2.703-1.892 2.703-1.102 0-1.73-.983-1.73-5.473 0-2.62.078-3.76.116-5.654.023-1.09.066-1.93.063-2.12-.008-.582-1.01-.876-1.475-.985-.488-.114-.909-.155-1.232-.132-.426.032-.726.417-.726.704v.66c-.579-.916-1.51-1.553-2.13-1.738-1.669-.5-3.4-.05-4.724 1.794-.863 1.203-1.562 2.536-1.921 5.487-.104.852-.15 1.651-.144 2.398-.344 2.12-1.864 4.562-3.107 4.562-.728 0-1.42-1.421-1.42-4.45 0-4.035.247-9.78.29-10.333 0 0 1.57-.027 1.874-.03.784-.01 1.493.01 2.537-.044.523-.027 1.028-1.92.487-2.154-.244-.106-1.975-.198-2.66-.213-.578-.013-2.184-.133-2.184-.133s.144-3.813.178-4.216c.028-.336-.403-.508-.65-.613-.602-.256-1.14-.38-1.777-.511-.881-.184-1.281-.004-1.36.744-.117 1.137-.178 4.467-.178 4.467-.646 0-2.855-.128-3.502-.128-.6 0-1.249 2.603-.418 2.635.956.037 2.621.07 3.726.103 0 0-.05 5.84-.05 7.642l.002.556c-.607 3.19-2.748 4.914-2.748 4.914.46-2.11-.48-3.696-2.17-5.038-.624-.494-1.854-1.43-3.23-2.456 0 0 .796-.791 1.503-2.383.501-1.128.523-2.419-.707-2.703-2.031-.471-3.706 1.032-4.206 2.636-.387 1.243-.18 2.165.578 3.123.055.07.115.142.177.214a82.468 82.468 0 01-1.622 3.018c-1.481 2.581-2.6 4.623-3.446 4.623-.675 0-.666-2.073-.666-4.013 0-1.673.122-4.188.22-6.792.033-.861-.395-1.352-1.112-1.796-.435-.27-1.364-.801-1.903-.801-.805 0-3.13.11-5.326 6.509-.277.806-.82 2.276-.82 2.276l.046-7.695c0-.18-.095-.354-.313-.474-.37-.202-1.359-.616-2.238-.616-.419 0-.628.196-.628.587l-.076 12.038c0 .915.023 1.982.113 2.449.09.467.235.847.414 1.073.18.226.387.398.728.47.319.065 2.06.29 2.151-.38.109-.803.113-1.673 1.028-4.914 1.424-5.047 3.28-7.51 4.153-8.384.153-.153.327-.162.319.088-.037 1.107-.168 3.872-.257 6.22-.236 6.286.9 7.451 2.522 7.451 1.241 0 2.99-1.242 4.866-4.386 1.17-1.96 2.305-3.881 3.12-5.266.57.53 1.207 1.1 1.845 1.71 1.481 1.416 1.968 2.762 1.645 4.038-.247.976-1.176 1.982-2.83 1.004-.483-.285-.689-.505-1.174-.827-.26-.172-.658-.224-.896-.043-.62.47-.974 1.069-1.176 1.81-.197.72.52 1.101 1.263 1.434.64.287 2.014.547 2.891.577 3.416.115 6.153-1.662 8.059-6.244.34 3.957 1.792 6.197 4.314 6.197 1.686 0 3.376-2.195 4.116-4.354.212.88.526 1.645.932 2.293 1.943 3.1 5.712 2.433 7.606-.2.586-.814.675-1.106.675-1.106.276 2.486 2.264 3.355 3.402 3.355 1.275 0 2.591-.607 3.514-2.699.108.227.226.444.355.65 1.943 3.1 5.713 2.433 7.606-.2.089-.124.167-.236.235-.336l.055 1.633-1.743 1.61c-2.919 2.697-5.138 4.743-5.301 7.126-.21 3.038 2.237 4.167 4.088 4.315 1.965.157 3.648-.937 4.683-2.467.91-1.347 1.505-4.246 1.462-7.11-.018-1.146-.046-2.604-.069-4.167a33.427 33.427 0 003.246-4.491c1.159-1.935 2.402-4.532 3.038-6.554 0 0 1.08.01 2.233-.067.368-.024.474.052.406.324-.082.329-1.456 5.665-.202 9.22.858 2.434 2.792 3.217 3.939 3.217 1.343 0 2.627-1.021 3.315-2.538.083.17.17.333.264.484 1.944 3.1 5.7 2.43 7.607-.2.43-.593.674-1.106.674-1.106.41 2.573 2.396 3.368 3.534 3.368 1.186 0 2.311-.49 3.224-2.664.038.957.098 1.74.193 1.987.058.151.394.34.64.433 1.084.405 2.19.213 2.599.13.284-.058.505-.287.535-.879.079-1.553.031-4.162.498-6.101.785-3.255 1.517-4.517 1.864-5.142.194-.35.413-.408.421-.037.017.75.054 2.952.358 5.91.223 2.176.521 3.462.75 3.87.654 1.163 1.462 1.218 2.12 1.218.419 0 1.294-.116 1.215-.857-.038-.361.029-2.592.803-5.799.505-2.093 1.347-3.985 1.651-4.677.112-.255.164-.054.162-.015-.064 1.442-.207 6.159.376 8.738.79 3.494 3.077 3.886 3.874 3.886 1.702 0 3.093-1.304 3.562-4.734.113-.825-.054-1.463-.555-1.463M16.05 16c0-2.25-1.8-4.05-4.05-4.05S7.95 13.75 7.95 16s1.8 4.05 4.05 4.05 4.05-1.8 4.05-4.05zm2.1 0c0 3.45-2.7 6.15-6.15 6.15S5.85 19.45 5.85 16 8.55 9.85 12 9.85s6.15 2.7 6.15 6.15zm1.65-6.45c0 .9-.6 1.5-1.5 1.5s-1.5-.6-1.5-1.5.6-1.5 1.5-1.5 1.5.75 1.5 1.5zM12 6.1c-1.8 0-5.55-.15-7.05.45C3.9 7 3 7.9 2.7 8.95c-.6 1.5-.45 5.25-.45 7.05 0 1.8-.15 5.55.45 7.05C3 24.1 3.9 25 4.95 25.3c1.5.6 5.4.45 7.05.45 1.65 0 5.55.15 7.05-.45 1.05-.45 1.8-1.2 2.25-2.25.6-1.65.45-5.4.45-7.05 0-1.65.15-5.55-.45-7.05C21 7.9 20.1 7 19.05 6.7c-1.5-.75-5.25-.6-7.05-.6zM24 16v4.95c0 1.8-.6 3.6-1.95 5.1C20.7 27.4 18.9 28 16.95 28h-9.9c-1.8 0-3.6-.6-5.1-1.95A7.691 7.691 0 010 20.95v-9.9C0 9.1.75 7.3 1.95 5.95 3.45 4.75 5.25 4 7.05 4h9.9c1.8 0 3.6.6 5.1 1.95a7.691 7.691 0 011.95 5.1V16z" fill="#432D2F"/></svg>  
            </a>
          </div>
          <div class="contacts_form scroll_animate">
            '. do_shortcode( '[contact-form-7 id="71" title="Contact"]' ) .'
            <div class="contacts_form_thanks">
              <p>Thank you for your message, I’ll be sure to follow up soon</p>
            </div>
          </div>

        </div>
      </div>

    </section>';
	}

	public function form($instance) {
		$title = !empty($instance['title']) ? $instance['title'] : '';
    $title = !empty($instance['reason_title']) ? $instance['reason_title'] : '';
    $title = !empty($instance['reason_body']) ? $instance['reason_body'] : '';
    $title = !empty($instance['schedule_title']) ? $instance['schedule_title'] : '';
    $title = !empty($instance['schedule_days']) ? $instance['schedule_days'] : '';
    $title = !empty($instance['schedule_time']) ? $instance['schedule_time'] : '';
    $title = !empty($instance['location_title']) ? $instance['location_title'] : '';
    $title = !empty($instance['location_body']) ? $instance['location_body'] : '';

		?>
		<p>
		  <label for="<?= $this -> get_field_id('title'); ?>">Title</label> 
		  <input class="widefat" id="<?= $this -> id ?>" name="<?= $this -> get_field_name('title'); ?>" type="text" value="<?= $instance['title'] ?? ''; ?>">
		</p>
    <p>
		  <label for="<?= $this -> get_field_id('reason_title'); ?>">Reason title</label> 
		  <input class="widefat" id="<?= $this -> id ?>" name="<?= $this -> get_field_name('reason_title'); ?>" type="text" value="<?= $instance['reason_title'] ?? ''; ?>">
		</p>
    <p>
		  <label for="<?= $this -> get_field_id('reason_body'); ?>">Reason body</label> 
		  <input class="widefat" id="<?= $this -> id ?>" name="<?= $this -> get_field_name('reason_body'); ?>" type="text" value="<?= $instance['reason_body'] ?? ''; ?>">
		</p>
    <p>
		  <label for="<?= $this -> get_field_id('schedule_title'); ?>">Schedule title</label> 
		  <input class="widefat" id="<?= $this -> id ?>" name="<?= $this -> get_field_name('schedule_title'); ?>" type="text" value="<?= $instance['schedule_title'] ?? ''; ?>">
		</p>
    <p>
		  <label for="<?= $this -> get_field_id('schedule_days'); ?>">Schedule days</label> 
		  <input class="widefat" id="<?= $this -> id ?>" name="<?= $this -> get_field_name('schedule_days'); ?>" type="text" value="<?= $instance['schedule_days'] ?? ''; ?>">
		</p>
    <p>
		  <label for="<?= $this -> get_field_id('schedule_time'); ?>">Schedule time</label> 
		  <input class="widefat" id="<?= $this -> id ?>" name="<?= $this -> get_field_name('schedule_time'); ?>" type="text" value="<?= $instance['schedule_time'] ?? ''; ?>">
		</p>
    <p>
		  <label for="<?= $this -> get_field_id('location_title'); ?>">Location title</label> 
		  <input class="widefat" id="<?= $this -> id ?>" name="<?= $this -> get_field_name('location_title'); ?>" type="text" value="<?= $instance['location_title'] ?? ''; ?>">
		</p>
    <p>
		  <label for="<?= $this -> get_field_id('location_body'); ?>">Location body</label>
		  <input class="widefat" id="<?= $this -> id ?>" name="<?= $this -> get_field_name('location_body'); ?>" type="text" value="<?= $instance['location_body'] ?? ''; ?>">
		</p>
		<?php 
	}

	public function update( $new_instance, $old_instance ) {
		$instance = array();
    $instance['title'] = strip_tags( $new_instance['title'] );
    $instance['reason_title'] = strip_tags( $new_instance['reason_title'] );
    $instance['reason_body'] = strip_tags( $new_instance['reason_body'] );
    $instance['schedule_title'] = strip_tags( $new_instance['schedule_title'] );
    $instance['schedule_days'] = strip_tags( $new_instance['schedule_days'] );
    $instance['schedule_time'] = strip_tags( $new_instance['schedule_time'] );
    $instance['location_title'] = strip_tags( $new_instance['location_title'] );
    $instance['location_body'] = strip_tags( $new_instance['location_body'] );

		return $instance;
	}
};


function register_about_page_widget() {
  register_widget( 'About_Page_Widget' );
};

function register_contacts_page_widget() {
  register_widget( 'Contacts_Page_Widget' );
};

add_action( 'widgets_init', 'register_about_page_widget' );
add_action( 'widgets_init', 'register_contacts_page_widget' );

?>