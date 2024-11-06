import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

const RegisterForm = () => {

  const ValidationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters long')
      .max(20, 'Username is too long'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password is too long'),
    first_name: Yup.string()
      .required('First name is required')
      .max(30, 'First name is too long'),
    last_name: Yup.string()
      .required('Last name is required')
      .max(30, 'Last name is too long'),
    date_of_birth: Yup.date()
      .required('Date of birth is required')
      .typeError('Invalid date format (use YYYY-MM-DD)'),
    role: Yup.string()
      .required('Roles is required'),
  });

  const handleRegister = async (values, { resetForm }) => {
    const bodyRegisterUser = {
      username: values.username,
      email: values.email,
      password: values.password,
      first_name: values.first_name,
      last_name: values.last_name,
      date_of_birth: values.date_of_birth,
      role: values.role,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyRegisterUser),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User created successfully:', data.message);
        alert(data.message);
        resetForm();
      } else {
        const errorData = await response.json();
        console.error('Error creating user:', errorData.message);
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('A network error occurred. Please try again.');
    }
  };

  return (
    <div style={{ width: '100vw', overflowX: 'hidden' }}>
      <div className="create-user-container">
        <h2 className="create-user-title">Create a New User</h2>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            date_of_birth: '',
            role: '',
          }}
          validationSchema={ValidationSchema}
          onSubmit={handleRegister}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
            touched,
            errors
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
                {errors.username && touched.username && <div className="error-message">{errors.username}</div>}
              </div>

              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && <div className="error-message">{errors.email}</div>}
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && <div className="error-message">{errors.password}</div>}
              </div>

              <div className="input-group">
                <label htmlFor="first_name">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.first_name}
                />
                {errors.first_name && touched.first_name && <div className="error-message">{errors.first_name}</div>}
              </div>

              <div className="input-group">
                <label htmlFor="last_name">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.last_name}
                />
                {errors.last_name && touched.last_name && <div className="error-message">{errors.last_name}</div>}
              </div>

              <div className="input-group">
                <label htmlFor="date_of_birth">Date of Birth</label>
                <input
                  type="date"
                  name="date_of_birth"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.date_of_birth}
                />
                {errors.date_of_birth && touched.date_of_birth && <div className="error-message">{errors.date_of_birth}</div>}
              </div>

              <div className="input-group">
                <label htmlFor="role">Role</label>
                <select
                  name="role"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.role}
                >
                <option value="" label="Select role" />
                <option value="owner" label="Owner" />
                <option value="renter" label="Renter" />
                </select>
                {errors.role && touched.role && <div className="error-message">{errors.role}</div>}
              </div>

              <button
                type="submit"
                disabled={!isValid || !values.username || !values.password}
                className="create-user-button"
              >
                Register User
              </button>
            </form>
          )}
        </Formik>
        <a href='/login'>Have account? Log In</a>
      </div>
    </div>
  );
};

export default RegisterForm;
