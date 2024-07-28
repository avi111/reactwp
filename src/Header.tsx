function Header() {
    const {object: {menus, site}} = window;

    const menu = menus["main-menu"];
    return (
        <header>
            <h1><a href={site.site_url}>{site.site_name}</a></h1>
            <p>{site.site_description}</p>
            <div className="menu-main-menu-container">
                <ul className="menu">
                    {menu.items.map((item) => (
                        <li key={item.ID}
                            className={`menu-item menu-item-type-post_type_archive menu-item-object-agent menu-item-${item.ID}`}>
                            <a href={item.url}>{item.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    )
}

export default Header
