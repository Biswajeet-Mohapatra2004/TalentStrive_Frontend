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
                        <button className="text-white border-2 border-pink-500 px-3 rounded hover:bg-pink-500 hover:text-black">View job</button>
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
                            <button className="bg-green-600 rounded-sm hover:bg-green-700">View Applications</button>
                            <button className="bg-red-600 rounded-sm hover:bg-red-700">remove</button>
                        </span>

                    </div>
                </div>}
        </>
    )

};