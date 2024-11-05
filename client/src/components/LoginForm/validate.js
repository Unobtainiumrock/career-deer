import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required('MissingEmailError')
    .email('InvalidCredentialsError'),
  password: Yup.string()
    .required('MissingPasswordError')
    .min(8, 'InvalidCredentialsError')
});
