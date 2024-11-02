import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

const CreateUserForm = () => {

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
    role: Yup.string()
      .required('Role is required')
  });

  const handleRegister = async (values) => {
    console.log('la data que le enviamos al back para el usuario nuevo:', values);
  };

  return (
    <div className="create-user-container">
      <h2 className="create-user-title">Crea un usuariopa</h2>
      <Formik
        initialValues={{ username: '', email: '', password: '', role: '' }}
        validationSchema={ValidationSchema}
        onSubmit={handleRegister}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isValid, touched, errors }) => (
          <form onSubmit={handleSubmit} className="create-user-form">
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
              <label htmlFor="role">Role</label>
              <select
                name="role"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.role}
              >
                <option value="" label="Select role" />
                <option value="admin" label="Admin" />
                <option value="user" label="User" />
              </select>
              {errors.role && touched.role && <div className="error-message">{errors.role}</div>}
            </div>

            <button type="submit" className="create-user-button" disabled={!isValid}>
              Register User
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CreateUserForm;
