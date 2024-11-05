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
                    <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                    />
                    {errors.username && touched.username && errors.username}
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                    {errors.password && touched.password && errors.password}
                    <button
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
    )
};

export default LoginForm;
