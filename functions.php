<?php
add_theme_support('menus');

function my_theme_enqueue_scripts() {
    wp_enqueue_style( 'default-style', get_stylesheet_uri(), [], '1.0.0', 'all' ); //default styles.css
}

add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_scripts' );

function get_post_meta_by_slug( $slug ) {
    // Get the post object by slug
    $post = get_page_by_path( $slug, OBJECT, 'post' );

    // Check if post exists
    if ( ! $post ) {
        return null; // Post not found
    }

    // Get all meta data for the post
    $post_meta = get_post_meta( $post->ID );

    return $post_meta;
}

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

function check_and_extract($array) {
    // Check if the key exists in the array
    if (isset($array['wpcf-paragraph'])) {
        // Check if 'wpcf-paragraph' is an array and contains the element '1'
        if (is_array($array['wpcf-paragraph']) && in_array(1, $array['wpcf-paragraph'])) {      
            // Prepare the result array
            $result = array();

            // Check and add 'wpcf-english' to the result if it exists
            if (isset($array['wpcf-paragraph-english'])) {
                $result['english'] = apply_filters('the_content', do_shortcode($array['wpcf-paragraph-english'][0]));
            }

            // Check and add 'wpcf-hebrew' to the result if it exists
            if (isset($array['wpcf-paragraph-hebrew'])) {
                $result['hebrew'] = apply_filters('the_content', do_shortcode($array['wpcf-paragraph-hebrew'][0]));
            }

            // Check and add 'wpcf-russian' to the result if it exists
            if (isset($array['wpcf-paragraph-russian'])) {
                $result['russian'] = apply_filters('the_content', do_shortcode($array['wpcf-paragraph-russian'][0]));
            }

            // Return the result array
            return $result;
        }
    }

        $result = array();

        // Check and add 'wpcf-english' to the result if it exists
        if (isset($array['wpcf-english'])) {
            $result['english'] = $array['wpcf-english'];
        }

        // Check and add 'wpcf-hebrew' to the result if it exists
        if (isset($array['wpcf-hebrew'])) {
            $result['hebrew'] = $array['wpcf-hebrew'];
        }

        // Check and add 'wpcf-russian' to the result if it exists
        if (isset($array['wpcf-russian'])) {
            $result['russian'] = $array['wpcf-russian'];
        }

        // Return the result array
        return $result;
}

function get_translations() {
    // Fetch all 'translation' posts
    $args = array(
        'post_type' => 'translation',
        'posts_per_page' => -1, // Fetch all posts
    );
    $posts = get_posts($args);

    $translations = array();

    // Initialize the map
    foreach ($posts as $p) {
        setup_postdata($p);

        $translations[$p->post_title] = get_post_custom($p->ID);

        wp_reset_postdata();
    }

    return $translations;
}

function get_layouts() {
    // Fetch all 'layout' posts
    $args = array(
        'post_type' => 'layout',
        'posts_per_page' => -1, // Fetch all posts
    );
    $posts = get_posts($args);

    $layouts = array();

    // Initialize the map
    foreach ($posts as $p) {
        setup_postdata($p);

        $layouts[$p->post_name] = apply_filters('the_content', do_shortcode($p->post_content));

        wp_reset_postdata();
    }

    return $layouts;
}

function remove_first_char_if_star($string) {
    // Check if the first character is '*'
    if (isset($string[0]) && $string[0] === '*') {
        // Return the string without the first character
        return substr($string, 1);
    }
    
    // Return the original string if the first character is not '*'
    return $string;
}

function is_layout($string) {
    if (isset($string[0]) && $string[0] === '*') {
        return true;
    }
    
    return false;
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
    global $post;

    $translations = get_translations();
    $layouts = get_layouts();

    $meta = is_singular()? get_post_custom($post->ID) : null;

    $content=array();
    if(!is_null($meta)){
        $content=array();
        $paragraphs = $meta['wpcf-paragraphs'];
        foreach($paragraphs as $paragraph_slug){
            $slug = remove_first_char_if_star($paragraph_slug);
            if(is_layout($paragraph_slug)){
                $layout = isset($layouts[$slug])?$layouts[$slug]:null;
                if(!is_null($layout)){
                    array_push($content, $layout);
                }
            } else {
                $translation = isset($translations[$slug])?$translations[$slug]:null;
                if(!is_null($translation)){
                    array_push($content, check_and_extract($translation));
                }
            }
        }
    }

    $map = array(
        'translations' => array_filter($translations,function($value) {
                                                         return !isset($value['wpcf-paragraph']) || !in_array('1', $value['wpcf-paragraph']);
                                                     }),
        'site' => $site_options,
        'query' => $wp_query,
        'menus' => get_all_menus_with_items(),
        'content' => $content,
    );

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