import store from "../store.js";
import housesService from "../Services/HousesService.js";

const HOUSE_FORM_TEMPLATE = `
    <h2>New House Form</h2>
    <form id="house-form" onsubmit="app.housesController.createHouse()">
      <input name="_id" type="text" class="d-none" disabled />
      <div class="form-group">
        <label for="bedrooms">Bedrooms:</label>
        <input name="bedrooms" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <label for="bathrooms">Bathrooms:</label>
        <input name="bathrooms" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <label for="levels">Levels:</label>
        <input name="levels" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <label for="year">Year:</label>
        <input name="year" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <label for="price">Price:</label>
        <input name="price" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea name="description" type="text" class="form-control"></textarea>
      </div>
      <div class="form-group">
        <label for="imageURL">Image URL:</label>
        <input name="imageURL" type="text" class="form-control" />
      </div>
      <button type="submit">Submit</button>
    </form>
`;

const ADD_HOUSE_BUTTON_TEMPLATE = `
  <button class="btn btn-primary" onclick="app.housesController.generateForm()">
    <i class="fa fa-plus"></i>
  </button>
`

function _drawHouses() {
  let houses = store.State.houses;
  let template = "";
  houses.forEach(house => (template += house.Template));
  document.getElementById("items").innerHTML = template;
  console.log(houses);
}

function _drawHouseForm() {
  document.getElementById("formContainer").innerHTML = HOUSE_FORM_TEMPLATE;
}

function _deleteForm() {
  document.getElementById("formContainer").innerHTML = "";
}

function _drawAddButton() {
  document.getElementById("addButton").innerHTML = ADD_HOUSE_BUTTON_TEMPLATE;
}

export default class HousesController {
  constructor() {
    store.subscribe("houses", _drawHouses);
  }

  async getHouses() {
    try {
      await housesService.getHouses();
      _deleteForm();
      _drawAddButton();
    } catch (error) {
      console.log(error);
    }
  }

  async createHouse() {
    try {
      event.preventDefault();
      let form = event.target;
      let houseData = {
        bedrooms: form.bedrooms.value,
        bathrooms: form.bathrooms.value,
        levels: form.levels.value,
        year: form.year.value,
        price: form.price.value,
        description: form.description.value,
        imgUrl: form.imageURL.value
      };

      let id = form._id.value;
      if (id) {
        houseData._id = id;
        await housesService.updateHouse(houseData);
      } else {
        await housesService.createHouse(houseData);
      }
      _deleteForm();
    } catch (error) {
      console.log(error);
    }
  }

  async editHouse(id) {
    let house = store.State.houses.find(h => h._id == id);
    await _drawHouseForm();
    let form = document.getElementById("house-form");
    form.bedrooms.value = house.bedrooms;
    form.bathrooms.value = house.bathrooms;
    form.levels.value = house.levels;
    form.year.value = house.year;
    form.price.value = house.price;
    form.description.value = house.description;
    form.imageURL.value = house.imgUrl;
    form._id.value = house._id;
  }

  async deleteHouse(id) {
    try {
      await housesService.deleteHouse(id);
    } catch (error) {
      console.log(error);
    }
  }

  generateForm() {
    _drawHouseForm();
  }
}