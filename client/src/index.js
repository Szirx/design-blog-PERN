import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserBlog from './blog/UserBlog';
import PostBLog from './blog/PostBlog';
import SortBlog from './blog/SortBlog';

export const Context = createContext(null)
console.log('http://localhost:5000/')

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value={{
      user: new UserBlog(),
      post: new PostBLog(),
      sort: new SortBlog(),
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);