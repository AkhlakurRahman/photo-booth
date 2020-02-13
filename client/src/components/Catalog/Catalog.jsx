import React from 'react';
import { Query, Mutation } from '@apollo/react-components';
import gql from 'graphql-tag';
import moment from 'moment';

import './Catalog.scss';

const GET_PHOTO_POSTS = gql`
  {
    getAllPhotoPost {
      _id
      photo
      title
      date
      photo_location
    }
  }
`;

const DELETE_PHOTO_POST_MUTATION = gql`
  mutation DELETE_PHOTO_POST_MUTATION($photoId: ID!) {
    deletePhotoPost(photoId: $photoId) {
      _id
    }
  }
`;

const Catalog = () => {
  return (
    <section className='container catalog'>
      <Query query={GET_PHOTO_POSTS}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return data.getAllPhotoPost.map(
            ({ _id, photo, title, date, photo_location }) => (
              <div key={_id} className='single-photo'>
                <div className='single-photo-item'>
                  <figure>
                    <img src={photo} alt={title} />
                    <figcaption>Location: {photo_location}</figcaption>
                    <Mutation
                      mutation={DELETE_PHOTO_POST_MUTATION}
                      variables={{ photoId: _id }}
                      refetchQueries={[{ query: GET_PHOTO_POSTS }]}
                    >
                      {(deletePhotoPost, { loading, error }) => (
                        <form
                          className='delete-form'
                          onSubmit={async e => {
                            e.preventDefault();
                            const confirmDeletePost = window.confirm(
                              'Are you sure?'
                            );
                            if (confirmDeletePost) {
                              await deletePhotoPost();
                            }
                          }}
                        >
                          <button type='submit'>
                            <i className='far fa-trash-alt'></i>
                          </button>
                        </form>
                      )}
                    </Mutation>
                  </figure>
                </div>
                <div className='single-photo-details'>
                  <p>{title}</p>
                  <p>{moment(parseInt(date)).format('MMM Do YY')}</p>
                </div>
              </div>
            )
          );
        }}
      </Query>
    </section>
  );
};

export default Catalog;
export { GET_PHOTO_POSTS };
