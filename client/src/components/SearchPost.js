import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Container, Form} from "react-bootstrap";
import { Context } from "..";
import { fetchPosts } from "../http/postAPI";

const SearchPosts = observer(() => {

    const { post } = useContext(Context)
    const [filterText, setFilterText] = useState('')

    useEffect(() => {
        fetchPosts().then(data => post.setPosts(data.rows))
    }, [filterText === ""])

    const handleChange = e => {
        setFilterText(e.target.value)
        filterFunc()
    }

    function filterFunc() {
        var filteredItems
        filteredItems = post.posts.filter(poster => 
            poster.name.toLowerCase().includes(filterText.toLowerCase())
            );
            post.setPosts(filteredItems)
    }

    return (
            <Form> <Form.Control type="search" value={filterText} onChange={handleChange} placeholder="Поиск"/></Form>
    )
})

export default SearchPosts;