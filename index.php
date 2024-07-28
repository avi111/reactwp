<?php
defined( 'ABSPATH' ) || exit;
?><!DOCTYPE html>
<!--[if !(IE 6) | !(IE 7) | !(IE 8)  ]><!-->
<html <?php language_attributes(); ?> class="no-js">
<!--<![endif]-->
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
	<link rel="profile" href="https://gmpg.org/xfn/11" />
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <div id="header">
            <header>
                <?php
                $site_title = get_bloginfo( 'name' );
                $site_url = network_site_url( '/' );
                $site_description = get_bloginfo( 'description' );
                ?>
                        <h1><a href="<?php echo $site_url ?>"><?php echo $site_title ?></a></h1>
                        <p><?php echo $site_description ?></p>
       <?php
       $menu = wp_get_nav_menu_object('Main Menu');
       wp_nav_menu( array(
                   'menu' => $menu->term_id,
                   'echo' => true,
               ) )
       ?>
       </header>
     </div>
<?php
do_shortcode('[app]');
wp_footer(); 
?>
</body>
</html>
