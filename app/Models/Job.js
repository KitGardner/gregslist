export default class Job {
  constructor(data) {
    this._id = data._id,
      this.company = data.company,
      this.jobTitle = data.jobTitle,
      this.rate = data.rate,
      this.hours = data.hours,
      this.description = data.description
  }

  get Template() {
    return `
      <div class="col-12 col-md-4 col-lg-3">
        <div class="card">
            <div class="card-body">
                <div class="card-title">${this.company} is looking for a ${this.jobTitle} baths</div>
                <div class="card-subtitle">The rate is ${this.rate}</div>
                <div class="card-subtitle">For ${this.hours} hours</div>
                <p class="card-text">${this.description}</p>
            </div>
            <button class="btn btn-info" onclick="app.jobsController.editJob('${this._id}')">Edit</button>
            <button class="btn btn-danger" onclick="app.jobsController.deleteJob('${this._id}')">Delete</button>
        </div>
     </div>
    `;
  }
}