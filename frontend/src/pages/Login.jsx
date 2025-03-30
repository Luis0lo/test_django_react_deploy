import LoginRegisterForm from "../components/LoginRegisterForm";

const Login = () => {
    return <LoginRegisterForm route="/api/token/" method="login" />
};

export default Login;