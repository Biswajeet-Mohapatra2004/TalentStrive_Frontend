import { useEffect, useState } from "react";
import { Fetch } from "../api/Fetch";
import { JobCard } from "./Jobcard";
const ProfileEMP = (props) => {
    const [profile, setProfile] = useState({
        id: '',
        name: '',
        username: '',
        password: '',
        company: {
            id: '',
            name: '',
            industry: '',
            location: ''
        }

    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await Fetch("http://localhost:8080/employer/profile");
                const data = response.data;
                setProfile({
                    id: data.id,
                    name: data.name,
                    username: data.username,
                    password: data.password,
                    company: {
                        id: data.company.id,
                        name: data.company.name,
                        industry: data.company.industry,
                        location: data.company.location
                    }
                });

            } catch (error) {
                console.error("Error fetching employer profile:", error);
            }
        };

        fetchProfile();
    }, []);

    if (!profile) {
        return <p className="text-center text-white">Loading profile...</p>;
    }

    return (
        <>
            <div className=" font-bold text-xl flex flex-col justify-center items-center h-fit text-amber-50">

                <div key={1} className="relative flex flex-col my-6 bg-gray-800 shadow-sm border text-white border-slate-200 rounded-lg w-96">
                    <div className="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
                        <span className="text-sm font-medium text-white">
                            Profile ID:{profile.id}
                        </span>
                    </div>

                    <div className="p-4">
                        <h5 className="mb-2 text-white text-xl font-semibold">
                            Name: {profile.name}
                        </h5>
                        <p className=" text-white leading-normal font-light">
                            Username: {profile.username}
                        </p>
                        <p className=" text-white leading-normal font-light">
                            CompanyID: {profile.company.id}
                        </p>
                        <p className=" text-white leading-normal font-light">
                            Industry: {profile.company.industry}
                        </p>
                        <p className=" text-white leading-normal font-light">
                            Company: {profile.company.name}
                        </p>

                        <p className=" text-white leading-normal font-light">
                            Location: {profile.company.location}
                        </p>
                    </div>
                    <div className="mx-3 border-t border-slate-200 pb-3 pt-2 px-1 flex flex-row justify-between">
                        <span className="text-sm text-white font-medium ">
                        </span>
                    </div>
                </div>

                <div className="text-center ">
                    <h3>Jobs Posted</h3>
                    <div className="flex flex-row flex-wrap justify-around items-center gap-x-5">
                        {props.jobsPosted.map((job, index) => (
                            <JobCard key={index} data={job} idn={index} />
                        ))}
                    </div>

                </div>



            </div>
        </>
    );
};

export default ProfileEMP;
