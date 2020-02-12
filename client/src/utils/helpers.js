export const validate = formValues => {
  const errors = {};

  if (!formValues.photo) {
    errors.photo = 'You must enter a photo';
  }

  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }

  if (!formValues.date) {
    errors.date = 'You must pick a date';
  }

  if (!formValues.photo_location) {
    errors.photo_location = 'You must select a location';
  }

  return errors;
};

export const listOfLocation = [
  'Barisal',
  'Chottogram',
  'Dhaka',
  'Khulna',
  'Mymensingh',
  'Rajshahi',
  'Rangpur',
  'Sylhet'
];
