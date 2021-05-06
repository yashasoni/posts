import React, { Component } from 'react';
import Post from '../../../components/Post/Post';
import './Posts.css';
import axios from '../../../axios';
//import {Route} from 'react-router-dom';

 import {Link} from 'react-router-dom';
class Posts extends Component {
    state={
        posts: [],
        selectedPostId: null,
        loading: false
    }
    componentDidMount(){
        axios.get('/posts')
        .then(response => {
            const posts= response.data.slice(0, 8);
            const updatedPosts =posts.map(post=> {
                return {
                    ...post,
                    author: 'Yasha'
                }
            })
            this.setState({posts: updatedPosts, loading: true})
            //console.log(response);
        })
        .catch(error => {
            //this.setState({error: true})
            console.log(error);
        })
    }
    postSelectedHandler = (id) => {
        //this.setState({selectedPostId: id})
        //this.props.history.push('/'+id)
    }
    render(){
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>
        let postsTitle = !this.state.loading ? 'Loading...' : 'Select a post'
        if(!this.state.error){
            posts= this.state.posts.map(post => {
                return (
                    <Link to={'/posts/'+post.id} key={post.id}>
                        <Post  
                            
                            title={post.title}
                            author= {post.author} 
                            clicked= {() => this.postSelectedHandler(post.id)}/>
                    </Link>
                )
            })
        }
        return(
            <div>
                <center>{postsTitle}</center>
                <section className="Posts">
                    {posts}
                </section>
                
            </div>
        )
    }
}
export default Posts;