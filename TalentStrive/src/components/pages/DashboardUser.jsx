import { useState, useEffect, useRef } from "react";
import { Fetch, fetchPdf, postFile } from "../../api/Fetch";
import { JobCard } from "../Jobcard";
import { ApplicationCard } from "../ApplicationCard";
import { UpdateUserProfile } from "../UpdateUser";
import { UpdateUserPassword } from "../UpdatePassword";
import UserProfile from "../UserProfile";
import JobDescription from "../JobDescription";
import { Menu, X } from "lucide-react"; // For hamburger icons (requires lucide-react)

function DashboardUser() {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [application, setApplication] = useState([{}]);
    const [resume, setResume] = useState("");
    const [currentSection, setCurrentSection] = useState("Available Jobs");
    const [showSidebar, setShowSidebar] = useState(false);
    const [profile, setProfile] = useState({
        id: null,
        name: "",
        role: "",
        username: "",
        applications: 0
    });
    const [skill, setSkill] = useState([]);
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
            file = e.target.files[0];
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
        setSelectedJob(job);
        setCurrentSection("View Job");
    };

    const goBackToJobs = () => {
        setCurrentSection("Available Jobs");
    };

    const sidebarSections = [
        "Available Jobs",
        "Applications",
        "Profile",
        "Add Resume",
        "Update profile"
    ];

    const renderSection = () => {
        const userType = "USERS";
        switch (currentSection) {
            case "Available Jobs":
                return (
                    <div className="flex flex-wrap w-full items-center justify-around gap-2">
                        {jobs.map((job, index) => (
                            <JobCard onViewJob={handleViewJob} key={index} data={job} idn={index} type={userType} />
                        ))}
                    </div>
                );
            case "View Job":
                return (
                    <div className="flex flex-col md:flex-row gap-8 items-center justify-center mt-6 md:mt-10">
                        <div className="w-full md:w-3/4 bg-gray-800 text-white shadow-lg rounded-lg p-4 md:p-8">
                            <JobDescription userType={userType} profileData={profile} job={selectedJob} goBack={goBackToJobs} />
                        </div>
                    </div>
                );
            case "Applications":
                return (
                    <div className="flex flex-wrap w-full items-center justify-around gap-4">
                        {application.map((app, index) => (
                            <ApplicationCard usertype={userType} key={index} data={app} idn={index} type={userType} />
                        ))}
                    </div>
                );
            case "Profile":
                return (
                    <div className="flex flex-col md:flex-row justify-center items-center mt-5 w-full">
                        <UserProfile profileData={profile} skillData={skill} applicationData={application} resumeData={resume} />
                    </div>
                );
            case "Add Resume":
                return (
                    <div className="flex flex-col items-center mt-7 h-full">
                        <h2 className="text-amber-50 text-center text-2xl mb-6">
                            {resume ? "You have already uploaded a resume!" : "You don't currently have any resume uploaded!"}
                        </h2>
                        <div className="bg-gray-800 text-white shadow-lg rounded-lg p-6 w-full max-w-md">
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
                        <UpdateUserProfile />
                        <br />
                        <h2 className="text-center text-2xl font-bold text-white">Update password</h2>
                        <UpdateUserPassword />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row gap-4 pb-20 bg-black">
            {/* Mobile Sidebar Toggle */}
            <div className="flex md:hidden justify-end p-4">
                <button
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="text-white"
                >
                    {showSidebar ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Sidebar */}
            <div className={`w-full md:w-64 md:sticky md:top-0 z-20 transition-all bg-black duration-300 ease-in-out 
                ${showSidebar ? "flex" : "hidden"} md:flex flex-col md:flex-col bg-black border-2 border-black 
                justify-start gap-1 sm:gap-2 md:gap-4 px-2 py-4 rounded-lg`}
            >
                {sidebarSections.map((section, index) => (
                    <button
                        key={index}
                        className={`w-full relative inline-flex items-center justify-center p-0.5 mb-1 text-xs sm:text-sm md:text-base font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800`}
                        onClick={() => {
                            setCurrentSection(section);
                            setShowSidebar(false); // auto close on mobile
                        }}
                    >
                        <span className="w-full px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-gray-800 group-hover:text-white">
                            {section}
                        </span>
                    </button>
                ))}
            </div>

            {/* Main Content */}
            <div className="flex-1 h-full w-full">
                <h1 className="text-amber-50 mt-2 font-bold text-center text-xl md:text-2xl">
                    {currentSection}
                </h1>
                {renderSection()}
            </div>
        </div>
    );
}

export default DashboardUser;