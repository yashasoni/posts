import React, { Component } from 'react';
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

class UpdatePost extends Component {
    state = {
        loadedPost: null,
        title: this.props.location.state.formData.title,
        body: this.props.location.state.formData.body,
        author: 'Yasha'
    }
    
    postDataHandler = () => {
        const data = {
            title: this.props.location.state.formData.title,
            body: this.props.location.state.formData.body
        };
        axios.put('/posts/' + this.props.location.state.formData.id, data)
            .then(response => {
                console.log(response)
                toast.success("Successfully updated the post!", { position: toast.POSITION.TOP_CENTER, autoClose: 3000 });
                this.props.history.goBack()
            })
            .catch(err => {
                toast.error("Error occured while updating post!", { position: toast.POSITION.TOP_CENTER, autoClose: 3000 });
            })
    }
    render() {
        if(this.props.location && this.props.location.state) {console.log(this.props.location.state.formData)}
        let form = null;
        if (this.props.location && this.props.location.state) {
            form = (
                <div className="NewPost">

                    <h1>Update Post</h1>
                    <label>Title</label>
                    <input type="text"
                        value={this.state.title}
                        onChange={(event) => this.setState({ title: event.target.value })} />
                    <label>Content</label>
                    <textarea rows="4"
                        value={this.state.body}
                        onChange={(event) => this.setState({ body: event.target.value })} />
                    <label>Author</label>
                    <select value={this.state.author} onChange={(event) => this.setState({ author: event.target.value })}>
                        <option value="Yasha">Yasha</option>
                        <option value="Soni">Soni</option>
                    </select>
                    <button onClick={this.postDataHandler}>Update Post</button>
                </div>
            )
        }
        return (
            <div>
            {form}
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
        )
    }
}
export default UpdatePost;