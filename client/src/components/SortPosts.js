import React, { useContext, useEffect} from "react";
import { Context } from "../index";
import { ListGroup } from "react-bootstrap"
import { observer } from "mobx-react-lite"

const SortPost = observer(() => {
    const {post, sort} = useContext(Context)

    useEffect(() => {
        sort.setSelectSort("")
      }, [])

    const click = (tab) => {
        sort.setSelectSort(tab)
        var sortedPosts = post.posts

        if (tab.id === 1) {
            post.setPosts(sortedPosts.sort((obj1, obj2) => (obj1.id > obj2.id) ? 1 : -1))
        }
        else {
            post.setPosts(sortedPosts.sort((obj1, obj2) => (obj1.id < obj2.id) ? 1 : -1))
        }
    }

    return (
        <ListGroup className="mt-2">
            {sort.sorts.map(tab =>
                <ListGroup.Item  onClick={() => click(tab)} key={tab.id} action variant="secondary" style={{cursor: 'pointer'}}>
                    {tab.label}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
})

export default SortPost;
