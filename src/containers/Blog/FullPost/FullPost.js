import React, { Component } from 'react';

import './FullPost.css';
import Axios from 'axios';

class FullPost extends Component {

    state = {
        loadedPost: null
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData () {
        console.log(this.props);
        if (this.props.match.params.id) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id)) {
                Axios.get('/posts/' + this.props.match.params.id).then(Response => {
                    console.log(Response)
                    this.setState({
                        loadedPost: Response.data
                    })
                })
            }
        }
    }

    deletePostHandler = () => {
        Axios.delete('/posts/' + this.props.match.params.id).then(Response => {
            console.log(Response);
        })
    }
    render() {
        const loadedPost = this.state.loadedPost
        let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
        if (this.props.match.params.id) {
            post = <p style={{ textAlign: "center" }}>Loading...</p>;
        }
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{loadedPost.title}</h1>
                    <p>{loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;