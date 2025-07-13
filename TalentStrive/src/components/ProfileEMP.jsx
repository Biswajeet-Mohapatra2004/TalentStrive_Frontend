import { useEffect, useState } from "react";
import { Fetch } from "../api/Fetch";

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
        <div className="flex flex-col items-center bg-gray-900 text-white py-10 px-4">
            <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl">

                {/* Profile Card */}
                <div className="flex-1 bg-gray-800 shadow-lg border border-gray-700 rounded-lg p-6 md:p-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6">
                        Employer Profile
                    </h2>
                    <div className="space-y-3 text-sm md:text-lg">
                        <p><span className="font-semibold text-gray-300">Profile ID:</span> {profile.id}</p>
                        <p><span className="font-semibold text-gray-300">Name:</span> {profile.name}</p>
                        <p><span className="font-semibold text-gray-300">Username:</span> {profile.username}</p>
                        <p><span className="font-semibold text-gray-300">Company ID:</span> {profile.company.id}</p>
                        <p><span className="font-semibold text-gray-300">Industry:</span> {profile.company.industry}</p>
                        <p><span className="font-semibold text-gray-300">Company Name:</span> {profile.company.name}</p>
                        <p><span className="font-semibold text-gray-300">Location:</span> {profile.company.location}</p>
                    </div>
                </div>

                {/* Jobs Posted Count */}
                <div className="flex-1 bg-gray-800 shadow-lg border border-gray-700 rounded-lg p-6 md:p-8 flex flex-col justify-center items-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-center mb-3 md:mb-4">
                        Jobs Posted
                    </h3>
                    <p className="text-sm md:text-lg text-gray-300 text-center">
                        You have posted{" "}
                        <span className="text-amber-400 font-semibold">
                            {props.jobsPosted.length}
                        </span>{" "}
                        job{props.jobsPosted.length === 1 ? "" : "s"}.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileEMP;
