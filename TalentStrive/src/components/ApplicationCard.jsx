import { fetchPdf } from "../api/Fetch";
import React, { useState } from "react";
export const ApplicationCard = (props) => {
    const [resumeData, setResume] = useState(null);
    const application = props.data;
    const usertype = props.usertype; // Get the usertype prop
    const [resumeExists, setResumeExists] = useState(!!resumeData);
    const deleteApplication = () => {
        console.log("Deleting application:", application);
        alert(`Application with ID ${application.id} has been deleted.`);
    };

    const updateStatus = () => {
        console.log("Updating status for application:", application);
        alert(`Status for application with ID ${application.id} has been updated.`);
    };

    const redirectToPDF = () => {
        if (resumeExists) {
            window.open(resumeData, "_blank");
        }
    };

    const fetchUserResume = async (userID) => {
        let response = await fetchPdf(`http://localhost:8080/employer/applicant/${userID}/resume`);
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        const blobUrl = URL.createObjectURL(pdfBlob);
        setResume(blobUrl);
        redirectToPDF();
    }


    return (
        <div
            key={application.id}
            className="relative flex flex-col my-6 bg-gray-800 shadow-lg border border-gray-700 text-white rounded-lg w-96 hover:shadow-xl transition-shadow duration-300"
        >
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-700">
                <span className="text-sm font-medium text-gray-400">
                    ID: {application.id} | Job Post ID: {application.jobPostId}
                </span>
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
                <h5 className="text-xl font-bold text-white">{application.title}</h5>
                <p className="text-gray-400">
                    <span className="font-semibold text-gray-300">Applicant Name:</span> {application.applicantName}
                </p>
                <p className="text-gray-400">
                    <span className="font-semibold text-gray-300">Employer ID:</span> {application.employerId}
                </p>
                <p className="text-gray-400">
                    <span className="font-semibold text-gray-300">User ID:</span> {application.userId}
                </p>
                <p className="text-gray-400">
                    <span className="font-semibold text-gray-300">Status:</span>{" "}
                    <span
                        className={`${application.status === "In-Consideration"
                            ? "text-yellow-400"
                            : "text-red-500"
                            }`}
                    >
                        {application.status}
                    </span>
                </p>
                {application.userId && <button
                    onClick={() => fetchUserResume(application.userId)}
                    disabled={!resumeExists}
                    className={`${resumeExists
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-600 cursor-not-allowed"
                        } text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                    View Resume
                </button>}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-gray-700 flex justify-between items-center">
                {usertype === "EMPLOYER" ? (
                    <button
                        onClick={updateStatus}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-transform transform hover:scale-105"
                    >
                        Update Status
                    </button>
                ) : (
                    <button
                        onClick={deleteApplication}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-transform transform hover:scale-105"
                    >
                        Delete Application
                    </button>
                )}
            </div>
        </div>
    );
};