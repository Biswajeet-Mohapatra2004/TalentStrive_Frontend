import { useState } from "react";
import { deleteData } from "../api/Fetch";

const UserProfile = (props) => {
    const profile = props.profileData;
    const skill = props.skillData;
    const application = props.applicationData;
    const resume = props.resumeData;

    const [resumeExists, setResumeExists] = useState(!!resume); // Track if the resume exists
    const [resumeStatus, setResumeStatus] = useState(
        resume ? "You have uploaded a resume" : "You don't have a resume uploaded yet"
    );

    const redirectToPDF = () => {
        if (resumeExists) {
            window.open(resume, "_blank");
        }
    };

    const removeResume = async () => {
        try {
            const response = await deleteData("http://localhost:8080/user/resume/delete");
            if (response.status === 200) {
                alert("Resume removed successfully!");
                setResumeExists(false); // Update state to indicate no resume exists
                setResumeStatus("You don't have a resume uploaded yet");
            } else {
                alert("Failed to remove resume. Please try again.");
            }
        } catch (error) {
            console.error("Error removing resume:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <>
            <div className="flex flex-row items-start justify-around mt-10 mb-20">
                {/* Profile and Resume Section */}
                <div className="flex flex-col gap-y-8 w-full max-w-lg">
                    {/* Profile Section */}
                    <div className="bg-gray-800 text-white shadow-lg rounded-lg p-8">
                        <h2 className="text-3xl font-bold text-center mb-6">User Profile</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-400">Name:</span>
                                <span className="text-lg">{profile.name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-400">Username:</span>
                                <span className="text-lg">{profile.username}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-400">Role:</span>
                                <span className="text-lg">{profile.role}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-400">Jobs Applied:</span>
                                <span className="text-lg">
                                    {application.length === 0
                                        ? "No applications yet"
                                        : application.length}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Resume Section */}
                    <div className="bg-gray-800 text-white shadow-lg rounded-lg p-8">
                        <h3 className="text-2xl font-bold text-center mb-4">Resume</h3>
                        {resumeExists ? (
                            <div className="flex flex-col items-center">
                                <h2 className="text-amber-50 text-center text-lg mb-4">
                                    {resumeStatus}
                                </h2>
                                <div className="flex gap-4">
                                    <button
                                        onClick={redirectToPDF}
                                        disabled={!resumeExists} // Disable if no resume exists
                                        className={`${resumeExists
                                                ? "bg-blue-600 hover:bg-blue-700"
                                                : "bg-gray-600 cursor-not-allowed"
                                            } text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    >
                                        View Resume
                                    </button>
                                    <button
                                        onClick={removeResume}
                                        disabled={!resumeExists} // Disable if no resume exists
                                        className={`${resumeExists
                                                ? "bg-red-600 hover:bg-red-700"
                                                : "bg-gray-600 cursor-not-allowed"
                                            } text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500`}
                                    >
                                        Remove Resume
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <h2 className="text-amber-50 text-center text-lg">
                                {resumeStatus}
                            </h2>
                        )}
                    </div>
                </div>

                {/* Skills Section */}
                <div className="bg-gray-800 text-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                    <h3 className="text-2xl font-bold text-center mb-4">Skills</h3>
                    {skill.length === 0 ? (
                        <h2 className="text-center text-gray-400">
                            Upload a resume to extract skills.
                        </h2>
                    ) : (
                        <ul className="flex flex-wrap gap-2">
                            {skill.map((value, key) => (
                                <li
                                    key={key}
                                    className={`px-3 py-1 rounded-lg ${value.includes("*")
                                            ? "bg-red-500 text-white"
                                            : "bg-gray-700 text-gray-300"
                                        }`}
                                >
                                    {value.replace("*", "").trim()}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
};

export default UserProfile;