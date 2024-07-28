import {useCallback, useState} from 'react'
import './App.css'
import {useLanguage} from "./Language/useLanguage.ts";
import Header from "./Header.tsx";

function App() {
    const [count, setCount] = useState(0)
    const {object: {content, post, query: {posts, is_home, is_archive, query_vars, is_singular}}} = window;
    const {language} = useLanguage();
    const getTitle = useCallback(() => {
            if (is_home) {
                return "home";
            }
            if (is_archive) {
                if (query_vars.post_type) {
                    return `archive ${query_vars.post_type}`;
                }

                if (query_vars.category_name) {
                    return `archive ${query_vars.category_name}`;
                }

                if (query_vars.tag) {
                    return `archive ${query_vars.tag}`;
                }

                return "archive";
            }
            return posts[0].post_title;
        }
        , [is_archive, is_home, posts, query_vars.category_name, query_vars.post_type, query_vars.tag]);

    const title = getTitle();

    const getContent = useCallback(() => {
        if (is_home) {
            return "home content";
        }
        if (is_archive) {
            return <div>{posts.map((post) => <div>
                    <h2>{post.post_title}</h2>
                    <div dangerouslySetInnerHTML={{__html: post.post_content}}/>
                </div>
            )}</div>;
        }

        if (is_singular) {
            return content.map((block) => {
                if (typeof block === "string") {
                    return <div dangerouslySetInnerHTML={{__html: block}}/>;
                } else {
                    return <div dangerouslySetInnerHTML={{__html: block[language]}}/>;
                }
            });
        }

        return <div dangerouslySetInnerHTML={{__html: post}}/>;
    }, [is_home, is_archive, is_singular, post, posts, content, language]);

    return (
        <>
            <Header/>
            <h1>{title}</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                {getContent()}
            </div>
        </>
    )
}

export default App
