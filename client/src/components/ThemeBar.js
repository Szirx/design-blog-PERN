import React, { useContext, useEffect, useState } from "react";
import {observer} from "mobx-react-lite"
import { Context } from "../index";
import ListGroup from 'react-bootstrap/ListGroup';
import { fetchPosts, fetchThemes } from "../http/postAPI";
import { Spinner } from "react-bootstrap";

const ThemeBar = observer(() => {
    const {post} = useContext(Context)
    const [loadingThemes, setLoadingThemes] = useState(true)

    function setAllTheme() {
        post.setSelectedTheme('')
        fetchPosts().then(data => post.setPosts(data.rows))
    }
    useEffect(() => {
        fetchThemes().then(data => post.setThemes(data)).finally(() => setLoadingThemes(false))
    }, [])

    return (
        <ListGroup className="md-2">
            <ListGroup.Item
                    style={{ cursor: "pointer" }}
                    action variant="secondary"
                    //variant="light"
                    onClick={() => setAllTheme()}
                >
                    Все темы
                </ListGroup.Item>
            {post.themes?.map((theme) =>
                <ListGroup.Item
                    style={{ cursor: "pointer" }}
                    active={theme.id === post.selectedTheme.id}
                    action variant="secondary"
                    //variant="light"
                    onClick={() => post.setSelectedTheme(theme)}
                    key={theme.id}
                >
                    {theme.name}
                </ListGroup.Item>
                )}
        </ListGroup>
    )
})

export default ThemeBar;