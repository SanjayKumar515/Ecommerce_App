import * as Yup from 'yup';

const SignInValidationSchema = Yup.object().shape({
  password: Yup.string().required('Please enter password'),
  loginid: Yup.string().required('Please enter employee Id'),
});


const SignUpValidationSchema = Yup.object().shape({
  name: Yup.string().required('Please enter name'),
  email: Yup.string().required('Please enter email'),
  password: Yup.string().required('Please enter password'),
});

const DownloadSalarySlipValidationSchema = Yup.object().shape({
  month: Yup.string().required('Please Select Month'),
  year: Yup.string().required('Please Select Year'),
});
const LeaveRequestValidationSchema = Yup.object().shape({
  leaveReportingTo: Yup.string().required('Please enter reporting to'),
  leaveType: Yup.string().required('Please select leave type'),
  leaveFromDate: Yup.string().required('Please select from date'),
  leaveToDate: Yup.string().required('Please Select to date'),
  leaveContactNumber: Yup.string()
    .matches(
      /^(\+?\d{1,4}[\s\-]?)?(\(?\d{3}\)?[\s\-]?)?[\d\s\-]{7,10}$/,
      'Please enter a valid contact number',
    )
    .required('Please enter a contact number'),
  //laeveRecommendEmp: Yup.string().required('Please enter recommend employee'),
  leaveReason: Yup.string().required('Please enter leave reason'),
  leaveAddress: Yup.string().required('Please enter leave address'),
});

const LeaveResponseValidationSchema = Yup.object().shape({
  leaveStatus: Yup.string().required('Please select leave status'),
  comment: Yup.string().required('Please enter leave comment'),
});

const ChangePasswordValidationSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Please enter Old Password'),
  newPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Please enter new password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your new password'),
});

export {
  SignInValidationSchema,
  SignUpValidationSchema,
  DownloadSalarySlipValidationSchema,
  LeaveRequestValidationSchema,
  LeaveResponseValidationSchema,
  ChangePasswordValidationSchema,
};
