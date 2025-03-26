const Footer = () => {
    return (
        <footer className="w-full bg-black text-gray-300 p-6 text-center flex flex-col items-center S bottom-0">
            <h2 className="text-2xl font-bold mb-4">TalentStrive</h2>
            <p className="mb-4 max-w-xl text-gray-400">
                Empowering careers and connecting talent with top companies globally. Join us and take the next step in your professional journey.
            </p>
            <div className="flex space-x-4 mb-4">
                <a href="#" className="hover:text-pink-500 transition">About</a>
                <a href="#" className="hover:text-pink-500 transition">Jobs</a>
                <a href="#" className="hover:text-pink-500 transition">Contact</a>
                <a href="#" className="hover:text-pink-500 transition">Privacy Policy</a>
            </div>
            <p className="text-sm text-gray-500 w-full border-t border-gray-700 pt-4">© 2025 TalentStrive. All Rights Reserved.</p>
        </footer>
    );
};

export default Footer;