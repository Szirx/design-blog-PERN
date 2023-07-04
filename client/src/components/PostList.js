import React, { useContext, useEffect, useState } from "react";
import { Context } from "../index";
import {Row} from "react-bootstrap";
import PostItem from "./PostItem";
import { observer } from "mobx-react-lite";
import { fetchPosts } from "../http/postAPI";
import { Spinner } from "react-bootstrap";


const PostList = observer(() => {
    const {post} = useContext(Context)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        fetchPosts(null).then(data => post.setPosts(data.rows)).finally(() => setLoading(false))
      },[])

      if (loading) {return <Spinner animation={"grow"}/>}
    return(
        <Row className="d-flex">
            {post.posts.map(poster => (
                 <PostItem key={poster.id} post={poster}/>)
                )}
        </Row>
    )
})

export default PostList;