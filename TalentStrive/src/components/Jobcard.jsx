export const JobCard = (props) => {
    const job = props.data;
    const idn = props.idn;
    const type = props.type;

    return (
        <>
            {type === "USERS" ? <div key={idn} className="relative flex flex-col my-6 bg-gray-800 shadow-sm border text-white border-slate-200 rounded-lg w-96">
                <div className="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
                    <span className="text-sm font-medium text-white">
                        id:{job.id} {job.category}
                    </span>
                </div>

                <div className="p-4">
                    <h5 className="mb-2 text-white text-xl font-semibold">
                        Title: {job.title}
                    </h5>
                    <p className=" text-white leading-normal font-light">
                        Company: {job.company}
                    </p>
                    <p className=" text-white leading-normal font-light">
                        Location: {job.location}
                    </p>
                    <p className=" text-white leading-normal font-light">
                        Jobtype: {job.jobType}
                    </p>
                    <p className=" text-white leading-normal font-light">
                        Status: {job.status}
                    </p>
                </div>
                <div className="mx-3 border-t border-slate-200 pb-3 pt-2 px-1 flex flex-row justify-between">
                    <span className="text-sm text-white font-medium ">
                        status: <span className={job.status === "active" ? "text-green-400" : "text-red-500"}>{job.status}</span>
                    </span>
                    <span className="text-sm text-white font-medium flex flex-row gap-x-2">
                        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                            <span className="relative w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                                view job
                            </span>
                        </button>
                    </span>

                </div>
            </div> :

                <div key={idn} className="relative flex flex-col my-6 bg-gray-800 shadow-sm border text-white border-slate-200 rounded-lg w-96">
                    <div className="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
                        <span className="text-sm font-medium text-white">
                            id:{job.id} {job.category}
                        </span>
                    </div>

                    <div className="p-4">
                        <h5 className="mb-2 text-white text-xl font-semibold">
                            Title: {job.title}
                        </h5>
                        <p className=" text-white leading-normal font-light">
                            Company: {job.company}
                        </p>
                        <p className=" text-white leading-normal font-light">
                            Location: {job.location}
                        </p>
                        <p className=" text-white leading-normal font-light">
                            Jobtype: {job.jobType}
                        </p>
                        <p className=" text-white leading-normal font-light">
                            Status: {job.status}
                        </p>
                    </div>
                    <div className="mx-3 border-t border-slate-200 pb-3 pt-2 px-1 flex flex-row justify-between">
                        <span className="text-sm text-white font-medium ">
                            status: <span className={job.status === "active" ? "text-green-400" : "text-red-500"}>{job.status}</span>
                        </span>
                        <span className="text-sm text-white font-medium flex flex-row gap-x-2">
                            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                                <span className="relative w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                                    view applications
                                </span>
                            </button>
                            <button className="bg-red-600 rounded-sm hover:bg-red-700">remove</button>
                        </span>

                    </div>
                </div>}
        </>
    )

};