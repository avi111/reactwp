export type QueryVars = {
    error: string;
    m: string;
    p: number;
    post_parent: string;
    subpost: string;
    subpost_id: string;
    attachment: string;
    attachment_id: number;
    name: string;
    pagename: string;
    page_id: number;
    second: string;
    minute: string;
    hour: string;
    day: number;
    monthnum: number;
    year: number;
    w: number;
    category_name: string;
    tag: string;
    cat: string;
    tag_id: string;
    author: string;
    author_name: string;
    feed: string;
    tb: string;
    paged: number;
    meta_key: string;
    meta_value: string;
    preview: string;
    s: string;
    sentence: string;
    title: string;
    fields: string;
    menu_order: string;
    embed: string;
    category__in: number[];
    category__not_in: number[];
    category__and: number[];
    post__in: number[];
    post__not_in: number[];
    post_name__in: string[];
    tag__in: number[];
    tag__not_in: number[];
    tag__and: number[];
    tag_slug__in: string[];
    tag_slug__and: string[];
    post_parent__in: number[];
    post_parent__not_in: number[];
    author__in: number[];
    author__not_in: number[];
    search_columns: string[];
    ignore_sticky_posts: boolean;
    suppress_filters: boolean;
    cache_results: boolean;
    update_post_term_cache: boolean;
    update_menu_item_cache: boolean;
    lazy_load_term_meta: boolean;
    update_post_meta_cache: boolean;
    post_type: string;
    posts_per_page: number;
    nopaging: boolean;
    comments_per_page: number;
    no_found_rows: boolean;
    order: 'ASC' | 'DESC';
};

export type TaxQuery = {
    taxonomy: string;
    field: 'term_id' | 'name' | 'slug' | 'term_taxonomy_id';
    terms: number[] | string[];
    include_children?: boolean;
    operator?: 'IN' | 'NOT IN' | 'AND' | 'EXISTS' | 'NOT EXISTS';
}[];

export type MetaQuery = {
    key: string;
    value: string | number | string[] | number[];
    compare?: '=' | '!=' | '>' | '>=' | '<' | '<=' | 'LIKE' | 'NOT LIKE' | 'IN' | 'NOT IN' | 'BETWEEN' | 'NOT BETWEEN' | 'EXISTS' | 'NOT EXISTS';
    type?: 'NUMERIC' | 'BINARY' | 'CHAR' | 'DATE' | 'DATETIME' | 'DECIMAL' | 'SIGNED' | 'TIME' | 'UNSIGNED';
}[];

export type WP_Query = {
    query: any[];
    query_vars: QueryVars;
    tax_query: {
        queries: TaxQuery;
        relation: 'AND' | 'OR';
        queried_terms: any[];
        primary_table: string;
        primary_id_column: string;
    };
    meta_query: {
        queries: MetaQuery;
        relation: 'AND' | 'OR' | null;
        meta_table: string | null;
        meta_id_column: string | null;
        primary_table: string | null;
        primary_id_column: string | null;
    };
    date_query: boolean | null;
    request: string;
    posts: any[];
    post_count: number;
    current_post: number;
    before_loop: boolean;
    in_the_loop: boolean;
    comment_count: number;
    current_comment: number;
    found_posts: number;
    max_num_pages: number;
    max_num_comment_pages: number;
    is_single: boolean;
    is_preview: boolean;
    is_page: boolean;
    is_archive: boolean;
    is_date: boolean;
    is_year: boolean;
    is_month: boolean;
    is_day: boolean;
    is_time: boolean;
    is_author: boolean;
    is_category: boolean;
    is_tag: boolean;
    is_tax: boolean;
    is_search: boolean;
    is_feed: boolean;
    is_comment_feed: boolean;
    is_trackback: boolean;
    is_home: boolean;
    is_privacy_policy: boolean;
    is_404: boolean;
    is_embed: boolean;
    is_paged: boolean;
    is_admin: boolean;
    is_attachment: boolean;
    is_singular: boolean;
    is_robots: boolean;
    is_favicon: boolean;
    is_posts_page: boolean;
    is_post_type_archive: boolean;
    thumbnails_cached: boolean;
};

export type SiteOptions = {
    site_name: string;           // Site title
    site_description: string;    // Site tagline/description
    site_url: string;            // WordPress Address (URL)
    home_url: string;            // Site Address (URL)
    admin_email: string;         // Admin email address
    charset: string;             // Site charset (e.g., UTF-8)
    timezone: string;            // Timezone string
    date_format: string;         // Date format
    time_format: string;         // Time format
    start_of_week: number;       // Starting day of the week (0 = Sunday, 1 = Monday, etc.)
    language: string;            // Site language
    admin_ajax_url: string;      // Admin AJAX URL
};

type MenuItem = {
    ID: number;
    post_author: string;
    post_date: string;
    post_date_gmt: string;
    post_content: string;
    post_title: string;
    post_excerpt: string;
    post_status: string;
    comment_status: string;
    ping_status: string;
    post_password: string;
    post_name: string;
    to_ping: string;
    pinged: string;
    post_modified: string;
    post_modified_gmt: string;
    post_content_filtered: string;
    post_parent: number;
    guid: string;
    menu_order: number;
    post_type: string;
    post_mime_type: string;
    comment_count: string;
    filter: string;
    db_id: number;
    menu_item_parent: string;
    object_id: string;
    object: string;
    type: string;
    type_label: string;
    url: string;
    title: string;
    target: string;
    attr_title: string;
    description: string;
    classes: string[];
    xfn: string;
};

export type MenuTerm = {
    term_id: number;          // Unique identifier for the term
    name: string;             // The name of the term
    slug: string;             // The slug for the term
    term_group: number;       // The term group
    term_taxonomy_id: number; // Unique identifier for the term taxonomy
    taxonomy: string;         // The taxonomy the term belongs to
    description: string;      // The description of the term
    parent: number;           // The parent term ID (if hierarchical)
    count: number;            // The count of posts associated with the term
    filter: string;           // The filter property for terms
};


export type Menus = {
    [menuSlug: string]: {
        term: MenuTerm;
        items: MenuItem[];
        html: string;
    };
};

declare global {
    interface Window {
        object: {
            query: WP_Query;
            site: SiteOptions;
            menus: Menus;
            post: string;
        };
    }
}