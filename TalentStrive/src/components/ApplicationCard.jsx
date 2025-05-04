export const ApplicationCard = (props) => {
    const application = props.data;

    return (
        <div
            key={application.id}
            className="relative flex flex-col my-6 bg-gray-800 shadow-lg border border-gray-700 text-white rounded-lg w-96 hover:shadow-xl transition-shadow duration-300"
        >
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-700">
                <span className="text-sm font-medium text-gray-400">
                    ID: {application.id} | Job Post ID: {application.jobPostId}
                </span>
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
                <h5 className="text-xl font-bold text-white">{application.title}</h5>
                <p className="text-gray-400">
                    <span className="font-semibold text-gray-300">Applicant Name:</span> {application.applicantName}
                </p>
                <p className="text-gray-400">
                    <span className="font-semibold text-gray-300">Company:</span> {application.company}
                </p>
                <p className="text-gray-400">
                    <span className="font-semibold text-gray-300">Employer ID:</span> {application.employerId}
                </p>
                <p className="text-gray-400">
                    <span className="font-semibold text-gray-300">User ID:</span> {application.userId}
                </p>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-gray-700 flex justify-between items-center">
                <span className="text-sm font-medium">
                    Status:{" "}
                    <span
                        className={`${application.status === "In-Consideration"
                                ? "text-yellow-400"
                                : "text-red-500"
                            }`}
                    >
                        {application.status}
                    </span>
                </span>
                <button
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-transform transform hover:scale-105"
                >
                    View Details
                </button>
            </div>
        </div>
    );
};