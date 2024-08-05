import { InjectedProps, Menus, SiteOptions } from "../types/types.ts";
import { createContext, useCallback, useContext } from "react";

export const AppContext = createContext<InjectedProps>(window.object);

export const useApp = () => {
  const { query, site, content, translations, post, menus } =
    useContext(AppContext);

  const convertMenuUrls: (menus: Menus) => Menus = useCallback((menus) => {
    const newMenus = { ...menus };
    Object.keys(newMenus).forEach((menuSlug) => {
      newMenus[menuSlug].items = newMenus[menuSlug].items.map((item) => ({
        ...item,
        guid: item.guid.replace(site.site_url, location.hostname),
        url: item.url.replace(site.site_url, location.hostname),
      }));
    });
    return newMenus;
  }, []);

  const convertSiteUrls: (site: SiteOptions) => SiteOptions = useCallback(
    (site) => {
      const newSite = { ...site };
      newSite.site_url = newSite.site_url.replace(
        site.site_url,
        location.hostname,
      );
      newSite.home_url = newSite.home_url.replace(
        site.site_url,
        location.hostname,
      );
      newSite.admin_ajax_url = newSite.admin_ajax_url.replace(
        site.site_url,
        location.hostname,
      );
      return newSite;
    },
    [],
  );

  return {
    query,
    site: convertSiteUrls(site),
    translations,
    post,
    menus: convertMenuUrls(menus),
    content,
  };
};
