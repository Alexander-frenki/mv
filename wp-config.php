<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'mv_degarvic_db' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'root' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '@aPjcU|]w.a-NV9_h4hS{:t?f,HR~+a5AQg1jK[sxFVP>v|uzP![1&v-YZ5wWwI3' );
define( 'SECURE_AUTH_KEY',  '!`}Y=hQGM+K#BRn||bgr&FT*&_R680(W[@hQD1j#y0sZ.v1B67~H34( D=fJ5E]k' );
define( 'LOGGED_IN_KEY',    '4]sx(s%A-55v%g`=up?_)+h[V1=:I46a5#fQnn-xurD5*h8USpK=5;)Lq&&@SO,r' );
define( 'NONCE_KEY',        'f`tdDm2fu?|b^1)>$gZV_X/$)qgy8PW1w~Tk<__?D4Z<+fU ByYGFz3n6PCJ{X|U' );
define( 'AUTH_SALT',        '~-mijgceqs^)Ao~&2R>(mTT#9#G9-Y1%8>9|jC:}_/i,0&r38B2[I=FLMgNuUWv|' );
define( 'SECURE_AUTH_SALT', 'n&F~VM=TDWzR6[XuqG My{bf(E<$y/G2U#-r7;J.ybSw#7X+PDVd&K}ZL1w{<)+[' );
define( 'LOGGED_IN_SALT',   'Eqr3dza/<3,G$5Vc-E}ZRP}3!jA?qN]6Ev ;%?``S43xq@/1_7egFaI#7V0/ic^E' );
define( 'NONCE_SALT',       '=Vwx?Nv%m~S)93aFJ%LQr_l=b`-_3~dhkR#RHvYJF~t&<|cIVhi [>|^ewfgeeot' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
