import CarsService from "../Services/CarsService.js";
import store from "../store.js";

//Private
function _draw() {
  let cars = store.State.cars;
  let template = "";
  cars.forEach(car => (template += car.Template));
  document.getElementById("cars").innerHTML = template;
  console.log(cars);
}

//Public
export default class CarsController {
  constructor() {
    store.subscribe("cars", _draw);
  }

  async getCars() {
    try {
      await CarsService.getCars();
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
}
