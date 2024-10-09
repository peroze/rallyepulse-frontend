import api from "./api";
import axios from 'axios';

class PenaltyService {

    addPenalty(co_number,time){
        return api
        .put("/penalty/addPenalty",{
            co_number,
            time
        })
        .then(response => {

          return response.data;
        })
        .catch(error => {
            console.error("Error adding penalty:", error);
            throw error; // Rethrow the error to handle it in the caller
        });
    }

    getPenalty(id){
        return api
        .get("penalty/getPenalty/"+id)
        .then(response => {
          return response.data;
        });
    }

}

export default new PenaltyService() ;