import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';
import { connect } from 'react-redux';
import UpdatePost from '../UpdatePost/UpdatePost';
//import LikedPosts from '../LikedPosts/LikedPosts';
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {withRouter} from 'react-router-dom';



class FullPost extends Component {
    state = {
        loadedPost: null,
        formData: null,
        selectedPostId: null
    }
    componentDidMount() {
        if (this.props.match.params.id) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.match.params.id)) {
                axios.get('/posts/' + this.props.match.params.id)
                    .then(response => {
                        this.setState({
                            loadedPost: response.data

                        })
                    })
            }

        }
        
    }
    

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.match.params.id)
            .then(response => {
                console.log(response);
                toast.success("Post deleted", { position: toast.POSITION.TOP_CENTER, autoClose: 3000 });
            })
            .catch(err =>{
                toast.error("Action failed", { position: toast.POSITION.TOP_CENTER, autoClose: 3000 });
            })
    }
    postEditHandler = (id) => {
        this.props.history.push({pathname: '/update-post', state: {selectedPostId: id, formData: {
            id: this.props.match.params.id,
            title: this.state.loadedPost.title,
            body: this.state.loadedPost.body
        }}})
    }
    render() {
        console.log(this.props.data);
       
        
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        if (this.props.id) {
            post = <p style={{ textAlign: 'center' }}>Loading...</p>;
        }
        if (this.state.loadedPost) {
            let labelDislike =
            this.props.data && this.props.data[this.state.loadedPost.id] && this.props.data[this.state.loadedPost.id].dislike?
           'Disliked':"Dislike";
   
           let labelLike =
            this.props.data && this.props.data[this.state.loadedPost.id] && this.props.data[this.state.loadedPost.id].like? 'Liked':"Like";
   
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete Post</button>
                        <button 
                            className="Delete" 
                            onClick={()=>this.postEditHandler(this.props.match.params.id)}>
                            Update Post</button>
                        <div className="customContainer">
                            <button className="btn btn-primary" onClick={() => {
                                let data ={...this.props.data}
                                let json_data = {
                                    postId: this.props.match.params.id,
                                    like: true,
                                    dislike: false,
                                    title: this.state.loadedPost.title,
                                    body: this.state.loadedPost.body
                                }
                                data[this.state.loadedPost.id] = json_data;
                                this.props.onChangeHandle(data)
                            }
                            }>{labelLike}</button>
                            <button className="btn btn-primary" onClick={() => {
                                let data ={...this.props.data}
                                let json_data = {
                                    postId: this.props.match.params.id,
                                    like: false,
                                    dislike: true,
                                    title: this.state.loadedPost.title,
                                    body: this.state.loadedPost.body
                                }
                                data[this.state.loadedPost.id] = json_data;
                                this.props.onChangeHandle(data)
                                
                            }
                            }>{labelDislike}</button>
                        </div>
                    </div>
                </div>

            );
        }

        return (
            <div>
                {post}
               {this.state.formData ? <UpdatePost 
                    id={this.selectedPostId}
                    formData= {this.state.formData}/> : null}
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
const mapStateToProps = state => {
    return {
        data: state.data
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onChangeHandle: (data) => dispatch({ type: 'STATUSHANDLER', data: data }),

    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FullPost));