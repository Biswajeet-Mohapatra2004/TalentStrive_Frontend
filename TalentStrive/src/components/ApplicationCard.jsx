export const ApplicationCard = (props) => {
    const application = props.data;

    return (
        <div key={application.id} className="relative flex flex-col my-6 bg-gray-800 shadow-sm border text-white border-slate-200 rounded-lg w-96">
            <div className="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
                <span className="text-sm font-medium text-white">
                    id: {application.id} | Job Post ID: {application.jobPostId}
                </span>
            </div>

            <div className="p-4">
                <h5 className="mb-2 text-white text-xl font-semibold">
                    Title: {application.title}
                </h5>
                <p className="text-white leading-normal font-light">
                    Applicant Name: {application.applicantName}
                </p>
                <p className="text-white leading-normal font-light">
                    Company: {application.company}
                </p>
                <p className="text-white leading-normal font-light">
                    Employer ID: {application.employerId}
                </p>
                <p className="text-white leading-normal font-light">
                    User ID: {application.userId}
                </p>
                <p className="text-white leading-normal font-light">
                    Status: {application.status}
                </p>
            </div>
            <div className="mx-3 border-t border-slate-200 pb-3 pt-2 px-1 flex flex-row justify-between">
                <span className="text-sm text-white font-medium">
                    Status: <span className={application.status === "In-Consideration" ? "text-yellow-400" : "text-red-500"}>{application.status}</span>
                </span>
                <span className="text-sm text-white font-medium flex flex-row gap-x-2">
                    <button className="text-white border-2 border-pink-500 px-3 rounded hover:bg-pink-500 hover:text-black">View Details</button>
                </span>
            </div>
        </div>
    );
};