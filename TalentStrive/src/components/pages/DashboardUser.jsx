import { useState, useEffect } from "react";
import { Fetch, fetchPdf, postFile } from "../../api/Fetch";
import { JobCard } from "../Jobcard";
import { useRef } from "react";
import { ApplicationCard } from "../ApplicationCard";
import { UpdateUserProfile } from "../UpdateUser";
import { UpdateUserPassword } from "../UpdatePassword";
import UserProfile from "../UserProfile";
import JobDescription from "../JobDescription";

function DashboardUser() {
    let [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null); // State for the selected job to be used for viewing details of a perticular job
    let [application, setApplication] = useState([{}]);
    let [resume, setResume] = useState("");
    let [currentSection, setCurrentSection] = useState("Available Jobs");
    let [profile, setProfile] = useState({
        id: null,
        name: "",
        role: "",
        username: "",
        applications: 0
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
            setProfile({
                id: profileData.data.id,
                name: profileData.data.name,
                role: profileData.data.role,
                username: profileData.data.username,
                applications: profileData.data.applications
            });

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
    const handleViewJob = (job) => {
        setSelectedJob(job); // Set the selected job
        setCurrentSection("View Job"); // Switch to the "View Job" section
    };
    const goBackToJobs = () => {
        setCurrentSection("Available Jobs"); // Navigate back to Available Jobs
    };
    const renderSection = () => {
        const userType = "USERS"
        switch (currentSection) {
            case "Available Jobs":
                return (
                    <div className="flex flex-row flex-wrap w-full h-fit items-center justify-around gap-x-2">
                        {jobs.map((job, index) => (
                            <JobCard onViewJob={handleViewJob} key={index} data={job} idn={index} type={userType} />
                        ))}
                    </div>
                );
            case "View Job":
                return (
                    <div className="flex flex-row gap-8 items-center justify-center mt-10">
                        {/* Job Description */}
                        <div className="w-3/4 bg-gray-800 text-white shadow-lg rounded-lg p-8">
                            <JobDescription profileData={profile} job={selectedJob} goBack={goBackToJobs} />
                        </div>
                    </div>
                );
            case "Applications":
                return (
                    <div className="flex flex-row items-center justify-around flex-wrap w-full h-fit ">
                        {application.map((app, index) => (
                            <ApplicationCard key={index} data={app} idn={index} type={userType} />
                        ))}

                    </div>
                )
            case "Profile":
                return (
                    <>
                        <UserProfile profileData={profile} skillData={skill} applicationData={application} resumeData={resume} />
                    </>
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
                    <div>
                        < UpdateUserProfile />
                        <br />

                        <h2 className="text-center text-2xl font-bold text-white">Update password</h2>
                        <UpdateUserPassword />

                    </div>
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
