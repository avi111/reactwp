<?php
add_theme_support('menus');

function my_theme_enqueue_scripts() {
    wp_enqueue_style( 'default-style', get_stylesheet_uri(), [], '1.0.0', 'all' ); //default styles.css
}

add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_scripts' );

function get_all_menus_with_items() {
    // Fetch all menus
    $menus = wp_get_nav_menus();

    // Initialize the array to hold the menus and their items
    $menus_array = array();

    foreach ( $menus as $menu ) {
        $menu_html = wp_nav_menu( array(
            'menu' => $menu->term_id,
            'echo' => false,
        ) );

        // Fetch all items for the current menu
        $menu_items = wp_get_nav_menu_items( $menu->term_id );
        
        // Add the menu items and the WP_Term object to the associative array
        $menus_array[$menu->slug] = array(
            'term' => $menu,
            'items' => $menu_items,
            'html' => $menu_html,
        );
    }

    return $menus_array;
}

function create_shortcode()
{
    $html_file_path = get_stylesheet_directory() . 'dist/index.html';

    // Check if the file exists before trying to read it
    if (file_exists($html_file_path)) {
        // Fetch the contents of the HTML file
        $html_content = file_get_contents($html_file_path);

        // Output the HTML content (you might want to do this within a function or hook)
        echo $html_content;
    }
}

function get_data_map()
{
    $site_options = array(
        'site_name'      => get_option('blogname'),
        'site_description' => get_option('blogdescription'),
        'site_url'       => get_option('siteurl'),
        'home_url'       => get_option('home'),
        'admin_email'    => get_option('admin_email'),
        'charset'        => get_option('blog_charset'),
        'timezone'       => get_option('timezone_string'),
        'date_format'    => get_option('date_format'),
        'time_format'    => get_option('time_format'),
        'start_of_week'  => get_option('start_of_week'),
        'language'       => get_option('WPLANG'),
    );
    
    // Add the admin AJAX URL
    $site_options['admin_ajax_url'] = admin_url('admin-ajax.php');

    global $wp_query;

    $menus = wp_get_nav_menus();

    $map = array(
        'site' => $site_options,
        'query' => $wp_query,
        'menus' => get_all_menus_with_items(),
        'post' => !is_null($wp_query->post)?apply_filters('the_content', do_shortcode($wp_query->post->post_content)):"",
    );
 
    // // Fetch all 'translation' posts
    // $args = array(
    //     'post_type' => 'translation',
    //     'posts_per_page' => -1, // Fetch all posts
    // );
    // $posts = get_posts($args);

    // // Initialize the map

    // foreach ($posts as $post) {
    //     setup_postdata($post);
    //     $map[$post->post_name] = array(
    //         'id' => $post->post_name,
    //         'hebrew' => get_post_meta($post->ID, 'wpcf-content-hebrew', true),
    //         'english' => get_post_meta($post->ID, 'wpcf-content-english', true),
    //         'russian' => get_post_meta($post->ID, 'wpcf-content-russian', true),
    //     );
    // }
    // wp_reset_postdata();

    return $map;
}

function displayReactApp()
{
    $current_user = (array) wp_get_current_user()->roles;
?>
    <div id="root"></div>
<?php
}

// register shortcode
add_shortcode('app', 'displayReactApp');

add_action('wp_enqueue_scripts', 'enq_react');

function enq_react()
{
    wp_register_script(
        'app',
        get_stylesheet_directory_uri() . '/dist/index.js',
        ['wp-element'],
        null,
        true
    );

    $data = get_data_map();

    wp_localize_script('app', 'object', $data); //localize script to pass PHP data to JS
    wp_enqueue_script('app');
    wp_enqueue_style('my-style', get_stylesheet_directory_uri().'/dist/index.css', false, '1.0', 'all');
}