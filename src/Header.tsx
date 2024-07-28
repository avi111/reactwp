import LanguageSelector from "./Language/LanguageSelector.tsx";
import {useLanguage} from "./Language/useLanguage.ts";
import {regularToSnakeCase} from "./utils.ts";

function Header() {
    const {object: {menus, site}} = window;
    const {translate} = useLanguage();
    const menu = menus["main-menu"];
    return (
        <header>
            <h1><a href={site.site_url}>{site.site_name}</a></h1>
            <p>{site.site_description}</p>
            <LanguageSelector/>
            <div className="menu-main-menu-container">
                <ul className="menu">
                    {menu.items.map((item) => (
                        <li key={item.ID}
                            className={`menu-item menu-item-type-post_type_archive menu-item-object-agent menu-item-${item.ID}`}>
                            <a href={item.url}>{translate(regularToSnakeCase(item.title))}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    )
}

export default Header
