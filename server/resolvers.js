module.exports = {
  Query: {
    getAllPhotoPost: async (_, args, { Photo }) => {
      return await Photo.find({}).sort({ createdDate: 'desc' });
    }
  },

  Mutation: {
    createPhotoPost: async (_, args, { Photo }) => {
      const { photo, title, date, photo_location } = args;

      const newPhotoPost = await new Photo({
        photo,
        title,
        date,
        photo_location
      }).save();

      return newPhotoPost;
    },

    deletePhotoPost: async (_, { photoId }, { Photo }) => {
      return await Photo.findOneAndRemove({ _id: photoId });
    }
  }
};
