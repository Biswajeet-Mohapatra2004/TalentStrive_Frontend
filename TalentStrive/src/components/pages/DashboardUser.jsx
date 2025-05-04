import { useState, useEffect } from "react";
import { Fetch, fetchPdf, postFile } from "../../api/Fetch";
import { JobCard } from "../Jobcard";
import { useRef } from "react";
import { ApplicationCard } from "../ApplicationCard";
import { UpdateUserProfile } from "../UpdateUser";
import { UpdateUserPassword } from "../UpdatePassword";

function DashboardUser() {
    let [jobs, setJobs] = useState([]);
    let [application, setApplication] = useState([{}]);
    let [resume, setResume] = useState("");
    let [currentSection, setCurrentSection] = useState("Available Jobs");
    let [profile, setProfile] = useState({
        id: null,
        name: "",
        role: "",
        username: ""
    })

    let [skill, setSkill] = useState([]);

    const url = 'http://localhost:8080/jobs/viewAll';
    const postFormRef = useRef(null);
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await Fetch(url);
                setJobs(response.data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };
        fetchJobs();

        const fetchApplications = async () => {
            try {
                const Applications = await Fetch("http://localhost:8080/user/applications");
                setApplication(Applications.data.map((value, key) => application[key] = value));
            }
            catch (error) {
                console.log(error)
            }

        }
        fetchApplications();

        const fetchResume = async () => {
            let response = await fetchPdf("http://localhost:8080/user/resume/download");
            const pdfBlob = new Blob([response.data], { type: "application/pdf" });
            const blobUrl = URL.createObjectURL(pdfBlob);
            setResume(blobUrl);
        }
        fetchResume();

        const Profile = async () => {
            const profileData = await Fetch("http://localhost:8080/user/profile");
            setProfile(profileData.data);
            console.log(profileData.data);

        }
        Profile();

        const fetchSkills = async () => {
            const userSkills = await Fetch("http://localhost:8080/user/skills");
            setSkill(userSkills.data.map(skill => skill.replace("* ", "").replace("**", "").trim()));
        }
        fetchSkills();


    }, []);
    let file;
    const handleChange = (e) => {
        const { name, type } = e.target;

        if (type === "file") {
            file = e.target.files[0]; // Get the first selected file
            console.log(name, file); // Log the actual file object
        } else {
            const { value } = e.target;
            console.log(name, value);
        }
    };
    const redirectToPDF = () => {
        window.open(resume, "_blank")
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await postFile("http://localhost:8080/user/resume/upload", formData);

            alert(response);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const renderSection = () => {
        const userType = "USERS"
        switch (currentSection) {
            case "Available Jobs":
                return (
                    <div className="flex flex-row flex-wrap w-full h-fit items-center justify-around gap-x-2">
                        {jobs.map((job, index) => (
                            <JobCard key={index} data={job} idn={index} type={userType} />
                        ))}
                    </div>
                );
            case "Applications":
                return (
                    <div className="flex flex-row flex-wrap w-full h-fit items-start">
                        {application.map((app, index) => (
                            <ApplicationCard key={index} data={app} idn={index} type={userType} />
                        ))}

                    </div>
                )
            case "Profile":
                return (
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
                                {resume ? (
                                    <div className="flex flex-col items-center">
                                        <h2 className="text-amber-50 text-center text-lg mb-4">
                                            You have uploaded a resume.
                                        </h2>
                                        <button
                                            onClick={redirectToPDF}
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            View Resume
                                        </button>
                                    </div>
                                ) : (
                                    <h2 className="text-amber-50 text-center text-lg">
                                        No resume uploaded yet.
                                    </h2>
                                )}
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div className="bg-gray-800 text-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                            <h3 className="text-2xl font-bold text-center mb-4">Skills</h3>
                            {skill.length === 0 ? (
                                <h2 className="text-center text-gray-400">Loading Skills...</h2>
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
                );
            case "Add Resume":
                return (
                    <div className="flex flex-col items-center mt-7 h-full">
                        {resume ? (
                            <h2 className="text-amber-50 text-center text-2xl mb-6">
                                You have already uploaded a resume!
                            </h2>
                        ) : (
                            <h2 className="text-amber-50 text-center text-2xl mb-6">
                                You don't currently have any resume uploaded!
                            </h2>
                        )}
                        <div className="bg-gray-800 text-white shadow-lg rounded-lg p-8 w-full max-w-md">
                            <form
                                ref={postFormRef}
                                onSubmit={handleSubmit}
                                className="flex flex-col space-y-6"
                            >
                                <div className="mb-4">
                                    <label
                                        htmlFor="file"
                                        className="block text-sm font-medium mb-2"
                                    >
                                        Upload Resume (PDF only)
                                    </label>
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        name="file"
                                        id="file"
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    Upload Resume
                                </button>
                            </form>
                        </div>
                    </div>
                );
            case "Update profile":
                return (
                    <>
                        < UpdateUserProfile />
                        <br />
                        <h2 className="text-center text-2xl font-bold text-white">Update password</h2>
                        <UpdateUserPassword />
                    </>
                )

            default:
                return null;
        }
    };

    return (
        <div className="h-screen flex flex-row justify-between gap-x-4">
            <div className="mt-5 bg-gray-900 h-fit border-2 border-black w-sm flex flex-col justify-around gap-y-5">
                {["Available Jobs", "Applications", "Profile", "Add Resume", "Update profile"].map((section, index) => (
                    <button
                        key={index}
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                        onClick={() => setCurrentSection(section)}
                    >
                        <span className="relative w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                            {section}
                        </span>
                    </button>
                ))}
            </div>
            <div className="h-full w-full">
                <h1 className="text-amber-50 mt-2 font-bold text-center text-2xl">
                    {currentSection}
                </h1>
                {renderSection()}
            </div>
        </div>
    );
}

export default DashboardUser;
