import { useLanguage } from "../Language/useLanguage.ts";
import { useApp } from "../Language/useApp.ts";

export const Title = () => {
  const { query } = useApp();
  const {
    is_home,
    is_archive,
    query_vars: { post_type, tag, category_name },
    posts,
  } = query;
  const { translate } = useLanguage();

  if (is_home) {
    return "home";
  }
  if (is_archive) {
    if (post_type) {
      return `archive ${translate(post_type)}`;
    }

    if (category_name) {
      return `archive ${translate(category_name)}`;
    }

    if (tag) {
      return `archive ${translate(tag)}`;
    }

    return "archive";
  }
  return translate(posts[0].post_title);
};
