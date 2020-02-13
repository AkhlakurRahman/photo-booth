import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { Mutation } from '@apollo/react-components';
import gql from 'graphql-tag';
import axios from 'axios';

import { validate, listOfLocation } from '../../utils/helpers';

import './Upload.scss';
import { GET_PHOTO_POSTS } from '../Catalog/Catalog';

const CREATE_PHOTO_POST_MUTATION = gql`
  mutation CREATE_PHOTO_POST_MUTATION(
    $photo: String!
    $title: String!
    $date: String!
    $photo_location: String!
  ) {
    createPhotoPost(
      photo: $photo
      title: $title
      date: $date
      photo_location: $photo_location
    ) {
      photo
      title
      date
      photo_location
    }
  }
`;

class Upload extends React.Component {
  state = {
    photo: '',
    title: '',
    date: '',
    photo_location: ''
  };

  handleFileChange = async (event, input) => {
    event.preventDefault();
    const imageFile = event.target.files[0];
    input.onChange(imageFile);
    const data = new FormData();
    data.append('file', imageFile);
    data.append('upload_preset', 'photobooth');
    const res = await axios({
      url: 'https://api.cloudinary.com/v1_1/dtxgfwoej/image/upload',
      method: 'post',
      data
    });

    this.setState({ photo: res.data.eager[0].secure_url });
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
          onChange={event => this.handleFileChange(event, input)}
        />
        {this.renderErrorMessage(meta)}
      </>
    );
  };

  handleChange = (event, input) => {
    event.preventDefault();
    const { name, value } = event.target;
    input.onChange(value);
    this.setState({ [name]: value });
  };

  renderInput = ({ input, type, id, inputLabel, placeholder, meta }) => {
    return (
      <div className='form-control'>
        <label htmlFor={id}>{inputLabel}</label>
        <input
          type={type}
          {...input}
          id={id}
          placeholder={placeholder}
          onChange={event => this.handleChange(event, input)}
        />
        {this.renderErrorMessage(meta)}
      </div>
    );
  };

  renderLocationSelect = ({ input, meta }) => {
    return (
      <>
        <select {...input} onChange={event => this.handleChange(event, input)}>
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

  render() {
    return (
      <Mutation
        mutation={CREATE_PHOTO_POST_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: GET_PHOTO_POSTS }]}
      >
        {(createPhotoPost, { loading, error }) => (
          <div className='container upload'>
            <h3>Store one of your memories</h3>
            <form
              action=''
              className='form-wrapper'
              onSubmit={this.props.handleSubmit(async (_, dispatch) => {
                await createPhotoPost();
                dispatch(reset('photoUpload'));
                this.props.history.push('/catalog');
              })}
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

              <button type='submit' disabled={!this.props.valid}>
                Store
              </button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default reduxForm({
  form: 'photoUpload',
  validate
})(Upload);
