import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Portfolio from "./Portfolio";
import Ledger from "./Ledger";
import Scrap from "./Scrap";
import Post from "./Post";
import Comment from "./Comment";

export default function Body() {
    const params = useParams();
    const [content, setContent] = useState(null);

    useEffect(() => {
        setContent(
            {
                portfolio: <Portfolio />,
                ledger: <Ledger />,
                scrap: <Scrap />,
                comment: <Comment />,
                post: <Post />,
            }[params.section || "portfolio"]
        );
    }, [params]);

    return <>{content}</>;
}
