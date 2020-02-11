module.exports = {
  Query: {
    getAllPhotoPost: async (_, args, { Photo }) => {
      const photoPosts = await Photo.find({}).sort({ createdDate: 'desc' });
      return photoPosts;
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
    }
  }
};
