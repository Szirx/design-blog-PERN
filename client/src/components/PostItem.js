import React from "react";
import {Col, Button, Card} from 'react-bootstrap'
import CardGroup from 'react-bootstrap/CardGroup';
import {useNavigate} from "react-router-dom";
import { POST_ROUTE } from "../utils/consts";


const PostItem = ({post}) => {
    let navigate = useNavigate()
    const text = post.description.slice(0,100).concat('...')

    return (
        <Col md={5} className="mt-3 " onClick={() => navigate(POST_ROUTE + '/' + post.id)}>
            <CardGroup>
            <Card style={{ width: 370, height: 600 }}>
            <Card.Img variant="top" src={"http://localhost:5000/" + post.img[0]} height={"370"}/>
            <Card.Body style={{flexGrow: 1}}>
                <Card.Title>{post.name}</Card.Title>
                <Card.Text>
                    {text}
                </Card.Text>
            </Card.Body>
            <Button variant="secondary" style={{alignSelf: 'flex-end', position: 'absolute', bottom: 10, left: 10 }}>Читать</Button>
            </Card>
            </CardGroup>
        </Col>
    )
}

export default PostItem;