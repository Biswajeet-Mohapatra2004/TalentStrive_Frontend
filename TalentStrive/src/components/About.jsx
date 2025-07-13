const About = () => {
    return (
        <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center px-4 py-10">
            <div className="w-full max-w-2xl text-center">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                    About TalentStrive
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6">
                    TalentStrive is a comprehensive job board platform designed to connect talented individuals with top-tier companies across the globe. Our platform offers an intuitive user experience, enabling job seekers to find roles that match their skills and aspirations seamlessly.
                </p>
                <p className="text-base sm:text-lg text-gray-400 mb-6">
                    At TalentStrive, we believe that finding the right job should be simple and stress-free. Our advanced search algorithms ensure that job seekers are matched with opportunities that fit their profile perfectly. For employers, our platform offers a vast pool of qualified candidates, making the hiring process efficient and effective.
                </p>
                <p className="text-base sm:text-lg text-gray-400 mb-6">
                    Our mission is to bridge the gap between talent and opportunity by providing a platform that is accessible, reliable, and user-friendly. Whether you are a recent graduate looking for your first job or an experienced professional seeking new challenges, TalentStrive is here to support your career journey every step of the way.
                </p>
                <p className="text-base sm:text-lg text-gray-400 mb-2">
                    Join TalentStrive today and take the next step towards achieving your career goals. With thousands of job listings and a supportive community, your dream job is just a few clicks away.
                </p>
            </div>
        </div>
    );
};

export default About;