import { useLanguage } from "./Language/useLanguage.ts";
import { ReactNode } from "react";

function Header({ children }: { children: ReactNode }) {
  const {
    object: { menus, site },
  } = window;
  const { translate } = useLanguage();
  const menu = menus["main-menu"];
  return (
    <header>
      <h1>
        <a href={site.site_url}>{translate(site.site_name)}</a>
      </h1>
      <p>{translate(site.site_description)}</p>
      {children}
      <div className="menu-main-menu-container">
        <ul className="menu">
          {menu.items.map((item) => (
            <li
              key={item.ID}
              className={`menu-item menu-item-type-post_type_archive menu-item-object-agent menu-item-${item.ID}`}
            >
              <a href={item.url}>{translate(item.title)}</a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default Header;
