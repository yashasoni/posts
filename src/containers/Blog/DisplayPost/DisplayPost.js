import React, { Component } from 'react';

import './DisplayPost.css';

//import LikedPosts from '../LikedPosts/LikedPosts';


class DisplayPost extends Component {
    
    render() {
       let post = null;
        if (this.props.id) {
            post = <p style={{ textAlign: 'center' }}>Loading...</p>;
        }
        if (this.props.id) {
            post = (
                <div className="DisplayPost">
                    <h1>{this.props.title}</h1>
                    <p>{this.props.body}</p>
                    
                </div>

            );
        }

        return (
            <div>
                {post}
                
            </div>

        )
    }
}

export default DisplayPost;