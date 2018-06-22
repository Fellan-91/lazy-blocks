<?php
/**
 * Plugin Name:  Lazy Blocks
 * Description:  No hassle Gutenberg blocks WordPress developers
 * Version:      @@plugin_version
 * Author:       nK
 * Author URI:   https://nkdev.info/
 * License:      GPLv2 or later
 * License URI:  https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:  @@text_domain
 *
 * @package lazyblocks
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * LazyBlocks Class
 */
class LazyBlocks {

    /**
     * The single class instance.
     *
     * @var null
     */
    private static $_instance = null;

    /**
     * Main Instance
     * Ensures only one instance of this class exists in memory at any one time.
     */
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
            self::$_instance->init();
        }
        return self::$_instance;
    }

    /**
     * The base path to the plugin in the file system.
     *
     * @var string
     */
    public $plugin_path;

    /**
     * URL Link to plugin
     *
     * @var string
     */
    public $plugin_url;

    /**
     * Plugin Name: LazyBlocks
     *
     * @var string
     */
    public $plugin_name;

    /**
     * Plugin Version.
     *
     * @var string
     */
    public $plugin_version;

    /**
     * Creator of the plugin.
     *
     * @var string
     */
    public $plugin_author;

    /**
     * Slug of the plugin.
     *
     * @var string
     */
    public $plugin_slug;

    /**
     * I18n friendly version of Plugin Name.
     *
     * @var string
     */
    public $plugin_name_sanitized;

    /**
     * Blocks class object.
     *
     * @var object
     */
    private $blocks;

    /**
     * Templates class object.
     *
     * @var object
     */
    private $templates;

    /**
     * LazyBlocks constructor.
     */
    public function __construct() {
        /* We do nothing here! */
    }

    /**
     * Init.
     */
    public function init() {
        $this->plugin_path = plugin_dir_path( __FILE__ );
        $this->plugin_url = plugin_dir_url( __FILE__ );

        // get current plugin data.
        if ( ! function_exists( 'get_plugin_data' ) ) {
            require_once( ABSPATH . 'wp-admin/includes/plugin.php' );
        }
        $data = get_plugin_data( __FILE__ );
        $this->plugin_name = $data['Name'];
        $this->plugin_version = $data['Version'];
        $this->plugin_author = $data['Author'];

        $this->plugin_slug = plugin_basename( __FILE__ );
        $this->plugin_name_sanitized = basename( __FILE__, '.php' );

        $this->load_text_domain();
        $this->add_actions();
        $this->include_dependencies();

        $this->blocks = new LazyBlocks_Blocks();
        $this->templates = new LazyBlocks_Templates();
        $this->tools = new LazyBlocks_Tools();
    }

    /**
     * Sets the text domain with the plugin translated into other languages.
     */
    public function load_text_domain() {
        load_plugin_textdomain( '@@text_domain', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
    }

    /**
     * Set the main plugin handlers: Envato Sign Action, Save Cookie redirect.
     */
    public function add_actions() {
        add_action( 'admin_menu', array( $this, 'admin_menu' ) );
        add_filter( 'parent_file', array( $this, 'admin_menu_highlight_items' ) );

        add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue_scripts' ) );
    }

    /**
     * Admin menu.
     */
    public function admin_menu() {
        add_menu_page(
            esc_html__( 'Lazy Blocks', '@@text_domain' ),
            esc_html__( 'Lazy Blocks', '@@text_domain' ),
            'manage_options',
            'lazyblocks',
            null,
            'dashicons-editor-table',
            80
        );

        add_submenu_page(
            'lazyblocks',
            esc_html__( 'Blocks', '@@text_domain' ),
            esc_html__( 'Blocks', '@@text_domain' ),
            'manage_options',
            'edit.php?post_type=lazyblocks'
        );

        add_submenu_page(
            'lazyblocks',
            esc_html__( 'Add New', '@@text_domain' ),
            esc_html__( 'Add New', '@@text_domain' ),
            'manage_options',
            'post-new.php?post_type=lazyblocks'
        );

        add_submenu_page(
            'lazyblocks',
            esc_html__( 'Templates', '@@text_domain' ),
            esc_html__( 'Templates', '@@text_domain' ),
            'manage_options',
            'edit.php?post_type=lazyblocks_templates'
        );
    }

    /**
     * Highlighting portfolio custom menu items.
     *
     * @param string $parent_file - parent file.
     *
     * @return string $parent_file
     */
    public function admin_menu_highlight_items( $parent_file ) {
        global $current_screen, $submenu_file, $submenu;

        // Highlight menus.
        switch ( $current_screen->post_type ) {
            case 'lazyblocks':
                $parent_file = 'lazyblocks';
                break;
        }

        // Remove 'LazyBlocks' sub menu item.
        if ( isset( $submenu['lazyblocks'] ) ) {
            unset( $submenu['lazyblocks'][0] );
        }

        return $parent_file;
    }

    /**
     * Set plugin Dependencies.
     */
    private function include_dependencies() {
        require_once( $this->plugin_path . '/classes/class-blocks.php' );
        require_once( $this->plugin_path . '/classes/class-templates.php' );
        require_once( $this->plugin_path . '/classes/class-tools.php' );
    }

    /**
     * Get lazyblocks array.
     *
     * @param bool $db_only - get blocks from database only.
     */
    public function get_blocks( $db_only = false ) {
        return $this->blocks->get_blocks( $db_only );
    }

    /**
     * Get lazyblocks templates array.
     *
     * @param bool $db_only - get templates from database only.
     */
    public function get_templates( $db_only = false ) {
        return $this->templates->get_templates( $db_only );
    }

    /**
     * Add lazyblocks block.
     *
     * @param array $data - block data.
     */
    public function add_block( $data ) {
        return $this->blocks->add_block( $data );
    }

    /**
     * Add lazyblocks template.
     *
     * @param array $data - template data.
     */
    public function add_template( $data ) {
        return $this->templates->add_template( $data );
    }

    /**
     * Enqueue admin styles and scripts.
     */
    public function admin_enqueue_scripts() {
        global $post;

        // TODO: temporary fix for https://github.com/WordPress/gutenberg/issues/7455 .
        if ( function_exists( 'gutenberg_extend_wp_api_backbone_client' ) ) {
            gutenberg_extend_wp_api_backbone_client();
        }

        wp_enqueue_style( 'lazyblocks-admin', $this->plugin_url . 'assets/admin/css/style.min.css', '', '@@plugin_version' );
        wp_enqueue_script( 'lazyblocks-admin', $this->plugin_url . 'assets/admin/js/script.min.js', array( 'jquery', 'wp-api' ), '@@plugin_version', true );
        wp_localize_script(
            'lazyblocks-admin', 'lazyblocksData', array(
                'nonce'    => wp_create_nonce( 'ajax-nonce' ),
                'url'      => admin_url( 'admin-ajax.php' ),
                'controls' => isset( $post->ID ) ? get_post_meta( $post->ID, 'lazyblocks_controls', true ) ? : array() : array(),
            )
        );
    }
}

/**
 * The main cycle of the plugin.
 *
 * @return null|LazyBlocks
 */
function lazyblocks() {
    return LazyBlocks::instance();
}
add_action( 'plugins_loaded', 'lazyblocks' );

/**
 * Function to get meta value with some improvements for Lazyblocks metas.
 *
 * @param string   $name - metabox name.
 * @param int|null $id - post id.
 *
 * @return array|mixed|object
 */
function get_lzb_meta( $name, $id = null ) {
    $fix_meta_value = false;
    $default = null;

    if ( null === $id ) {
        global $post;
        $id = $post->ID;
    }

    $blocks = lazyblocks()->get_blocks();
    foreach ( $blocks as $block ) {
        if ( isset( $block['controls'] ) && is_array( $block['controls'] ) ) {
            foreach ( $block['controls'] as $control ) {
                if ( $control['save_in_meta_name'] === $name ) {
                    // get all Image and Gallery metabox names.
                    if (
                        'true' === $control['save_in_meta'] &&
                        $control['save_in_meta_name'] &&
                        ( 'image' === $control['type'] || 'gallery' === $control['type'] )
                    ) {
                        $fix_meta_value = true;
                    }

                    switch ( $control['type'] ) {
                        case 'image':
                        case 'gallery':
                        case 'code_editor':
                            break;
                        case 'checkbox':
                        case 'toggle':
                            $default = 'true' === $control['checked'] ? 1 : 0;
                            break;
                        default:
                            $default = $control['default'];
                            break;
                    }
                }
            }
        }
    }

    $result = get_post_meta( $id, $name, true );

    if ( ! $result ) {
        $result = $default;
    }

    // find Image and Gallery controls with meta data to fix it.
    if ( $fix_meta_value ) {
        $result = json_decode( urldecode( $result ), true );
    }

    return $result;
}
