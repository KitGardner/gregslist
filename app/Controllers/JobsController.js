import store from "../store.js";
import jobsService from "../Services/JobsService.js";

const JOB_FORM_TEMPLATE = `
    <h2>New Job Form</h2>
    <form id="job-form" onsubmit="app.jobsController.createJob()">
      <input name="_id" type="text" class="d-none" disabled />
      <div class="form-group">
        <label for="company">Company:</label>
        <input name="company" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <label for="jobTitle">Job Title:</label>
        <input name="jobTitle" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <label for="rate">Rate:</label>
        <input name="rate" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <label for="hours">Hours:</label>
        <input name="hours" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea name="description" type="text" class="form-control"></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
`;

const ADD_JOB_BUTTON_TEMPLATE = `
  <button class="btn btn-primary" onclick="app.jobsController.generateForm()">
    <i class="fa fa-plus"></i>
  </button>
`;

function _drawJobs() {
  let jobs = store.State.jobs;
  let template = "";
  jobs.forEach(job => (template += job.Template));
  document.getElementById("items").innerHTML = template;
  console.log(jobs);
}

function _drawJobForm() {
  document.getElementById("formContainer").innerHTML = JOB_FORM_TEMPLATE;
}

function _deleteForm() {
  document.getElementById("formContainer").innerHTML = "";
}

function _drawAddJobButton() {
  document.getElementById("addButton").innerHTML = ADD_JOB_BUTTON_TEMPLATE;
}

export default class JobsController {
  constructor() {
    store.subscribe("jobs", _drawJobs);
  }

  async getJobs() {
    try {
      await jobsService.getJobs();
      _deleteForm();
      _drawAddJobButton();
    } catch (error) {
      console.log(error);
    }
  }
  async createJob() {
    try {
      event.preventDefault();
      let form = event.target;
      let jobData = {
        company: form.company.value,
        jobTitle: form.jobTitle.value,
        rate: form.rate.value,
        hours: form.hours.value,
        description: form.description.value
      };

      let id = form._id.value;
      if (id) {
        jobData._id = id;
        await jobsService.updateJob(jobData);
      } else {
        await jobsService.createJob(jobData);
      }
      _deleteForm();
    } catch (error) {
      console.log(error);
    }
  }

  async editJob(id) {
    let job = store.State.jobs.find(j => j._id == id);
    await _drawJobForm();
    let form = document.getElementById("job-form");

    form.company.value = job.company;
    form.jobTitle.value = job.jobTitle;
    form.rate.value = job.rate;
    form.hours.value = job.hours;
    form.description.value = job.description;
    form._id.value = id;
  }

  async deleteJob(id) {
    try {
      await jobsService.deleteJob(id);
    } catch (error) {
      console.log(error);
    }
  }

  generateForm() {
    _drawJobForm();
  }
}