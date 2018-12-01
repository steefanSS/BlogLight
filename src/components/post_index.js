import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchPosts} from "../actions";
import  _ from'lodash';

class PostIndex extends Component{
    //one time loading procedure or fetch data after component showed on the screen
    componentDidMount(){
        this.props.fetchPosts();
    }

    //objects don't have built in map like arrays do. Instead
    //we will us lodash mapping function
    renderPosts (){
        return _.map(this.props.posts, post => {
            return (
                <li
                    key={post.id}
                    className= "list-group-item">
                    <Link to= {`/posts/${post.id}`}>
                        {post.title}</Link>
                </li>
            )
        });
    }

    render(){
        return(
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/posts/new">
                        Add a Post
                    </Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {posts: state.posts};
}

//we are not passing mapStateProps and we are going to pass action creator
//inside of an object (fetchPost: fetchPost) or using ES6 => fetchPost
export default connect(mapStateToProps,{fetchPosts}) (PostIndex);