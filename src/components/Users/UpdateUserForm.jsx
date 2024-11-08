import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

const UpdateUserForm = ({ onClose }) => {

  const ValidationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters long')
      .max(20, 'Username is too long'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password is too long')
      .nullable(),
  });

  const handleUpdate = async (values) => {
    let user_id = localStorage.getItem('user_id') ?? '';

    const bodyUpdateUser = {
      username: values.username,
      email: values.email,
      password: values.password,
      user_id: user_id,
    };
    console.log('valores para actualizar:', bodyUpdateUser);

    try {
      const response = await fetch('http://127.0.0.1:5000/user-update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyUpdateUser),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User update successfully:', data.message);
        alert(data.message);
        // resetForm();
      } else {
        const errorData = await response.json();
        console.error('Error update user:', errorData.message);
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('A network error occurred. Please try again.');
    }
  };

  return (
    <div className="update-user-container">
      <h2 className="update-user-title">actualiza el usuarioe</h2>
      <Formik
        initialValues={{
        //   username: user?.username || '',
          username: '',
        //   email: user?.email || '',
          email: '',
          password: '',
        }}
        validationSchema={ValidationSchema}
        onSubmit={handleUpdate}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isValid, touched, errors }) => (
          <form onSubmit={handleSubmit} className="update-user-form">
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
            <button type="submit" className="update-user-button" disabled={!isValid}>
              Update User
            </button>
          </form>
        )}
      </Formik>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default UpdateUserForm;
