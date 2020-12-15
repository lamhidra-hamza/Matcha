import axios from "axios";

async function getNewToken() {
    let result = await axios.post(
        "http://localhost:5000/api/users/gettoken", {}, {
            withCredentials: true,
        }
    );
    if (result.data.status === 1)
        return result.data.accessToken;
    return null;
}
// check the token and fetch data
async function getData(callBackFctn) {
    const token = localStorage.getItem("accessToken");
    if (!token)
        return ({
            status: -1,
        })
    console.log(`the token from fetch data is ${token}`);
    let result = await callBackFctn(token);
    console.log(result.id);
    if (result.status === 0) {
        let newToken = await getNewToken();
        result = await callBackFctn(newToken);
    }
    return result;
}

async function logOut() {
    const id = localStorage.getItem("userId");
    await axios.put(`http://localhost:5000/api/users/${id}`, { refreshToken: "", id: id }, {
        withCredentials: true,
    });
    localStorage.setItem("accessToken", null);
    localStorage.setItem("userId", null);
    return;
}

export {
    getData,
    logOut
}