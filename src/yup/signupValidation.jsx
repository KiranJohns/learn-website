import * as Yup from 'yup'

export const signupValidation = Yup.object({
  username: Yup.string().min(3, 'Atleast 3 characters')
  .max(30, 'Name cannot be more than 30 characters').matches(/^(?!\s).+(?<!\s)$/gm, "No space allowed at begining or end of name").required('Please Enter name'),
 
  email: Yup.string().email("Please Enter valid email").required("Please Enter Email"),
  
  city: Yup.string().min(3).required('Please enter city'),

  country: Yup.string().min(3).required('Please enter country'),

  password: Yup.string().matches(
    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    "Password must contain at least 8 characters, one uppercase, one number and one special case character"
  ).required("Please Enter Password"),

 

  terms:Yup.bool().required('Please accept'),

})


// terms:Yup.bool().oneOf([false], 'Please accept'),

// type: Yup.string().min(3).required('Please enter type'),