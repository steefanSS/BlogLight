import React, {Component} from 'react';
import {Field,reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from'../actions';

class PostNew extends Component{

    //this methods will render Title,Tags field
    //calling this method will be handled by Field component at some point, we don't call it ourselves
    //however we need to somehow to wire it to Field component.
    //and handles and display user errors
    renderField(field){
        const {meta: {touched,error}}=field;

        const className = `form-group ${touched &&  error ? 'has-danger':''}`;
        return(
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input} //this equal to onChange={field.input.onChange),onFocus={field.input.onFocus),onBlur={field.input.onBlur)
                />
                <div className="text-help">
                    {touched ? error:''}
                </div>
            </div>
        )
    }

    onSubmit(values){
        //this === component
        //callback is needed here because we only want to return to list of posts, after new post was created
        this.props.createPost(values, () => {
            this.props.history.push("/");
        });
    }

    render(){
        const {handleSubmit} = this.props;

        return(
           <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
               <Field
                   name="title"
                   label="Title"
                   component={this.renderField}
               />
               <Field
                    name="categories"
                    label="Categories"
                    component={this.renderField}
               />
               <Field
                   name="content"
                   label="PostContent"
                   component={this.renderField}
               />

               <button type="submit" className="btn btn-primary">Submit</button>
               <Link to="/" className="btn btn-danger">Cancel</Link>
           </form>
        )
    }
}

//purpose of this function is to validate user input
function validate(values) {
    const errors={};

    //validate inputs from 'values'
    if (!values.title ){
        errors.title="Enter a Title!";
    }
    if (!values.categories){
        errors.categories="Enter some categories"
    }
    if (!values.content){
        errors.content="Enter some content"
    }
    //if errors is empty to form is fine to submit, if not form is invalid
    return errors;
}

export default reduxForm({
    validate,
    form:'PostsNewForm'
})(
    connect (null,{createPost})(PostNew)
);