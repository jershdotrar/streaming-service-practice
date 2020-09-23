import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';

export class StreamCreate extends Component {
  // we want to make a controlled input field
  // writing <input /> like this, we attach all the key:values from .input onto <input />
  // if <Field /> doesn't recognize a key it gets passed to its component's props, which can be destructured 
  renderInput = ({ input, label, meta }) => {
    // conditionally set the className so SemanticUI adjusts the input colors to red
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`; 
    // only want to display error msg if the field is empty after being touched
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </div>
    );
  };

  // if there's a validation error, show this error message under its input
  renderError({ error, touched }) {
    if(touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    };
  };

  // onSubmit passed into form's handleSubmit
  onSubmit = (fValues) => {
    this.props.createStream(fValues);
  };

  // <Field/> doesn't understand what to show, need to pass something into its component tag
  // redux-form includes handleSubmit that takes onSubmit callback; auto-prevents default behavior
  // form needs className "error" to actually display the error when using SemanticUI
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field name="description" component={this.renderInput} label="Enter Description" />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
};


// Validation handling: redux-form looks for validate's returned object
// if empty, no errors || errors matched to corresponding <Field />'s name
const validate = (fValues) => {
  const errors = {};
  // errors if nothing has been entered in the <Field /> named 'title'
  if(!fValues.title) {
    errors.title = 'Please enter a title';
  }
  // errors if nothing has been entered in the <Field /> named 'description'
  if(!fValues.description) {
    errors.description = 'Please enter a description';
  }

  return errors;
}
 
// connecting redux-form with redux's connect
// could also turn reduxForm({...})(StreamCreate) into a const & pass after connect
export default connect(null, { createStream })(reduxForm({ form: 'streamCreate', validate })(StreamCreate));