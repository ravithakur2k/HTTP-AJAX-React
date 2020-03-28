import React, { Component } from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
import { Route } from 'react-router-dom';
import FullPost from '../FullPost/FullPost';
// import { Link } from 'react-router-dom';

class Posts extends Component {

    state = {
        posts: []
    }

    postSelectedHandler = (id) => {
        this.props.history.push({ pathname: '/posts/' + id })
        //    this.props.history.push('posts/'+id);
    }

    componentDidMount() {
        console.log(this.props);
        axios.get('/posts').then(response => {
            const posts = response.data.slice(0, 4);
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: 'Ravi'
                }
            })
            this.setState({
                posts: updatedPosts
            })
            // console.log(response);
        }).catch(error => {
            console.log("Error:", error);
            // this.setState({ error: true })
        })
    }
    render() {
        // let posts = <p style={{ alignContent: 'center' }}>Something went Wrong</p>
        let posts = this.state.posts.map(post => {
            return (
                // <Link key={post.id} to={'posts/' + post.id} >
                <Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)} ></Post>
                // </Link>
            )
        })
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id' } exact component={FullPost} />
            </div>

        )
    }
}

export default Posts;