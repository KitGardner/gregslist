import CarsService from "../Services/CarsService.js";
import store from "../store.js";

//Private

const CAR_FORM_TEMPLATE = `
    <h2>New Car Form</h2>
    <form id="car-form" onsubmit="app.carsController.createCar()">
    <input name="_id" type="text" class="d-none" disabled />
    <div class="form-group">
      <label for="Make">Make:</label>
      <input name="Make" type="text" class="form-control" />
    </div>
    <div class="form-group">
      <label for="Model">Model:</label>
      <input name="Model" type="text" class="form-control" />
    </div>
    <div class="form-group">
      <label for="Year">Year:</label>
      <input name="Year" type="text" class="form-control" />
    </div>
    <div class="form-group">
      <label for="Price">Price:</label>
      <input name="Price" type="text" class="form-control" />
    </div>
    <div class="form-group">
      <label for="Description">Description:</label>
      <textarea name="Description" type="text" class="form-control"></textarea>
    </div>
    <div class="form-group">
      <label for="ImageURL">Image URL:</label>
      <input name="ImageURL" type="text" class="form-control" />
    </div>
    <button type="submit">Submit</button>
  </form>`;

const ADD_CAR_BUTTON_TEMPLATE = `
  <button class="btn btn-primary" onclick="app.carsController.generateForm()">
    <i class="fa fa-plus"></i>
  </button>
`


function _draw() {
  let cars = store.State.cars;
  let template = "";
  cars.forEach(car => (template += car.Template));
  document.getElementById("items").innerHTML = template;
  console.log(cars);
}

function _drawCarForm() {
  document.getElementById("formContainer").innerHTML = CAR_FORM_TEMPLATE;
}

function _deleteForm() {
  document.getElementById("formContainer").innerHTML = "";
}

function _drawAddCarButton() {
  document.getElementById("addButton").innerHTML = ADD_CAR_BUTTON_TEMPLATE;
}

//Public
export default class CarsController {
  constructor() {
    store.subscribe("cars", _draw);
  }

  async getCars() {
    try {
      await CarsService.getCars();
      _deleteForm();
      _drawAddCarButton();
    } catch (error) {
      console.log(error);
    }
  }

  async createCar() {
    try {
      event.preventDefault();
      let form = event.target;
      let carData = {
        // @ts-ignore
        make: form.Make.value,
        // @ts-ignore
        model: form.Model.value,
        // @ts-ignore
        year: form.Year.value,
        // @ts-ignore
        price: form.Price.value,
        // @ts-ignore
        description: form.Description.value,
        // @ts-ignore
        imgUrl: form.ImageURL.value
      };

      // @ts-ignore
      let id = form._id.value;
      if (id) {
        carData._id = id;
        await CarsService.updateCar(carData);
      } else {
        await CarsService.createCar(carData);
      }
      // @ts-ignore
      form.reset();
    } catch (error) {
      console.log(error);
    }
  }
  async editCar(id) {
    let car = store.State.cars.find(c => c._id == id);
    await _drawCarForm();
    let form = document.getElementById("car-form");
    // @ts-ignore
    form.Make.value = car.make;
    // @ts-ignore
    form.Model.value = car.model;
    // @ts-ignore
    form.Year.value = car.year;
    // @ts-ignore
    form.Price.value = car.price;
    // @ts-ignore
    form.Description.value = car.description;
    // @ts-ignore
    form.ImageURL.value = car.imgUrl;
    // @ts-ignore
    form._id.value = car._id;
  }

  async updateCar() {
    try {
      // @ts-ignore
      await CarsService.editCar();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCar(id) {
    try {
      await CarsService.deleteCar(id);
    } catch (error) {
      console.log(error);
    }
  }

  generateForm() {
    _drawCarForm();
  }
}
