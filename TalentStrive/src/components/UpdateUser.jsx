import { useState } from "react";
import { postData } from "../api/Fetch";
export const UpdateUserProfile = () => {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        role: 'JOB_SEEKER',
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        postData("http://localhost:8080/user/update", formData);
        alert("Profile Updated Successfully");
    }
    return (
        <div className="flex justify-center items-center my-5 bg-black">
            <div className="bg-gray-800 text-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium mb-2">
                            Username
                        </label>
                        <input
                            name="username"
                            onChange={handleChange}
                            type="mail"
                            id="username"
                            placeholder="Enter your username"
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                            Full Name
                        </label>
                        <input
                            name="name"
                            onChange={handleChange}
                            type="text"
                            id="name"
                            placeholder="Enter your full name"
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="role" className="block text-sm font-medium mb-2">
                            Role
                        </label>
                        <select
                            name="role"
                            onChange={handleChange}
                            defaultValue={"JOB_SEEKER"}
                            id="role"
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" >SELECT</option>
                            <option value="JOB_SEEKER">JOB_SEEKER</option>
                            <option value="EMPLOYER" disabled>Employer</option>
                        </select>
                    </div>
                    <div className="flex justify-between items-center">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

