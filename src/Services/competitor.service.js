import api from "./api";
import axios from 'axios';

class CompetitorService {

    getCompetitorById(id){
        return api
        .get("competitor/getCompetitor/id"+id)
        .then(response => {
          return response.data;
        });
    }

    getCompetitors(){
        return api
        .get("/competitor/getCompetitors")
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Error getting competitors:", error);
            throw error; // Rethrow the error to handle it in the caller
        });
    }
      
    addCompetitor(co_number,driver,codriver,email,telephone,vehicle,category,car_class){
        return api
        .post("/competitor",{
            co_number,
            driver,
            codriver,
            email,
            telephone,
            vehicle,
            category,
            car_class
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

export default new CompetitorService() ;