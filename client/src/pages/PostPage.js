import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import {Carousel, Row, Col} from 'react-bootstrap';
import  {useParams} from 'react-router-dom'
import { fetchOnePost } from "../http/postAPI";

const PostPage = () => {
    const [post, setPost] = useState('')
    const { id } = useParams()

    const styles_description = {
        container: {
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
        },
      };

    const styles_img = {
        container: {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        }
    }

    useEffect(()=> {
        fetchOnePost(id).then(data => setPost(data))
    },[fetchOnePost])
    return(
        <Container className="mt-4 d-flex justify-content-center align-items-center" >
            <Col>
        <Row className="d-flex flex-column align-items-center">
        <Carousel style={{width: 700, height: 500}}>
            {post.img?.map(image => (
            <Carousel.Item
                key={post.img.indexOf(image)}
                style={{width: 700,height: 500, objectFit: 'contain', objectPosition: 'center'}}
                >
                   <div style={styles_img.container}>
                    <img
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    src={"http://localhost:5000/" + image}
                    alt=""
                /></div>
            </Carousel.Item>
            ))}
        </Carousel>
        </Row>
        <Row className="d-flex flex-column m-3 align-items-center">
            <div style={{width: 700}}>
                <h2 className="d-flex justify-content-center align-items-center">
                    {post.name}
                </h2>
                <div style={styles_description.container}>
                <p className="text-align-center" >
                    {post.description}
                </p>
                </div>
            </div>
        </Row>
        </Col>
        </Container>
    )
}

export default PostPage