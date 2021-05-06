import React, { Component } from 'react';
//import axios from 'axios';
import './LikedPosts.css';
import DisplayPost from '../DisplayPost/DisplayPost';
import Post from '../../../components/Post/Post';
import {connect} from 'react-redux';


class LikedPosts extends Component {
    state={
        posts: [],
        selectedPostId: null,
        title: null,
        body: null
    }   
    
    postSelectedHandler = (id, title, body) => {
        this.setState({
            selectedPostId: id,
            title: title,
            body: body
        })  
    }
    render(){
        let headTitle = this.props.data? 'Click to view full post' : null;
        let posts = <p style={{textAlign: 'center'}}>You haven't liked any post</p>
        if(this.props.data){
            posts= Object.keys(this.props.data).map(post=>{
                if(this.props.data[post].like){ 
                    return (             
                        <Post
                            key={this.props.data[post].postId}
                            title={this.props.data[post].title}
                            author= {'Yasha'} 
                            clicked= {() => this.postSelectedHandler(this.props.data[post].postId, this.props.data[post].title, this.props.data[post].body)}/>  
                    )
                }
            })
            
        }
        return(
            <div>
                <center>{headTitle}</center>
                <section className="LikedPosts">
                    {posts}
                </section>
                <DisplayPost 
                    id={this.state.selectedPostId}
                    title={this.state.title}
                    body={this.state.body}/>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return{
        data: state.data
    }
}

export default connect(mapStateToProps)(LikedPosts);