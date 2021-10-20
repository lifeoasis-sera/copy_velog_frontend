import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getMyPage} from "../lib/server/post";
import Post from "../components/post/Post";

function MyPage() {
    const {name} = useParams();
    const [postInfos, setPostInfos] = useState(undefined);

    useEffect(() => {
        getMyPageInfo();
    }, [name])

    async function getMyPageInfo() {
        const data = await getMyPage(name);
        setPostInfos(data.info)
    }

    return <>
        {postInfos === undefined || postInfos.length === 0 ?
            <div>작성한 게시물이 없습니다.</div>
            : postInfos.map((post, index) => {
                return <Post key={`body_board_${index}`} info={post}/>;
            })
        }
    </>
}

export default MyPage;