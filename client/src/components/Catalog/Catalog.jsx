import React from 'react';
import { Query } from '@apollo/react-components';
import { gql } from 'apollo-boost';

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

const Catalog = () => {
  return (
    <section className='catalog container'>
      <Query query={GET_PHOTO_POSTS}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return data.getAllPhotoPost.map(
            ({ _id, title, date, photo_location }) => (
              <div key={_id}>
                <p>{title}</p>
                <p>{date}</p>
                <p>{photo_location}</p>
              </div>
            )
          );
        }}
      </Query>
    </section>
  );
};

export default Catalog;
