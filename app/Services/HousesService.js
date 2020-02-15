import House from "../Models/House.js";
import store from "../store.js";

const _SANDBOX_URL = "https://bcw-sandbox.herokuapp.com/api/houses/"

class HousesService {

  async getHouses() {
    let results = await fetch(_SANDBOX_URL);
    let data = await results.json();
    let houses = data.data.map(h => new House(h));
    houses.reverse();
    store.commit("houses", houses);
  }
}

const housesService = new HousesService();
export default housesService;