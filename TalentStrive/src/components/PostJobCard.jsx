import { useState } from "react";
import { useNavigate } from "react-router";
import { Fetch, postData } from "../api/Fetch";

const PostJobCard = (props) => {
    const formRef = props.reference;
    const navigate = useNavigate();

    const [jobData, setJobData] = useState({
        title: '',
        location: '',
        jobType: '',
        category: '',
        status: 'active',
        employer: {
            id: ''
        },
        company: {
            id: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobData({ ...jobData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Fetch('http://localhost:8080/employer/profile');
            const payload = { ...jobData };
            payload.employer.id = response.data.id;
            payload.company.id = response.data.company.id;
            await postData('http://localhost:8080/employer/job/create', payload);
            navigate("/employer/dashboard");
        } catch (error) {
            console.error("Error posting job:", error);
        }
    };

    return (
        <div className="relative flex flex-col my-6 bg-gray-800 shadow-lg border border-gray-700 text-white rounded-lg w-full max-w-3xl mx-auto p-8 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-center mb-6">Post a Job</h2>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <input
                    onChange={handleChange}
                    type="text"
                    name="title"
                    placeholder="Job Title"
                    className="w-full p-3 border border-gray-600 rounded-md bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                />
                <input
                    onChange={handleChange}
                    type="text"
                    name="location"
                    placeholder="Location"
                    className="w-full p-3 border border-gray-600 rounded-md bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                />
                <input
                    onChange={handleChange}
                    type="text"
                    name="status"
                    value="active"
                    disabled
                    className="w-full p-3 border border-gray-600 rounded-md bg-gray-900 text-gray-500 cursor-not-allowed"
                    required
                />
                <select
                    onChange={handleChange}
                    name="jobType"
                    className="w-full p-3 border border-gray-600 rounded-md bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                >
                    <option value="">Select Job Type</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Intern">Intern</option>
                    <option value="Remote">Remote</option>
                </select>
                <input
                    onChange={handleChange}
                    type="text"
                    name="category"
                    placeholder="Category (e.g., IT, Marketing)"
                    className="w-full p-3 border border-gray-600 rounded-md bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition-transform transform hover:scale-105"
                >
                    Post Job
                </button>
            </form>
        </div>
    );
};

export default PostJobCard;