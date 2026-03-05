import Header from "../components/Header";
import Layout from "../components/Layout";
import LoginForm from "../components/Login";
import RegisterForm from "../components/Register";
import UserInfo from "../components/UserInfo";
import UserList from "../components/UserList";
import { clearToken, getToken } from '../services/authService';

export default function AdminPage() {

    const token = getToken()
    if(!token) {
        console.log("No token found, user is not logged in.");
        clearToken();
    } else {
        console.log("Token found, user is logged in.");
    }


    return (
        <Layout>
            <Header/>
         
            
        {token ? (
        <div>
            <UserInfo/>
            <RegisterForm/>
            <UserList/>
        </div>
        ) : (
        <LoginForm/>
        )}

            
        </Layout>
    );
}