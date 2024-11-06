import { Formik, Field, ErrorMessage, validateYupSchema } from "formik"
import * as Yup from "yup"
import '../styles/login.css';

const LoginForm = () => {
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
    
        if(!response.ok) {
            console.log("Error en la solicitud");
        }

        const data = await response.json();
        localStorage.setItem('token', JSON.stringify(data.token))
        localStorage.setItem('username', values.username)
    }    

    const validationSchema = Yup.object().shape({
        password:Yup.string()
        .required('Pone el contraseño simio 🐒')
        .min(3, 'contraseña mas largo'),
        username:Yup.string()
        .min(5, 'Nombre mas largo')
        .max(25, 'Nombre mas corto')
        .required('Pone el nombre mono 🐒')
    })

    return (
        <div style={{ width: '100vw', overflowX: 'hidden' }}>
            <div className="create-user-container">
            <h2 className="create-user-title">Login</h2>
                <Formik
                    initialValues={{password: '', username: ''}}
                    validationSchema={validationSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        isValid
                    }) => (
                        <form>
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
                                <label htmlFor="username">Password</label>
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
                                type="button"
                                onClick={() => onLoginUser(values)}
                                disabled={
                                    values.username === '' || values.password === '' || !isValid
                                }
                            >
                                Sig In
                            </button>
                        </form>
                    )}
                </Formik>
                <a href="/register">Don't have account? Register</a>
            </div>
        </div>
    )
};

export default LoginForm;
