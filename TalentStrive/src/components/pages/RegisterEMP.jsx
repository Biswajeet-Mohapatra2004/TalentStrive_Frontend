import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import axios from 'axios';

const RegisterEMP = () => {
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        company: '' // Changed from 'company' to company ID
    });
    const [companies, setCompanies] = useState([]); // Changed 'company' to 'companies' - more descriptive

    //  Fetch companies data - now using useCallback
    const getCompanies = async () => {
        try {
            const CompaniesAvailable = await axios.get("http://localhost:8080/company/viewAll");
            setCompanies(CompaniesAvailable.data); // Correct assignment
            console.log("Fetched Companies:", CompaniesAvailable.data); // More informative log
        } catch (error) {
            console.error("Error fetching companies:", error); // Handle errors properly!
        }
    };

    useEffect(() => {
        gsap.fromTo(formRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' });
        getCompanies(); // Calling getCompanies here
    }, []); // Empty dependency array - runs only once on mount

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRequest = async (formData) => { // Marked as async
        try {
            let payload = {
                "name": formData.name,
                "username": formData.username,
                "password": formData.password,
                "company": {
                    "id": formData.company // Sending the company ID
                }
            }
            const req = await axios.post("http://localhost:8080/employer/register", payload);
            console.log("Registration Response:", req.data);  // Log the response from the server
            // Optionally, clear the form or redirect the user
        } catch (error) {
            console.error("Registration Error:", error); // Properly handle registration errors
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        handleRequest(formData);
    };

    return (
        <div className="h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center text-white">
            <h2 className="text-4xl font-extrabold mb-6">Create an Account</h2>
            <form ref={formRef} onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-2xl shadow-2xl flex flex-col space-y-6 w-96">
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-purple-500" />
                <input name="username" value={formData.username} onChange={handleChange} placeholder="Email" className="p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-purple-500" />
                <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" className="p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-purple-500" />
                <select name="company" value={formData.company} onChange={handleChange} className="p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-purple-500">
                    <option value="">Select a Company</option> {/* Changed to empty value */}
                    {companies.map((com) => (
                        <option key={com.id} value={com.id}>
                            {com.name}
                        </option>
                    ))}
                    <option value="other">Other</option>
                </select>
                <button type="submit" className="py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:shadow-lg hover:scale-105 transition-transform font-semibold">
                    Register
                </button>
            </form>
            <p className="mt-6 text-gray-400">Already have an account? <a href="/login" className="text-purple-400 hover:underline">Login</a></p>
        </div>
    );
};

export default RegisterEMP;
