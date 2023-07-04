import React, { useContext, useState, useEffect } from "react";
import { Button, FormControl, Modal, Form, Dropdown, Spinner } from "react-bootstrap";
import { Context } from "../../index";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { createPost, fetchPosts, fetchThemes } from "../../http/postAPI";
import { observer } from "mobx-react-lite";


const CreatePost = observer(({show, onHide}) => {
    const {post} = useContext(Context)
    const [name, setName] = useState('')
    const [file, setFile] = useState(null)
    const [description, setDescription] = useState('')

    useEffect( () => {
        fetchPosts().then(data => post.setPosts(data.rows))
    }, [])


    const selectFiles = e => {
        console.log(e.target.files)
        setFile(e.target.files)
        for (let i = 0; i < e.target.files.length; i++) {
            console.log(e.target.files[i].name);
            console.log(e.target.files[i])
        }
    }
    const addPost = () => {
        const formData = new FormData()
        formData.append('name', name)
        for(let i=0;i<file.length;i++) {
            formData.append('img', file[i])
        }
        formData.append('theme_id', post.selectedTheme.id)
        formData.append('description', description)
        createPost(formData).then(data => onHide())
    }
        return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новый пост
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown>
                        <DropdownToggle>{post.selectedTheme.name || "Выберите тему"}</DropdownToggle>
                        <DropdownMenu>
                            {post.themes?.map(theme =>
                                <DropdownItem onClick={() => post.setSelectedTheme(theme)} key={theme.id}>{theme.name}</DropdownItem>)}
                        </DropdownMenu>
                    </Dropdown>
                    <FormControl value={name} onChange={e => setName(e.target.value)} className="mt-3" placeholder="Введите название"/>
                    <FormControl value={description} onChange={e => setDescription(e.target.value)} as="textarea" rows={10} className="mt-3" placeholder="Введите содержание поста"/>
                    <FormControl className="mt-3" type="file" multiple onChange={selectFiles}/>
                    <hr/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={addPost}>Добавить</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default CreatePost;