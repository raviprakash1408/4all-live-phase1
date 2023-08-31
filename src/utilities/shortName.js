const shortNameCreator = (firstName, lastName) => {
  try {
    if (firstName && lastName) {
      return firstName[0].toUpperCase() + lastName[0].toUpperCase();
    } else {
      return firstName[0].toUpperCase();
    }
  } catch (error) {
    return "";
  }
};

export { shortNameCreator };
