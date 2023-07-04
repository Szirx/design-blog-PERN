import React, { useContext, useState, useEffect } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap"
import { deletePost, fetchPosts } from "../../http/postAPI"
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import { Spinner } from "react-bootstrap"

const DeletePost = observer(({show, onHide}) => {
    const {post} = useContext(Context)

const delPost = () => {
    deletePost(post.selectedPost.id).then(data => onHide())
    fetchPosts().then(data => post.setPosts(data.rows))
}

const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        fetchPosts(null).then(data => post.setPosts(data.rows)).finally(() => setLoading(false))
      },[])

      if (loading) {return <Spinner animation={"grow"}/>}

return (
    <Modal
        show={show}
        onHide={onHide}
        size="lg" centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить пост
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>{post.selectedPost.name || "Выберите пост"}</Dropdown.Toggle>
                    <Dropdown.Menu>
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={delPost}>удалить</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
)
})

export default DeletePost;