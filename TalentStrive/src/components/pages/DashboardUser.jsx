import { useState, useEffect } from "react";
import { Fetch, fetchPdf, postFile } from "../../api/Fetch";
import { JobCard } from "../Jobcard";
import { useRef } from "react";
import { ApplicationCard } from "../ApplicationCard";
import { UpdateUserProfile } from "../UpdateUser";
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
                    <>
                        <div className="flex flex-col justify-around items-center">
                            <div id='profile' className="w-2xl border-2 rounded-lg border-amber-50 text-amber-50 font text-xl font-light flex flex-col gap-y-2">
                                <p>Name: {profile.name}</p>
                                <p>Username: {profile.username}</p>
                                <p>Role: {profile.role}</p>
                                <p>No. of jobs Applied: {application.length === 0 ? "You have not yet applied for any job!!" : application.length}</p>

                            </div>
                            <br />
                            <h3 className="text-amber-50 text-3xl font-bold">Skills</h3>
                            <div >
                                {skill.length === 0 ? (
                                    <h2 className="text-amber-50">Loading Skills...</h2>
                                ) : (
                                    <ul className="w-2xl border-2 rounded-lg border-amber-50 text-amber-50 font text-xl flex-wrap flex flex-row gap-x-3">
                                        {skill.map((value, key) => (
                                            <li key={key} className={value.includes("*") ? "text-red-500 block w-full" : "text-amber-50 font-light"}>{value}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                        </div>
                        <br />
                        <div className="flex flex-col justify-around items-center">
                            <h3 className="text-amber-50 text-3xl font-bold ">Resume</h3>
                            <br />
                            <div className="flex flex-col justify-around items-center">
                                <button onClick={redirectToPDF} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                                        View Resume
                                    </span>
                                </button>
                            </div>
                        </div>
                    </>
                )
            case "Add Resume":
                return (
                    <>
                        {resume != null ? <h2 className="text-amber-50 text-center text-2xl">You have already uploaded a resume!!.</h2> : <h2 className="text-amber-50">You dont currently have any resume uploaded!!</h2>}
                        <div onSubmit={handleSubmit} className="w-fit mx-auto h-0 shadow-xl shadow-amber-50">
                            <form ref={postFormRef} className="flex mx-0 h-auto flex-col items-center justify-around gap-y-2 my-30">

                                <input type="file" accept="application/pdf" name="file" onChange={handleChange} className="rounded bg-white text-black p-8 " />
                                <button type="submit" className="bg-green-500 rounded-sm px-8 py-4">upload</button>
                            </form>
                        </div>

                    </>
                )
            case "Update profile":
                return (
                    <>
                        < UpdateUserProfile />
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
