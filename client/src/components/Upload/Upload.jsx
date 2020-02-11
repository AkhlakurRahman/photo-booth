import React from 'react';
import { Form, reduxForm } from 'redux-form';

import './Upload.scss';

class Upload extends React.Component {
  render() {
    return (
      <div className='container upload'>
        <h3>Store one of your memories</h3>
        <form action='' className='form-wrapper'>
          <div className='form-control'>
            <label htmlFor='photo'>Upload your photo</label>
            <input
              type='file'
              name='photo'
              id='photo'
              className='custom-file-input'
            />
          </div>

          <div className='form-control'>
            <label htmlFor='title'>Photo title</label>
            <input
              type='text'
              name='title'
              id='title'
              placeholder='Enter a photo title'
            />
          </div>

          <div className='form-control'>
            <label htmlFor='date'>When the photo was taken?</label>
            <input type='date' name='date' id='date' />
          </div>

          <div className='form-control'>
            <label htmlFor='photo_location'>
              Where did you take the photo?
            </label>
            <input
              list='list_of_location'
              name='photo_location'
              id='photo_location'
              placeholder='Select where the photo was taken'
            />
            <datalist id='list_of_location'>
              <option value='Barisal' />
              <option value='Chottogram' />
              <option value='Dhaka' />
              <option value='Khulna' />
              <option value='Mymensingh' />
              <option value='Rajshahi' />
              <option value='Rangpur' />
              <option value='Sylhet' />
            </datalist>
          </div>

          <button type='submit'>Store</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'uploadPhoto'
})(Upload);
