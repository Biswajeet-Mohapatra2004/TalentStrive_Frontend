import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import axios from 'axios';
import { postData } from '../../api/Fetch';
import { Navigate, useNavigate } from 'react-router';
const Register = () => {
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        role: 'JOB_SEEKER',
        applications: []
    });
    const navigate = useNavigate();

    useEffect(() => {
        gsap.fromTo(formRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' });
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    async function handleRequest(formData) {
        const req = await axios.post("http://localhost:8080/user/register", formData);
        console.log("triggered")
        navigate('/user/login');

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        handleRequest(formData);


    };

    return (
        <div className="h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center text-white">
            <h2 className="text-4xl font-extrabold mb-6">Create an Account</h2>
            <form ref={formRef} onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-2xl shadow-2xl flex flex-col space-y-6 w-96">
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-purple-500" />
                <input name="username" value={formData.username} onChange={handleChange} placeholder="Email" className="p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-purple-500" />
                <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" className="p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-purple-500" />
                <select disabled name="role" value={formData.role} onChange={handleChange} className="p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-purple-500">
                    <option value="JOB_SEEKER">JOB SEEKER</option>

                </select>
                <button type="submit" className="py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:shadow-lg hover:scale-105 transition-transform font-semibold">
                    Register
                </button>
            </form>
            <p className="mt-6 text-gray-400">Already have an account? <a href="/user/login" className="text-purple-400 hover:underline">Login</a></p>
        </div>
    );
};

export default Register;
