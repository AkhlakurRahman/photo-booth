import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { validate, listOfLocation } from '../../utils/helpers';

import './Upload.scss';

class Upload extends React.Component {
  handleChange = (event, input) => {
    event.preventDefault();
    const imageFile = event.target.files[0];
    input.onChange(imageFile);
  };

  renderErrorMessage = ({ error, touched }) => {
    if (error && touched) {
      return <div className='error-message'>{error}</div>;
    }
  };

  renderFileInput = ({ input, type, id, meta }) => {
    return (
      <>
        <input
          name={input.name}
          type={type}
          id={id}
          onChange={event => this.handleChange(event, input)}
        />
        {this.renderErrorMessage(meta)}
      </>
    );
  };

  renderInput = ({ input, type, id, inputLabel, placeholder, meta }) => {
    return (
      <div className='form-control'>
        <label htmlFor={id}>{inputLabel}</label>
        <input type={type} {...input} id={id} placeholder={placeholder} />
        {this.renderErrorMessage(meta)}
      </div>
    );
  };

  renderLocationSelect = ({ input, meta }) => {
    return (
      <>
        <select {...input}>
          <option value=''>Select a location...</option>
          {listOfLocation.map(val => (
            <option value={val} key={val}>
              {val}
            </option>
          ))}
        </select>
        {this.renderErrorMessage(meta)}
      </>
    );
  };

  onSubmit = formValues => {
    console.log(formValues);
  };

  render() {
    return (
      <div className='container upload'>
        <h3>Store one of your memories</h3>
        <form
          action=''
          className='form-wrapper'
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <div className='form-control'>
            <label htmlFor='photo'>Upload your photo</label>
            <Field
              type='file'
              name='photo'
              id='photo'
              component={this.renderFileInput}
            />
          </div>

          <Field
            type='text'
            name='title'
            id='title'
            inputLabel='Photo title'
            placeholder='Enter a photo title'
            component={this.renderInput}
          />

          <Field
            type='date'
            name='date'
            id='date'
            inputLabel='When the photo was taken?'
            component={this.renderInput}
          />

          <div className='form-control'>
            <label htmlFor='photo_location'>
              Where did you take the photo?
            </label>
            <Field
              name='photo_location'
              component={this.renderLocationSelect}
            />
          </div>

          <button type='submit'>Store</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'photoUpload',
  validate
})(Upload);
