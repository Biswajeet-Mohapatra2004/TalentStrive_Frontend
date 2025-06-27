import { use, useEffect, useState } from "react";
import { Fetch, postData } from "../api/Fetch";

const JobDescription = ({ job, goBack, profileData, userType }) => {
    const [jobDescription, setJobDescription] = useState(""); // State to store the job description
    const [application, setApplication] = useState({
        user: {
            id: profileData.id
        },
        jobPost: {
            id: job.id
        },
        status: "In-Consideration"
    });
    if (!job) {
        return (
            <div className="text-center text-gray-400">
                <h2 className="text-xl font-bold">No Job Selected</h2>
                <p>Please select a job to view its details.</p>
            </div>
        );
    }
    const applyForJob = () => {
        console.log("Application data:", application);
        postData("http://localhost:8080/user/job/apply", application);
        alert("Application submitted successfully!");
    }

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await Fetch(`http://localhost:8080/job/${job.id}/generate`);
                const data = response.data; // Assuming response.data contains the array
                const cleanedDescription = data
                    .join("\n") // Join array elements with line breaks
                    .replace(/```json|```/g, "") // Remove Markdown code block syntax
                    .replace(/\\/g, "") // Remove backslashes
                    .replace(/^{|}$/g, ""); // Remove curly braces at the start and end
                setJobDescription(cleanedDescription); // Set the cleaned description
            } catch (error) {
                console.error("Error fetching job details:", error);
            }
        };
        fetchJobDetails();

    }, [job.id]); // Fetch job details when the job ID changes

    return (
        <div className="bg-gray-800 text-white shadow-lg rounded-lg p-8 w-full max-w-6xl mx-auto">
            {/* Back Button */}
            <div className="flex justify-between mb-4">
                <button
                    onClick={goBack}
                    className="mb-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Back to Available Jobs
                </button>
                {userType === "USERS" ? <button
                    onClick={applyForJob}
                    className="mb-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Easy Apply
                </button> : null}
            </div>

            <h2 className="text-3xl font-bold mb-4">{job.title}</h2>
            <p className="text-gray-400 mb-2">
                <span className="font-semibold text-gray-300">Company:</span> {job.company}
            </p>
            <p className="text-gray-400 mb-2">
                <span className="font-semibold text-gray-300">Location:</span> {job.location}
            </p>
            <p className="text-gray-400 mb-2">
                <span className="font-semibold text-gray-300">Category:</span> {job.category}
            </p>
            <p className="text-gray-400 mb-2">
                <span className="font-semibold text-gray-300">Job Type:</span> {job.jobType}
            </p>
            <p className="text-gray-400 mb-2">
                <span className="font-semibold text-gray-300">Status:</span>{" "}
                <span
                    className={`${job.status === "active" ? "text-green-400" : "text-red-500"}`}
                >
                    {job.status}
                </span>
            </p>
            <div className="mt-6 overflow-y-auto max-h-[70vh]">
                <h3 className="text-2xl font-bold mb-4">Job Description</h3>
                {jobDescription ? (
                    <pre className="text-gray-400 whitespace-pre-wrap">{jobDescription}</pre>
                ) : (
                    <p className="text-gray-400">Loading job description...</p>
                )}
            </div>
        </div>
    );
};

export default JobDescription;