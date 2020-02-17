import House from "../Models/House.js";
import store from "../store.js";

const _SANDBOX_URL = "https://bcw-sandbox.herokuapp.com/api/houses/"

class HousesService {
  async updateHouse(houseData) {
    let response = await fetch(_SANDBOX_URL + houseData._id, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(houseData)
    });

    let data = await response.json();
    let newHouse = new House(houseData);

    let i = store.State.houses.findIndex(h => h._id == newHouse._id);
    if (i != -1) {
      store.State.houses.splice(i, 1, newHouse);
      store.commit("houses", store.State.houses);
    }
  }
  async createHouse(houseData) {
    let response = await fetch(_SANDBOX_URL, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(houseData)
    });

    let data = await response.json();
    let newHouse = new House(data.data);
    store.State.houses.push(newHouse);
    store.commit("houses", store.State.houses);
  }

  async deleteHouse(id) {
    let response = await fetch(_SANDBOX_URL + id, {
      method: 'DELETE'
    });

    let index = store.State.houses.findIndex(h => h._id == id);
    if (index != -1) {
      store.State.houses.splice(index, 1);
      store.commit("houses", store.State.houses);
    }
  }

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