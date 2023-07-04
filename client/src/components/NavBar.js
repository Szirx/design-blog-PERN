import React, { useContext } from "react";
import { Context } from "../index";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate} from "react-router-dom";
import { ADMIN_ROUTE, BLOG_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import {Button, NavbarBrand}  from "react-bootstrap";
import { observer } from "mobx-react-lite"
import Admin from "../pages/Admin";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }


    return (
        <Navbar bg="light" variant="light" style={{height: 60}}>
        <Container>
            <NavbarBrand style={{ color: "black", fontSize: 20 }} href={BLOG_ROUTE}><img
              alt=""
              src="../../quality_kontur.jpg"
              width="60"
              height="60"
              className="mx-4" 
            />Контур мебель</NavbarBrand>
            <Nav className="mx-auto">
                {user.isAuth ?<Admin/> : <></>}
            </Nav>
        {user.isAuth ?
                <Nav className="ml-auto" style={{color:'black'}}>
                    {/* <Button onClick={() => navigate(ADMIN_ROUTE)} variant={"outline-dark"}>Админ панель</Button> */}
                    <Button variant={"outline-dark"} className="mx-2" onClick={() => logOut()}>Выйти</Button>
                </Nav>
                :
                <Nav className="ml-auto" style={{color:'black'}}>
                    <Button variant={"outline-dark"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                </Nav>
        }
        </Container>
      </Navbar>
    )
})

export default NavBar