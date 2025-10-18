import * as functions from "firebase-functions";

// Dummy jobs fetched from "external portals"
const dummyJobs = [
    { title: "Angular Developer", company: "ICICI", location: "Thane" },
    { title: "Fullstack Developer", company: "TCS", location: "Mumbai" },
    { title: "Frontend Developer", company: "Infosys", location: "Pune" }
];

export const getJobs = functions.https.onRequest((req, res) => {
    const sanitizedJobs = dummyJobs.map((job) => ({
        title: job.title.trim(),
        company: job.company.trim(),
        location: job.location.trim()
    }));
    res.json(sanitizedJobs);
});
