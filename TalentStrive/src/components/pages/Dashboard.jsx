import { useState, useEffect, useRef } from "react";
import { Fetch } from "../../api/Fetch";
import { JobCard } from "../Jobcard";
import PostJobCard from "../PostJobCard";
import ProfileEMP from "../ProfileEMP";
import { ApplicationCard } from "../ApplicationCard";
import JobDescription from "../JobDescription";
import { Menu, X } from "lucide-react"; // You can use any icon library

function Dashboard() {
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [currentSection, setCurrentSection] = useState("Postings");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const postFormRef = useRef(null);

    const url = 'http://localhost:8080/employer/jobs';

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await Fetch(url);
                setJobs(response.data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };
        const fetchApplications = async () => {
            try {
                const response = await Fetch("http://localhost:8080/employer/applications");
                setApplications(response.data);
            } catch (error) {
                console.error("Error fetching applications:", error);
            }
        };
        fetchJobs();
        fetchApplications();
    }, []);

    const handleViewJob = (job) => {
        setSelectedJob(job);
        setCurrentSection("View Job");
        setSidebarOpen(false);
    };

    const goBackToJobs = () => {
        setCurrentSection("Postings");
    };

    const handleDeleteApplication = (id) => {
        setApplications((prev) => prev.filter((app) => app.id !== id));
    };

    const sections = ["Postings", "Applications", "Profile", "Add a job", "Update profile"];

    const renderSection = () => {
        switch (currentSection) {
            case "Postings":
                return (
                    <div className="flex flex-wrap w-full items-center justify-around gap-4 mt-4">
                        {jobs.map((job, index) => (
                            <JobCard
                                onViewJob={handleViewJob}
                                key={index}
                                data={job}
                                idn={index}
                                type={"EMPLOYERS"}
                            />
                        ))}
                    </div>
                );
            case "View Job":
                return (
                    <div className="flex flex-col md:flex-row gap-8 items-center justify-center mt-10 px-2">
                        <div className="w-full md:w-3/4 bg-gray-800 text-white shadow-lg rounded-lg p-4 md:p-8">
                            <JobDescription
                                profileData={""}
                                job={selectedJob}
                                goBack={goBackToJobs}
                                userType={"EMPLOYERS"}
                            />
                        </div>
                    </div>
                );
            case "Applications":
                return (
                    <div className="flex flex-wrap w-full items-center justify-around gap-4 mt-4">
                        {applications.map((application) => (
                            <ApplicationCard
                                key={application.id}
                                data={application}
                                usertype="EMPLOYER"
                                onDelete={() => handleDeleteApplication(application.id)}
                            />
                        ))}
                    </div>
                );
            case "Profile":
                return (
                    <div className="flex flex-col justify-center items-center mt-5 w-full px-2">
                        <ProfileEMP jobsPosted={jobs} />
                    </div>
                );
            case "Add a job":
                return (
                    <div className="flex flex-col justify-center items-center mt-5 w-full px-2">
                        <PostJobCard reference={postFormRef} />
                    </div>
                );
            case "Update profile":
                return <div className="text-white text-center mt-10">Update Profile Form</div>;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row gap-4 px-4 pb-20">
            {/* Hamburger Button */}
            <div className="md:hidden flex justify-between items-center w-full mt-4">
                <h1 className="text-amber-50 text-xl font-bold">{currentSection}</h1>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-white p-2 bg-gray-700 rounded-lg"
                >
                    {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Sidebar */}
            <div className={`${sidebarOpen ? "block" : "hidden"} md:block w-full md:w-64 mt-5 bg-black border-2 border-black flex flex-col justify-around gap-2 px-2 py-4 rounded-lg`}>
                {sections.map((section, index) => (
                    <button
                        key={index}
                        className="w-full text-sm font-medium rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white p-0.5"
                        onClick={() => {
                            setCurrentSection(section);
                            setSidebarOpen(false);
                        }}
                    >
                        <span className="block w-full px-4 py-2.5 rounded-md bg-gray-900 hover:bg-gray-800 transition-all">
                            {section}
                        </span>
                    </button>
                ))}
            </div>

            {/* Main Content */}
            <div className="flex-1 w-full">
                <div className="hidden md:block">
                    <h1 className="text-amber-50 mt-2 font-bold text-center text-2xl">
                        {currentSection}
                    </h1>
                </div>
                {renderSection()}
            </div>
        </div>
    );
}

export default Dashboard;
