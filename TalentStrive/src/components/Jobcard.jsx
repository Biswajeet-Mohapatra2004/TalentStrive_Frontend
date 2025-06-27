export const JobCard = (props) => {
    const job = props.data;
    const idn = props.idn;
    const type = props.type;

    return (
        <div
            key={idn}
            onClick={() => props.onViewJob(job)} // Trigger the handler when the card is clicked
            className="relative flex flex-col my-6 bg-gray-800 shadow-lg border border-gray-700 text-white rounded-lg w-96 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        >
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-700">
                <span className="text-sm font-medium text-gray-400">
                    ID: {job.id} | {job.category}
                </span>
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
                <h5 className="text-xl font-bold text-white">{job.title}</h5>
                <p className="text-gray-400">
                    <span className="font-semibold text-gray-300">Company:</span> {job.company}
                </p>
                <p className="text-gray-400">
                    <span className="font-semibold text-gray-300">Location:</span> {job.location}
                </p>
                <p className="text-gray-400">
                    <span className="font-semibold text-gray-300">Job Type:</span> {job.jobType}
                </p>
                <p className="text-gray-400">
                    <span className="font-semibold text-gray-300">Status:</span> {job.status}
                </p>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-gray-700 flex justify-between items-center">
                <span className="text-sm font-medium">
                    Status:{" "}
                    <span
                        className={`${job.status === "active" ? "text-green-400" : "text-red-500"
                            }`}
                    >
                        {job.status}
                    </span>
                </span>
            </div>
        </div>
    );
};