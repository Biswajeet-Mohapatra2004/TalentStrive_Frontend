const Hero = () => {
    return (
        <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-3xl sm:text-5xl font-bold text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text mb-4">
                Find Your Dream Job with TalentStrive
            </h1>
            <p className="text-base sm:text-xl text-gray-300 mb-8 max-w-xl">
                TalentStrive connects you with top companies and exciting job opportunities. Start your journey today!
            </p>

            <div className="flex flex-col sm:flex-row items-center bg-gray-800 rounded-full shadow-lg p-2 w-full max-w-xl">
                <input
                    type="text"
                    placeholder="Search for jobs, companies, or locations..."
                    className="w-full p-3 outline-none bg-transparent text-gray-300 placeholder-gray-500"
                />
                <button className="mt-2 sm:mt-0 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-3 rounded-full sm:ml-2 w-full sm:w-auto">
                    Search
                </button>
            </div>

        </div>
    );
};

export default Hero;