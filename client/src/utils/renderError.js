export const renderError = (errorMessage) => {
    if (errorMessage) {
      switch (errorMessage) {
        case 'MissingFirstNameError':
          return 'You must enter a first name.';
        case 'MissingLastNameError':
          return 'You must enter a last name.';
        case 'MissingEmailError':
          return 'You must enter an email.';
        case 'MissingPasswordError':
          return 'You must enter a password.';
        case 'UserExistsError':
          return 'An account with that email already exists. Please choose another email.';
        case 'InvalidCredentialsError':
          return 'Incorrect email or password.';
        case 'InternalServerError':
          return 'An unexpected error occurred. Please try again later.';
        default:
          return 'An unexpected error occurred.';
      }
    }
    return ''; // Return an empty string if no error.
  };
  