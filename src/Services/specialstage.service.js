import api from "./api";
import axios from 'axios';

class SpecialStageService {

    getSpecialStageById(id){
        return api
        .get("specialstage/ss/id"+id)
        .then(response => {
          return response.data;
        });
    }

    getSpecialStage(){
        return api
        .get("/specialstage/getspecialstages")
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Error getting special stages:", error);
            throw error; // Rethrow the error to handle it in the caller
        });
    } 

    addSpecialStage(id,name,distance){
        return api
        .post("/specialstage",{
            id,
            name,
            distance
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

export default new SpecialStageService() ;