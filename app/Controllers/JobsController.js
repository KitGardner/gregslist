import store from "../store.js";
import jobsService from "../Services/JobsService.js";

function _drawJobs() {
  let jobs = store.State.jobs;
  let template = "";
  jobs.forEach(job => (template += job.Template));
  document.getElementById("items").innerHTML = template;
  console.log(jobs);
}

export default class JobsController {
  constructor() {
    store.subscribe("jobs", _drawJobs);
  }

  async getJobs() {
    try {
      await jobsService.getJobs();
    } catch (error) {
      console.log(error);
    }
  }
}