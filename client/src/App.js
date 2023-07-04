import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { Spinner } from "react-bootstrap";
import { check } from "./http/userAPI";
import { fetchThemes, fetchPosts } from "./http/postAPI";


const App = observer(() => {
  const { user } = useContext(Context)
  const { post } = useContext(Context)
  const [loading, setLoading] = useState(true)
  const [loadingPosts, setLoadingPosts] = useState(true)
  const [loadingThemes, setLoadingThemes] = useState(true)

  useEffect(() => {
    fetchPosts(null).then(data => post.setPosts(data.rows)).finally(() => setLoadingPosts(false))
  },[])

  useEffect(() => {
    fetchThemes().then(data => post.setThemes(data)).finally(() => setLoadingThemes(false))
  },[])

  useEffect(() => {
      check().then(data => {
          user.setUser(data)
          user.setIsAuth(true)
      }).finally(() => setLoading(false))

  }, [])

  if (loading || loadingPosts || loadingThemes) {return <Spinner animation={"grow"}/>}

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
})

export default App;
