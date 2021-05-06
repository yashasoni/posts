import React, { Component } from 'react';
import {Route, NavLink, Switch} from 'react-router-dom';
import Posts from '../Blog/Posts/Posts';
import NewPost from '../Blog/NewPost/NewPost';
import LikedPosts from '../Blog/LikedPosts/LikedPosts';
import DislikedPosts from '../Blog/DislikedPosts/DislikedPosts';
import './Blog.css';
import UpdatePost from '../Blog/UpdatePost/UpdatePost';
import FullPost from './FullPost/FullPost';
//import axios from 'axios';



class Blog extends Component {
    
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/posts/" exact>Home</NavLink></li>
                            <li><NavLink to="/new-post">New Post</NavLink></li>
                            <li><NavLink to="/liked-post">Liked Posts</NavLink></li>
                            <li><NavLink to="/disliked-post">Disliked Posts</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>   
                    <Route path="/posts/" exact component={Posts} /> 
                    <Route path="/new-post" component={NewPost} />
                    <Route path="/posts/:id" component={FullPost}/>
                    <Route path="/liked-post" component={LikedPosts} />
                    <Route path="/disliked-post" component={DislikedPosts} />
                    <Route path="/update-post" component={UpdatePost} />
                    <Route render={()=><h1>Not Found</h1>} />
                </Switch>
            </div>
        );
    }
}

export default Blog;