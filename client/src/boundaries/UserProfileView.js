import { apiCall } from '../services/api';

class UserProfileView {
    async fetchUserProfileFromUserId(userId){
        try{
            const res = await apiCall("get", `/api/user-profiles/user-id/${userId}`);

            return res;
        } catch(err){
            throw err;
        }
    }
    
    async fetchUserProfile(profileId){
        try{
            const res = await apiCall("get", `/api/user-profiles/${profileId}`);

            return res;
        } catch(err){
            throw err;
        }
    }

    async fetchAllUserProfiles(){
        try{
            const res = await apiCall("get", `/api/user-profiles/`);

            return res;
        } catch(err){
            throw err;
        }
    }

    async updateUserProfile(profileData, profileId){
        try{
            const res = await apiCall("patch", `/api/user-profiles/${profileId}`, profileData);

            return res;
        } catch(err){
            throw err;
        }
    }

    async deleteUserProfile(profileId){
        try{
            const res = await apiCall("delete", `/api/user-profiles/${profileId}`);

            return res;
        } catch(err){
            throw err;
        }
    }
}

export default UserProfileView;