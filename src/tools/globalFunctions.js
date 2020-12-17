import axios from "axios";

async function getNewToken() {
  let result = await axios.post(
    "http://localhost:5000/api/users/gettoken",
    {},
    {
      withCredentials: true,
    }
  );
  if (result.data.status === 1) return result.data.accessToken;
  return null;
}

// check the token and fetch data
async function getData(route, params, credential) {
  const token = localStorage.getItem("accessToken");
  const id = localStorage.getItem("userId");
  if (!token)
    return {
      status: -1,
    };
  let result = await axios.get(`http://localhost:5000/${route}`, {
    params: params,
    headers: { token: token, id: id },
    withCredentials: credential,
  });
  if (result.data.status === 0) {
    let newToken = await getNewToken();
    localStorage.setItem("accessToken", newToken);
    result = await axios.get(`http://localhost:5000/${route}`, {
      params: params,
      headers: { token: newToken, id: id },
      withCredentials: credential,
    });
  }
  return result;
}

// check the token and fetch data
async function postData(route, params) {
  const token = localStorage.getItem("accessToken");
  const id = localStorage.getItem("userId");
  if (!token)
    return {
      status: -1,
    };
  let result = axios.post(`http://localhost:5000/${route}`, params, {
    headers: { token: token, id: id },
  });
  if (result.status === 0) {
    let newToken = await getNewToken();
    localStorage.setItem("accessToken", newToken);
    result = axios.post(`http://localhost:5000/${route}`, params, {
      headers: { token: newToken, id: id },
    });
  }
  return result;
}

// check the token and fetch data
async function putData(route, params) {
  const token = localStorage.getItem("accessToken");
  const id = localStorage.getItem("userId");
  if (!token)
    return {
      status: -1,
    };
  let result = axios.put(`http://localhost:5000/${route}`, params, {
    headers: { token: token, id: id },
  });
  if (result.status === 0) {
    let newToken = await getNewToken();
    localStorage.setItem("accessToken", newToken);
    result = axios.put(`http://localhost:5000/${route}`, params, {
      headers: { token: newToken, id: id },
    });
  }
  return result;
}

//
async function uploadPictures(data) {
  const token = localStorage.getItem("accessToken");
  const id = localStorage.getItem("userId");
  if (!token)
    return {
      status: -1,
    };
  let result = await axios({
    method: "POST",
    url: "http://localhost:5000/api/pictures",
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
      token: token,
      id: id,
    },
  });
  if (result.status === 0) {
    let newToken = await getNewToken();
    localStorage.setItem("accessToken", newToken);
    result = result = await axios({
      method: "POST",
      url: "http://localhost:5000/api/pictures",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        token: newToken,
        id: id,
      },
    });
  }
  return result;
}

async function logOut() {
  const id = localStorage.getItem("userId");
  try {
    const token = localStorage.getItem("accessToken");
    const id = localStorage.getItem("userId");
    if (!token)
      return {
        status: -1,
      };
    let result = axios.put(
      `http://localhost:5000/api/users/${id}`,
      {},
      {
        headers: { token: token, id: id },
      }
    );
  } catch (err) {}
  localStorage.clear();
  return;
}

export { getData, postData, putData, uploadPictures, logOut };
