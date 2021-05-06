import React, { Component } from 'react';
import axios  from 'axios';
import {Redirect} from 'react-router-dom';
import './NewPost.css';
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Yasha',
        submitted: false
    }
    postDataHandler = () =>{
        const data={
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        };
        axios.post('/posts', data)
        .then(response => {
            console.log(response)
            this.props.history.replace('/posts')    //replaces and redirects to the new page
            toast.success("Post added successfully", { position: toast.POSITION.TOP_CENTER, autoClose: 3000 });

        })
        .catch(err => {
            toast.error("Error occured while a post!", { position: toast.POSITION.TOP_CENTER, autoClose: 3000 });

        })
    }

    render () {
        let redirect=null;
        if(this.state.submitted){
            redirect= <Redirect to="/posts" />
        }
        return (
            <div className="NewPost">
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Yasha">Yasha</option>
                    <option value="Soni">Soni</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
                <ToastContainer
                position = "top-center"
                autoClose = { 5000}
                hideProgressBar = { false}
                newestOnTop = { false}
                closeOnClick
                rtl = { false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            </div>
        );
    }
}

export default NewPost;