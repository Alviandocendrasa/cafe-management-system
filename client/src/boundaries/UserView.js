import { apiCall } from '../services/api';

class UserView {
    async fetchUser(userId){
        try{
            const res = await apiCall("get", `/api/users/${userId}`);

            return res;
        } catch(err){
            throw err;
        }
    }

    async fetchAllUsers(){
        try{
            const res = await apiCall("get", `/api/users/`);

            return res;
        } catch(err){
            throw err;
        }
    }

    async createUser(userData){
        try{
            const res = await apiCall("post", `/api/users/`, userData);

            return res;
        } catch(err){
            throw err;
        }
    }

    async updateUser(userData, userId){
        try{
            const res = await apiCall("patch", `/api/users/${userId}`, userData);

            return res;
        } catch(err){
            throw err;
        }
    }

    async deleteUser(userId){
        try{
            const res = await apiCall("delete", `/api/users/${userId}`);

            return res;
        } catch(err){
            throw err;
        }
    }
}

export default UserView;