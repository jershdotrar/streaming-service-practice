import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

export class StreamCreate extends Component {
  // we want to make a controlled input field
  renderInput(formProps) {
    return <input onChange={formProps.input.onChange} value={formProps.input.value} />
  }

  // <Field/> doesn't understand what to show, need to pass something into its component tag
  render() {
    return (
      <form>
        <Field name="title" component={this.renderInput} />
        <Field name="description" component={this.renderInput} />
      </form>
    );
  }
}

// connecting redux-form
export default reduxForm({
  form: 'streamCreate'
})(StreamCreate);
