import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

const LoginForm = () => {

  const ValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password is too long'),
  });

  const handleLogin = async (values) => {
    console.log("estos datos vanpala api:", values);
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={ValidationSchema}
        onSubmit={handleLogin}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isValid, touched, errors }) => (
          <form onSubmit={handleSubmit} className="login-form">
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

            <button type="submit" className="login-button" disabled={!isValid}>
              Sign In
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
