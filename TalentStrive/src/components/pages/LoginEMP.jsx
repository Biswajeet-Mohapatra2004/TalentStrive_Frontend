import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginEMP = () => {
    const formRef = useRef(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });

    useEffect(() => {
        gsap.fromTo(formRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/employer/login', formData);

            localStorage.setItem('token', response.data);
            navigate('/employer/dashboard');
            console.log(response.data);
        } catch (error) {
            console.error('Login failed', error);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="h-screen bg-gradient-to-br from-black to-gray-900 flex flex-col items-center justify-center text-white">
            <h2 className="text-4xl font-extrabold mb-6">Welcome Back</h2>
            <form ref={formRef} onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-2xl shadow-2xl flex flex-col space-y-6 w-96">
                <input type="email" placeholder="Username" name="username" value={formData.username} onChange={handleChange} className="p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-purple-500" required />
                <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} className="p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-purple-500" required />
                <button type="submit" className="py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:shadow-lg hover:scale-105 transition-transform font-semibold">
                    Login as Employer
                </button>
            </form>
            <p className="mt-6 text-gray-400">Don't have an account? <a href="/register" className="text-purple-400 hover:underline">Sign up</a></p>
            <p className="mt-6 text-gray-400">Sign in as User? <a href="/user/login" className="text-purple-400 hover:underline">Log in</a></p>
        </div>
    );
};

export default LoginEMP;
