import './Login.scss';
import logo from "../../assets/images/Logo.png";
import { useUser } from "../../hooks/user/userHook";
import { Loading } from "../../components/common/loading/loading";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FormikProps, useFormik } from "formik";

interface LoginFormModel {
  username: string,
  password: string
}

function LoginPage() {
  
  const { login, loading, error } = useUser()
  const navigate = useNavigate();

  const formik: FormikProps<LoginFormModel> = useFormik<LoginFormModel>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required().email(),
      password: Yup.string().required(),
    }),
    onSubmit: async (values, { resetForm }) => {
      await handleSubmit(values)
      resetForm();
    }
  });

  const handleSubmit = (async (form: LoginFormModel) => {
    await login({ username: form.username, password: form.password })
    navigate('/')
  });

  return (
    <>
    { loading &&
      <>
      <Loading/>
      </>
    }
    <div className="Login_MainContainer">
      <div className="Login_CardContainer">
        <div className="Login_Logo">
          <img src={logo} alt="logo"/>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-floating">
            <input 
            type="email" 
            id="username"
            name="username"         
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            className="form-control" 
            placeholder="name@example.com"  
            />
            <label>Username</label>
            {
              formik.touched.username && formik.errors.username &&
                  <span className="app_font_error">{formik.errors.username}</span>
            }
          </div>
          <div className="form-floating">
            <input 
            type="password"
            id="password"
            name="password"  
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="form-control" 
            placeholder="****"
            />
          <label>Password</label>
          {
              formik.touched.password && formik.errors.password && 
              <span className="app_font_error">{formik.errors.password}</span>
            }
          </div>
          <div className="Login_ActionContainer">
              <button 
              disabled={!formik.dirty || !formik.isValid} 
              className="btn btn-primary w-100" 
              type="submit">
                  Login
              </button>
          </div>
        </form>
        {
          error &&
          <>
            <div className="Login_ErrorContainer">
              <p className="app_font_error">
                Error!, try it again
              </p>
            </div>
          </>
        }

      </div>
    </div>
    </>
  );
}

  export default LoginPage
  