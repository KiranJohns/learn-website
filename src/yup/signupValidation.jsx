import * as Yup from 'yup'

export const signupValidation= Yup.object({
    name: Yup.string().min(3).required('Please Enter name'),
    email: Yup.string().email("Please Enter valid email").required("Please Enter Email"),
    city: Yup.string().min(3).required('Please enter city'),
    country: Yup.string().min(3).required('Please enter country'),
    password: Yup.string().matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ).required("Please Enter Password"),
    cpassword: Yup.string().required("Please confirm your password").oneOf([Yup.ref("password")],"Password not match")
})


