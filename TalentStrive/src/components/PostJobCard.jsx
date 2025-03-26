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
    })

    let payload;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobData({ ...jobData, [name]: value })

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Fetch('http://localhost:8080/employer/profile')
            console.log("triggered")
            console.log(response.data);
            const payload = { ...jobData };
            payload.employer.id = response.data.id;
            payload.company.id = response.data.company.id;
            const sendPayload = await postData('http://localhost:8080/employer/job/create', payload);
            navigate("/employer/dashboard")


        }
        catch (Error) {
            console.log(Error);

        }
    }

    return (
        <>
            <div className="max-w-2xl mx-auto p-8 bg-gray-900 text-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Post a Job</h2>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 text-white">
                    <input onChange={handleChange} type="text" name="title" placeholder="Job Title" className="w-full p-3 border rounded-md text-amber-50" required />
                    <input onChange={handleChange} type="text" name="location" placeholder="location" className="w-full p-3 border rounded-md text-amber-50" required />
                    <input onChange={handleChange} type="text" name="status" value="active" disabled placeholder="Location" className="w-full p-3 border rounded-md text-amber-50" required />
                    <select onChange={handleChange} name="jobType" className="w-full p-3 border rounded-md text-slate-400" required>
                        <option value="">Select Job Type</option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Intern">Intern</option>
                        <option value="Remote">Remote</option>
                    </select>
                    <input onChange={handleChange} type="text" name="category" placeholder="Category (e.g., IT, Marketing)" className="w-full p-3 border rounded-md text-amber-50" required />


                    <button type="submit" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-amber-50 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                            Post Job
                        </span>
                    </button>
                </form>
            </div>

        </>
    )
};
export default PostJobCard;