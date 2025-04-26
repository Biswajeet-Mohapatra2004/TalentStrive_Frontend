import { useState, useEffect } from "react";
import { Fetch } from "../../api/Fetch";
import { JobCard } from "../Jobcard";
import PostJobCard from "../PostJobCard";
import { useRef } from "react";
import ProfileEMP from "../ProfileEMP";
function Dashboard() {
    let [jobs, setJobs] = useState([]);
    let [application, setApplication] = useState([]);
    let [currentSection, setCurrentSection] = useState("Postings");
    const url = 'http://localhost:8080/employer/jobs';
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

        // const fetchApplications = async () => {
        //     try {
        //         const Applications = await Fetch("http://localhost:8080/employer/applications");
        //         setApplication(Applications.data);
        //         console.log(application);
        //     }
        //     catch (error) {
        //         console.log(error)
        //     }

        // }
        // fetchApplications();
    }, []);

    const renderSection = () => {
        switch (currentSection) {
            case "Postings":
                return (
                    <div className="flex flex-row flex-wrap w-full h-fit items-center justify-around gap-x-2">
                        {jobs.map((job, index) => (
                            <JobCard key={index} data={job} idn={index} type={"EMPLOYERS"} />
                        ))}
                    </div>
                );
            case "Applications":
                return (
                    <div className="flex flex-row flex-wrap w-full h-fit items-start">

                    </div>
                )
            case "Profile":
                return (
                    <>
                        <div className="flex flex-row justify-center items-center mt-5 w-full">
                            <ProfileEMP jobsPosted={jobs} />
                        </div>
                    </>
                )
            case "Add a job":
                return (
                    <>
                        <div className="flex flex-row justify-center items-center mt-5">
                            <PostJobCard reference={postFormRef} />
                        </div>
                    </>
                )
            case "Update profile":
                return <div>Update Profile Form</div>;
            default:
                return null;
        }
    };

    return (
        <div className="h-screen flex flex-row justify-between gap-x-4">
            <div className="mt-5 bg-gray-900 h-fit border-2 border-black w-sm flex flex-col justify-around gap-y-5">
                {["Postings", "Applications", "Profile", "Add a job", "Update profile"].map((section, index) => (
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

export default Dashboard;
