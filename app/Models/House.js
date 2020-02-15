export default class House {
  constructor(data) {
    this._id = data._id,
      this.bedrooms = data.bedrooms,
      this.bathrooms = data.bathrooms,
      this.imgUrl = data.imgUrl,
      this.levels = data.levels,
      this.year = data.year,
      this.price = data.price,
      this.description = data.description
  }

  get Template() {
    return `
    <div class="col-12 col-md-4 col-lg-3">
        <div class="card">
            <img src="${this.imgUrl}" class="card-img-top" alt="a car image">
            <div class="card-body">
                <div class="card-title">${this.bedrooms} bedroom : ${this.bathrooms} baths</div>
                <div class="card-subtitle">Levels: ${this.levels}</div>
                <div class="card-subtitle">Price: $${this.price}</div>
                <p class="card-text">${this.description}</p>
            </div>
            <button class="btn btn-info" onclick="app.carsController.editCar('${this._id}')">Edit</button>
            <button class="btn btn-danger" onclick="app.carsController.deleteCar('${this._id}')">Delete</button>
        </div>
     </div>
    `;
  }
}