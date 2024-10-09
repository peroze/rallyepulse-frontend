import api from "./api";
import axios from 'axios';

class TimeKeepingService {

    getStageClassification(id){
        return api
        .get("time/getStageClassification/"+id)
        .then(response => {
          return response.data;
        });
    }

    getOverallClassification(){
        return api
        .get("time/getOverallClassification")
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Error getting classifications:", error);
            throw error; // Rethrow the error to handle it in the caller
        });
    } 

    getOverallClassificationByClass(id){
        return api
        .get("time/getOverallClassificationByClass/"+id)
        .then(response => {
          return response.data;
        });
    }

    getOverallClassificationByCategory(id){
        return api
        .get("time/getOverallClassificationByCategory/"+id)
        .then(response => {
          return response.data;
        });
    }

    getOverallByStage(id){
        return api
        .get("time/getOverallByStage/"+id)
        .then(response => {
          return response.data;
        });
    }

    start(co_number,stage,hour,minute,second,nano,decimal){
        return api
        .post("/time",{
            co_number,
            stage,
            hour,
            minute,
            second,
            nano,
            decimal
        })
        .then(response => {

          return response.data;
        })
        .catch(error => {
            console.error("Error adding booking:", error);
            throw error; // Rethrow the error to handle it in the caller
        });
    }

    finish(co_number,stage,hour,minute,second,nano,decimal){
        return api
        .put("/time",{
            co_number,
            stage,
            hour,
            minute,
            second,
            nano,
            decimal
        })
        .then(response => {

          return response.data;
        })
        .catch(error => {
            console.error("Error adding booking:", error);
            throw error; // Rethrow the error to handle it in the caller
        });
    }


    

}

export default new TimeKeepingService() ;