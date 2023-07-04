import React, { useContext } from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import Blog from "../pages/Blog";
import { authRoutes, publicRoutes} from "../routes";
import { Context } from '../index'
import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {
    const { user } = useContext(Context)

    console.log(user)
    return (
        <Routes>
          <Route path="/" element={<Blog />} />
          {user.isAuth && authRoutes.map(({ path, element }) =>
            <Route key={path} path={path} element={element} exact />
    
          )}
          {publicRoutes.map(({ path, element }) =>
            <Route key={path} path={path} element={element} exact />
          )}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      );
});

export default AppRouter;