import { apiCall, setTokenHeader} from '../services/api';

class AuthView {
    
    async login(userData){
        try{
            const res = await apiCall("post", `/api/auth/login`, userData);

            localStorage.setItem("jwtToken", res.data.token);
            setTokenHeader(res.data.token);

            return res;
        } catch(err){
            throw err;
        }
    }

    async register(userData){
        try{
            const res = await apiCall("post", `/api/auth/register`, userData);

            localStorage.setItem("jwtToken", res.data.token);
            setTokenHeader(res.data.token);

            return res;
        } catch(err){
            throw err;
        }
    }

    logout(){
        localStorage.clear();
        setTokenHeader(null);

        console.log("view logout called");
    }
}

export default AuthView;