import store from "../store.js";
import Job from "../Models/Job.js";

const _SANDBOX_URL = "https://bcw-sandbox.herokuapp.com/api/jobs/"
class JobsService {
  async updateJob(jobData) {
    let response = await fetch(_SANDBOX_URL + jobData._id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData)
    });

    let data = await response.json();
    let newJob = new Job(jobData);

    let i = store.State.jobs.findIndex(j => j._id = newJob._id);
    if (i != -1) {
      store.State.jobs.splice(i, 1, newJob);
      store.commit("jobs", store.State.jobs);
    }
  }

  async getJobs() {
    let results = await fetch(_SANDBOX_URL);
    let data = await results.json();
    let jobs = data.data.map(j => new Job(j));
    jobs.reverse();
    store.commit("jobs", jobs);
  }
  async createJob(jobData) {
    let response = await fetch(_SANDBOX_URL, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData)
    });

    let data = await response.json();
    let newJob = new Job(data.data);
    store.State.jobs.push(newJob);
    store.commit("jobs", store.State.jobs);
  }

  async deleteJob(id) {
    let response = await fetch(_SANDBOX_URL + id, {
      method: 'DELETE'
    });

    let index = store.State.jobs.findIndex(j => j._id == id);
    if (index != -1) {
      store.State.jobs.splice(index, 1);
      store.commit("jobs", store.State.jobs);
    }
  }
}


const jobsService = new JobsService();
export default jobsService;