import { apiCall } from '../services/api';

class WorkslotView {
    
    async fetchWorkslots(){
        try{
            const res = await apiCall("get", `/api/workslots`);

            return res;
        } catch(err){
            throw err;
        }
    }

    async fetchWorkslot(workslotId){
        try{
            const res = await apiCall("get", `/api/workslots/${workslotId}`);

            return res;
        } catch(err){
            throw err;
        }
    }

    async createNewWorkslot(workslot){
        try{
            const res = await apiCall("post", `/api/workslots`, workslot);

            return res;
        } catch(err){
            throw err;
        }
    }

    async updateWorkslot(workslot, workslotId){
        try{
            const res = await apiCall("patch", `/api/workslots/${workslotId}`, workslot);

            return res;
        } catch(err){
            throw err;
        }
    }

    async deleteWorkslot(workslotId){
        try{
            const res = await apiCall("delete", `/api/workslots/${workslotId}`);

            return res;
        } catch(err){
            throw err;
        }
    }
}

export default WorkslotView;