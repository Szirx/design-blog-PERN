import React, { useContext, useState } from "react";
import { Button, Dropdown, Form, Modal} from "react-bootstrap";
import { updatePost } from "../../http/postAPI";
import { Context } from "../..";
import { observer } from "mobx-react-lite";

const UpdatePost = observer(({ show, onHide }) => {

    const {post} = useContext(Context)

    //Поля данных
    const [name, setName] = useState(null)
    const [pictures, setPictures] = useState(null)
    const [description, setDescription] = useState(null)

    //Флаги выбора параметров (выбран для изменения или нет)
    const [choiceName, setChoiseName] = useState(false)
    const [choicePictures, setChoicePictures] = useState(false)
    const [choiceDescription, setChoiceDescription] = useState(false)

    const selectFiles = e => {setPictures(e.target.files)}
    const onSwitchActionName = () => {setChoiseName(!choiceName);};
    const onSwitchActionPic = () => {setChoicePictures(!choicePictures);};
    const onSwitchActionDes = () => {setChoiceDescription(!choiceDescription);};
    const updPost = () => {
        const formData = new FormData()

        if(choiceName){
            formData.append('name', name)
            updatePost(post.selectedPost.id, "Name" , formData).then(data => onHide())
        }
        if(choicePictures){
            console.log(pictures)
            for(let i=0;i<pictures.length;i++) {
                formData.append('img', pictures[i])
                console.log(pictures[i])
            }
            // formData.append('img', pictures)
            console.log(formData)
            updatePost(post.selectedPost.id, "img" , formData).then(data => onHide())
        }
        if(choiceDescription){
            formData.append('description', description)
            updatePost(post.selectedPost.id, "Des" , formData).then(data => onHide())
        }
        if(!(choiceName || choiceDescription || choicePictures))
        {console.log("Не будет изменено")}

    }

    return (
        <Modal show={show} onHide={onHide} size="lg" centered style={{backgroundColor: 'rgba(10, 10, 10, 0.3)'}}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {"Изменить информацию о " + post.selectedPost.name || "Изменить информацию"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle
                        className="dropbar"
                    >{post.selectedPost.name || "Выберите пост"}</Dropdown.Toggle>
                    <Dropdown.Menu >
                        {post.posts.map(poster =>
                            <Dropdown.Item
                                onClick={() => post.setSelectedPost(poster)}
                                key={poster.id}
                            >                            
                                {poster.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>

                <Form>
                    <Form.Switch label={`Название поста`} onChange={onSwitchActionName}/>
                    <Form.Control
                        disabled={!choiceName}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-2 mb-4"
                        placeholder={post.selectedPost.name || "Название поста"}
                    />
                </Form>
                <Form.Switch label={`Изображение поста`} onChange={onSwitchActionPic}/>
                <Form.Control
                    disabled={!choicePictures}
                    type="file"
                    multiple
                    onChange={selectFiles}
                    className="mb-4"
                />
                <Form.Switch label={`Описание поста`} onChange={onSwitchActionDes}/>

                <Form.Group className="mb-3">
                    <Form.Control
                        disabled={!choiceDescription}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        as="textarea" rows={5}
                        placeholder={post.selectedPost.description || "Название поста"}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={updPost}>Добавить</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
})

export default UpdatePost;
