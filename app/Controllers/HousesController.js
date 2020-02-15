import store from "../store.js";
import housesService from "../Services/HousesService.js";

function _drawHouses() {
  let houses = store.State.houses;
  let template = "";
  houses.forEach(house => (template += house.Template));
  document.getElementById("items").innerHTML = template;
  console.log(houses);
}

export default class HousesController {
  constructor() {
    store.subscribe("houses", _drawHouses);
  }

  async getHouses() {
    try {
      await housesService.getHouses();
    } catch (error) {
      console.log(error);
    }
  }
}