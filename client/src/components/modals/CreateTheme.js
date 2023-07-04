import React, {useState} from "react";
import { Button, FormControl, Modal, Form } from "react-bootstrap";
import { createTheme } from "../../http/postAPI";
import { observer } from "mobx-react-lite";

const CreateTheme = observer(({show, onHide}) => {
    const [value, setValue] = useState('')

    const addTheme = () => {
        console.log(value)
        createTheme({name: value}).then(data => {
        setValue('')
        onHide()
        })
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
                    Добавить новую тему
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormControl
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={'Введите название темы'}
                        />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={addTheme}>Добавить</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default CreateTheme;