import React, { useContext, useState } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { Context } from "../index";


import CreateTheme from "../components/modals/CreateTheme"
import CreatePost from "../components/modals/CreatePost"

import UpdateTheme from "../components/modals/UpdateTheme";

import DeletePost from "../components/modals/DeletePost";
import UpdatePost from "../components/modals/UpdatePost";

const Admin = () => {

const {post} = useContext(Context)

const [themeVisible, setThemeVisible] = useState(false)
const [postVisible, setPostVisible] = useState(false)

const [themeVisibleUpdate, setThemeVisibleUpdate] = useState(false)
const [postVisibleUpdate, setPostVisibleUpdate] = useState(false)

const [postVisibleDelete, setPostVisibleDelete] = useState(false)


    return(
        <Container className="d-flex flex-column">
            <ButtonGroup>
            <Button variant={'outline-dark'} className="mt-2" onClick={() => setThemeVisible(true)}>
                Добавить тему
                </Button>
            <Button variant={'outline-dark'} className="mt-2" onClick={() => setPostVisible(true)}>
                Добавить пост
                </Button>
                <Button variant={'outline-dark'} className="mt-2" onClick={() => setThemeVisibleUpdate(true)}>
                Редактировать тему
                </Button>
                <Button variant={'outline-dark'} className="mt-2" onClick={() => setPostVisibleUpdate(true)}>
                Редактировать пост
                </Button>
                <Button variant={'outline-dark'} className="mt-2" onClick={() => setPostVisibleDelete(true)}>
                Удалить пост
                </Button>
            <CreateTheme show={themeVisible} onHide={() => setThemeVisible(false)}/>
            <CreatePost show={postVisible} onHide={() => setPostVisible(false)}/>

            <UpdateTheme show={themeVisibleUpdate} onHide={() => setThemeVisibleUpdate(false)}/>
            <UpdatePost show={postVisibleUpdate} onHide={() => setPostVisibleUpdate(false)}/>
            
            <DeletePost show={postVisibleDelete} onHide={() => setPostVisibleDelete(false)}/>
            </ButtonGroup>
        </Container>
    )
}

export default Admin