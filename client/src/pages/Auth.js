import React, {useState, useContext} from "react";
import { Button, Card, Container, Form, FormControl } from "react-bootstrap";
import { observer } from 'mobx-react-lite';
import { Context } from "../index";
import { LOGIN_ROUTE, BLOG_ROUTE } from "../utils/consts";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {login, registration} from '../http/userAPI'

const Auth = observer(() => {

    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    user.setIsAuth(false)
    console.log(user.user.IsAuth)

    const click = async () => {
        let data
        try{
          if (isLogin) {
            data = await login(email, password);
          }
          else {
            data = await registration(email, password);
          }

          user.setUser(data)
          user.setIsAuth(true)
          navigate(BLOG_ROUTE)

        } catch(e){
          alert(e.response.data.message)
      }
    }
    return (
        <Container className="d-flex justify-content-center align-items-center"
        style={{height: window.innerHeight - 54}}>
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">Авторизация</h2>
                <Form className="d-flex flex-column">
                    <FormControl
                        className="mt-3"
                        placeholder="Введите ваш email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
                    <FormControl
                        className="mt-3"
                        placeholder="Введите ваш пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        />
                    <Button variant="outline-dark" className="mt-3" onClick={click}>
                        Войти
                    </Button>

                </Form>
            </Card>

        </Container>
    )
})

export default Auth