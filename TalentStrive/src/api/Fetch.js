import axios from "axios";

export async function Fetch(url) {
    let token = localStorage.getItem('token');
    let response = await axios.get(url, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response;
}
export async function fetchPdf(url) {
    try {
        const response = await axios.get(url, {
            responseType: "blob",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ Add token if required
            },
        });
        return response;
    }
    catch (error) {
        return error;
    }
}
export async function postData(url, body) {
    try {
        let token = localStorage.getItem('token'); //Retrieve JWT Token

        const response = await axios.post(url, body, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        return response.data; // Return API Response
    } catch (error) {
        console.error("Error in postData:", error);
        throw error; // Rethrow error for handling
    }
}
export async function updateData(url, body) {
    try {
        let token = localStorage.getItem('token'); //Retrieve JWT Token

        const response = await axios.put(url, body, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        return response.data; // Return API Response
    } catch (error) {
        console.error("Error in postData:", error);
        throw error; // Rethrow error for handling
    }
}
export async function postFile(url, body) {
    try {
        let token = localStorage.getItem('token'); //Retrieve JWT Token

        const response = await axios.post(url, body, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        });

        return response.data; // Return API Response
    } catch (error) {
        console.error("Error in postData:", error);
        throw error; // Rethrow error for handling
    }
}
export async function deleteData(url) {
    try {
        let token = localStorage.getItem('token'); //Retrieve JWT Token

        const response = await axios.delete(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error in postData:", error);
        throw error; // Rethrow error for handling
    }
}
export async function DeleteJson(url, body) {
    try {
        let token = localStorage.getItem('token');

        const response = await axios.delete(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            data: body
        });

        return response.data;
    } catch (error) {
        console.error("Error in DeleteJson:", error);
        throw error;
    }
}