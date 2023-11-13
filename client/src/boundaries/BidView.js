import { apiCall } from '../services/api';

class BidView {
    
    async fetchBidFromStaffId(staffId){
        try{
            const res = await apiCall("get", `/api/bids/cafe-staff-id/${staffId}`);

            return res;
        } catch(err){
            throw err;
        }
    }

    async fetchBid(bidId){
        try{
            const res = await apiCall("get", `/api/bids/${bidId}`);

            return res;
        } catch(err){
            throw err;
        }
    }

    async fetchAllBids(){
        try{
            const res = await apiCall("get", `/api/bids/`);

            return res;
        } catch(err){
            throw err;
        }
    }

    async createBid(bidData){
        try{
            const res = await apiCall("post", `/api/bids`, bidData);

            return res;
        } catch(err){
            throw err;
        }
    }

    async updateBid(bidData, bidId){
        try{
            const res = await apiCall("patch", `/api/bids/${bidId}`, bidData);

            return res;
        } catch(err){
            throw err;
        }
    }

    async deleteBid(bidId){
        try{
            const res = await apiCall("delete", `/api/bids/${bidId}`);

            return res;
        } catch(err){
            throw err;
        }
    }
}

export default BidView;