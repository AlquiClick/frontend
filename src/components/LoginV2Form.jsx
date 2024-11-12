import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import '../styles/loginV2.css';

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
        <div className="login-page-container">
            <div className="login-container">
                <div className="blue-banner"></div>
                <div className="login-image-placeholder">
                    <img src="your-image-url" alt="Placeholder" />
                </div>
                <h2 className="login-title">BIENVENIDO!</h2>
                <div className="title-underline"></div>
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
                                <InputText
                                    type="text"
                                    name="username"
                                    placeholder="Email Address"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.username}
                                    className={`p-inputtext ${errors.username && touched.username ? 'p-invalid' : ''}`}
                                />
                                {errors.username && touched.username && <div className="error-message">{errors.username}</div>}
                            </div>
                            <Password
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                toggleMask
                                feedback={false}
                                className="custom-password-input"
                            />
                                {errors.password && touched.password && <div className="error-message">{errors.password}</div>}
                            <Button
                                label="Sign In"
                                type="submit"
                                className="login-button"
                                disabled={values.username === '' || values.password === '' || !isValid}
                            />
                        </form>
                    )}
                </Formik>
                <div className="login-links">
                    <a href="/forgot-password">Forgot password?</a>
                    <a href="/register">Don't have an account? Register here</a>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
