import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchThemes, fetchPosts } from '../http/postAPI';

import ThemeBar from '../components/ThemeBar';
import PostList from '../components/PostList';
import SortPost from '../components/SortPosts';
import SearchPosts from '../components/SearchPost';


const Blog = observer(() => {
    const {post} = useContext(Context)
    const [loadingPosts, setLoadingPosts] = useState(true)
    const [loading, setLoading] = useState(true)
    const [loadingThemes, setLoadingThemes] = useState(true)



    useEffect(() => {
        fetchThemes().then(data => post.setThemes(data)).finally(() => setLoadingThemes(false))
        fetchPosts(null).then(data => post.setPosts(data.rows)).finally(() => setLoadingPosts(false))
    },[])


    useEffect(() => {
        fetchPosts(post.selectedTheme.id).then(data => post.setPosts(data.rows)).finally(() => setLoadingPosts(false))
    }, [post.selectedTheme])

    if(loadingPosts || loadingPosts || loadingThemes) {return <Spinner animation={"grow"}/> }
    

    return (
        <Container>
            <Row className='mt-4'>
                <Col md={3}>
                    <SearchPosts/>
                    <ThemeBar/>
                    <SortPost/>
                </Col>
                <Col md={9}>
                    <PostList/>
                </Col>
            </Row>
        </Container>
    )
});

export default Blog