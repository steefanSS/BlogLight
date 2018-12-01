import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {fetchPost,deletePost} from "../actions";

class PostShow extends Component{
    componentDidMount(){
        //match is provided by react-router, params list all wild cards that exist inside url
        //if network usage is concern we make sure that we don't double fetch post. Only if it doesn't exist
        if (!this.props.post) {
            const {id} = this.props.match.params;
            this.props.fetchPost(id);
        }
    }

    onDeleteClick(){
        const {id}=this.props.match.params;
        this.props.deletePost(id , ()=>{
            this.props.history.push('/');
        });
    }

    render(){
        //showing "post" props from mapStateToProps function
        const {post}= this.props; // this.props.post

        //we wait for post to load first before we display it
        if(!post){
            return <div>Loading ...</div>
        }

        return(
            <div>
                <Link to="/">Back To Index </Link>
                <button className="btn btn-danger pull-xs-right"
                        onClick={this.onDeleteClick.bind(this)}>
                    Delete Post
                </button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        )
    }
}
//first argument is application state, second argument is a props that is headed or going to PostShow
//this way instead of returning entire list of posts we only return one we care about
function mapStateToProps({posts},ownProps) {
    return {post: posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchPost, deletePost}) (PostShow);