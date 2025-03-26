import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// ✅ Set worker from `public/` folder
pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.js";

const PdfViewer = ({ response }) => {
    const [pdfUrl, setPdfUrl] = useState("");
    const [numPages, setNumPages] = useState(null);

    useEffect(() => {
        if (response) {
            // // ✅ Convert raw bytes to Uint8Array
            // const uint8Array = new Uint8Array(pdfByteData);
            // // ✅ Create Blob URL
            // console.log(uint8Array);
            // const blob = new Blob([uint8Array], { type: "application/pdf" });
            // console.log(blob);
            // const url = URL.createObjectURL(blob);
            // setPdfUrl(url);
            const blob = response.blob(); // ✅ Convert response to Blob
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
        }
    }, [response]);

    const viewPdf = () => {
        window.open(pdfUrl, `${pdfUrl}`);
    }

    return (
        // <div className="max-w-4xl mx-auto mt-8 border border-gray-300 rounded-lg shadow-lg p-4 bg-gray-800 text-white">
        //     <h2 className="text-2xl font-bold mb-4 text-center">PDF Viewer</h2>
        //     {pdfUrl ? (
        //         <Document
        //             file={pdfUrl}
        //             onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        //             className="border border-gray-600 rounded-md overflow-hidden"
        //         >
        //             {Array.from({ length: numPages }, (_, i) => (
        //                 <Page
        //                     key={i}
        //                     pageNumber={i + 1}
        //                     renderTextLayer={false}
        //                     renderAnnotationLayer={false}
        //                 />
        //             ))}
        //         </Document>
        //     ) : (
        //         <div className="flex justify-center items-center h-[80vh]">
        //             <p className="text-gray-400">Loading PDF...</p>
        //         </div>
        //     )}
        // </div>
        <>
            <button className="bg-black border-2 border-l-pink-500 border-r-red-700 text-white texl-xl" onClick={viewPdf}>View Resume</button>
        </>
    );
};

export default PdfViewer;
