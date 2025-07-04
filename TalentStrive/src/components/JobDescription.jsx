import { useEffect, useState } from "react";
import { Fetch, postData } from "../api/Fetch";

const JobDescription = ({ job, goBack, profileData, userType }) => {
    const [jobDescription, setJobDescription] = useState("");
    const [application, setApplication] = useState({
        user: {
            id: profileData?.id
        },
        jobPost: {
            id: job.id
        },
        status: "In-Consideration"
    });

    // Popup state for assessment link
    const [showAssessmentPopup, setShowAssessmentPopup] = useState(false);
    const [assessmentUrl, setAssessmentUrl] = useState("");

    if (!job) {
        return (
            <div className="text-center text-gray-400">
                <h2 className="text-xl font-bold">No Job Selected</h2>
                <p>Please select a job to view its details.</p>
            </div>
        );
    }

    const applyForJob = () => {
        postData("http://localhost:8080/user/job/apply", application);
        alert("Application submitted successfully!");
    };

    // Handler for sending assessment link with URL
    const sendAssessmentLink = async () => {
        try {
            await postData(`http://localhost:8080/employer/job/${job.id}/assessment`, { url: assessmentUrl });
            alert("Assessment link sent to all shortlisted candidates!");
            setShowAssessmentPopup(false);
            setAssessmentUrl("");
        } catch (error) {
            alert("Failed to send assessment link.");
        }
    };

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await Fetch(`http://localhost:8080/job/${job.id}/generate`);
                const data = response.data;
                const cleanedDescription = data
                    .join("\n")
                    .replace(/```json|```/g, "")
                    .replace(/\\/g, "")
                    .replace(/^{|}$/g, "");
                setJobDescription(cleanedDescription);
            } catch (error) {
                console.error("Error fetching job details:", error);
            }
        };
        fetchJobDetails();
    }, [job.id]);

    return (
        <div className="bg-gray-800 text-white shadow-lg rounded-lg p-8 w-full max-w-6xl mx-auto">
            {/* Top Bar */}
            <div className="flex justify-between items-start mb-4">
                <button
                    onClick={goBack}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Back to Available Jobs
                </button>
                <div className="flex gap-2">
                    {userType === "EMPLOYERS" && (
                        <button
                            onClick={() => setShowAssessmentPopup(true)}
                            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            Send Assessment Link
                        </button>
                    )}
                    {userType === "USERS" && (
                        <button
                            onClick={applyForJob}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2"
                        >
                            Easy Apply
                        </button>
                    )}
                </div>
            </div>

            {/* Assessment Link Popup */}
            {showAssessmentPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
                    <div className="bg-gray-900 rounded-lg shadow-lg p-8 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4 text-white">Send Assessment Link</h2>
                        <label className="block text-gray-300 mb-2">Assessment URL</label>
                        <input
                            type="url"
                            value={assessmentUrl}
                            onChange={e => setAssessmentUrl(e.target.value)}
                            placeholder="https://your-assessment-link.com"
                            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowAssessmentPopup(false)}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={sendAssessmentLink}
                                disabled={!assessmentUrl}
                                className={`bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded ${!assessmentUrl ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}

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