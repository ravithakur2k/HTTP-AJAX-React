import React, { Component } from 'react';

import './FullPost.css';
import Axios from 'axios';

class FullPost extends Component {

    state = {
        loadedPost: null
    }

    componentDidUpdate() {
        if (this.props.id) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
                Axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id).then(Response => {
                    console.log(Response)
                    this.setState({
                        loadedPost: Response.data
                    })
                })
            }
        }
    }
    render() {
        const loadedPost = this.state.loadedPost
        let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
        if (this.props.id) {
            post = <p style={{ textAlign: "center" }}>Loading...</p>;
        }
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{loadedPost.title}</h1>
                    <p>{loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete">Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;