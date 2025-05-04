import { useState } from "react";
export const UpdateUserPassword = () => {
    const [password, setPassword] = useState("");
    const handleChange = (e) => {
        setPassword(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // postData("http://localhost:8080/user/update", formData);
        // alert("Profile Updated Successfully");
        console.log(password);
    }
    return (
        <div className="flex justify-center items-center my-5 bg-black">
            <div className="bg-gray-800 text-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            name="password"
                            onChange={handleChange}
                            type="password"
                            id="password"
                            placeholder="Enter a new password"
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};