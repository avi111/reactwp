import { InjectedProps } from "../types/types.ts";
import { useLanguage } from "../Language/useLanguage.ts";
import DOMPurify from "dompurify";

export const Content = ({ query, content, post }: InjectedProps) => {
  const { is_home, is_archive, is_singular, posts, query_vars } = query;
  const { language, translate } = useLanguage();

  if (is_home) {
    return "home content";
  }
  if (is_archive) {
    return (
      <div>
        {posts.map((post) => (
          <div key={post.ID}>
            <h2>{translate(post.post_title)}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.post_content }} />
          </div>
        ))}
      </div>
    );
  }

  if (is_singular) {
    if (query_vars.name === "post") {
      if (typeof content.layout === "string") {
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(content.layout),
            }}
          />
        );
      } else {
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(content.layout[language]),
            }}
          />
        );
      }
    }
    return Object.values(content).map((block, i) => {
      if (typeof block === "string") {
        return (
          <div
            key={i}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(block) }}
          />
        );
      } else {
        return (
          <div
            key={i}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(block[language]),
            }}
          />
        );
      }
    });
  }

  return <div dangerouslySetInnerHTML={{ __html: post }} />;
};
