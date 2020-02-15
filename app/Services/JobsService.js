import store from "../store.js";
import Job from "../Models/Job.js";

const _SANDBOX_URL = "https://bcw-sandbox.herokuapp.com/api/jobs/"
class JobsService {

  async getJobs() {
    let results = await fetch(_SANDBOX_URL);
    let data = await results.json();
    let jobs = data.data.map(j => new Job(j));
    jobs.reverse();
    store.commit("jobs", jobs);
  }
}

const jobsService = new JobsService();
export default jobsService;