import React, { useContext, useState, useEffect } from "react";
import { Button, Dropdown, Form, Modal, Spinner } from "react-bootstrap";
import { fetchThemes, updateTheme } from "../../http/postAPI";
import { Context } from "../../index";

const UpdateTheme = ({ show, onHide }) => {
    const {post} = useContext(Context)
    const [value, setValue] = useState('')

    const updTheme = () => {
        updateTheme(post.selectedTheme.id, {name: value }).then(data => { 
        setValue('')
        onHide()})
        fetchThemes().then(data => post.setThemes(data))
    }

    const [loadingTh, setLoadingTh] = useState(true)
    
    useEffect(() => {
        fetchThemes(null).then(data => post.setThemes(data)).finally(() => setLoadingTh(false))
      },[])

      if (loadingTh) {return <Spinner animation={"grow"}/>}

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить название темы
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form className="d-flex justify-content-center">
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{post.selectedTheme.name ? 
                            post.selectedTheme.name : "Выберите тему"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {post.themes?.map(theme =>
                                <Dropdown.Item
                                onClick={() => post.setSelectedTheme(theme)}
                                key={theme.id}
                                >
                                    {theme.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название темы"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={updTheme}>Изменить</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateTheme;
