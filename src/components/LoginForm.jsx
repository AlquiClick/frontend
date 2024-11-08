import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import '../styles/login.css';

const LoginForm = () => {
    const navigate = useNavigate();

    const onLoginUser = async (values) => {
        const credentials = btoa(`${values.username}:${values.password}`);
        const response = await fetch('http://127.0.0.1:5000/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${credentials}`,
            },
            body: JSON.stringify({})
        });

        if (!response.ok) {
            console.log("Error en la solicitud");
            return;
        }

        const data = await response.json();
        localStorage.setItem('token', JSON.stringify(data.token));
        localStorage.setItem('username', values.username);
        localStorage.setItem('user_id', data.user_id);

        navigate('/');
    };

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Pone el contraseño simio 🐒')
            .min(3, 'contraseña más larga'),
        username: Yup.string()
            .min(5, 'Nombre más largo')
            .max(25, 'Nombre más corto')
            .required('Pone el nombre mono 🐒')
    });

    return (
        <div style={{ width: '100vw', overflowX: 'hidden' }}>
            <div className="create-user-container">
                <h2 className="create-user-title">Login</h2>
                <Formik
                    initialValues={{ password: '', username: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => onLoginUser(values)}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isValid
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
                                {errors.username && touched.username && errors.username}
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
                                {errors.password && touched.password && errors.password}
                            </div>
                            <button
                                className="create-user-button"
                                type="submit"
                                disabled={
                                    values.username === '' || values.password === '' || !isValid
                                }
                            >
                                Sign In
                            </button>
                        </form>
                    )}
                </Formik>
                <a href="/register">Don't have an account? Register</a>
            </div>
        </div>
    );
};

export default LoginForm;
