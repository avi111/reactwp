import { InjectedProps, Menus, SiteOptions } from "../types/types.ts";
import { createContext, useContext, useMemo } from "react";

export const AppContext = createContext<InjectedProps>(window.object);

export const useApp = () => {
  const { query, site, content, translations, post, menus } =
    useContext(AppContext);

  const convertedMenuUrls: Menus = useMemo(() => {
    if (!import.meta.env.DEV) {
      return menus;
    }

    const newMenus = { ...menus };
    Object.keys(newMenus).forEach((menuSlug) => {
      newMenus[menuSlug].items = newMenus[menuSlug].items.map((item) => ({
        ...item,
        guid: item.guid.replace(site.site_url, location.origin),
        url: item.url.replace(site.site_url, location.origin),
      }));
    });
    return newMenus;
  }, [site, menus]);

  const convertedSiteUrls: SiteOptions = useMemo(() => {
    if (!import.meta.env.DEV) {
      return site;
    }

    const newSite = { ...site };
    newSite.site_url = newSite.site_url.replace(site.site_url, location.origin);
    newSite.home_url = newSite.home_url.replace(site.site_url, location.origin);
    newSite.admin_ajax_url = newSite.admin_ajax_url.replace(
      site.site_url,
      location.origin,
    );
    return newSite;
  }, [site]);

  return {
    query,
    site: convertedSiteUrls,
    translations,
    post,
    menus: convertedMenuUrls,
    content,
  };
};
