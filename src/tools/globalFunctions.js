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
  if (result.data.status === 0) {
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
  console.log(`put data and the route is ${route}`);
  
  const token = localStorage.getItem("accessToken");
  const id = localStorage.getItem("userId");
  if (!token)
    return {
      status: -1,
    };
  let result = await axios.put(`http://localhost:5000/${route}`, params, {
    headers: { token: token, id: id },
  });
  console.log("the staus probem is ");
  console.log(result.data);
  if (result.data.status === 0) {
    let newToken = await getNewToken();
    localStorage.setItem("accessToken", newToken);
    result = axios.put(`http://localhost:5000/${route}`, params, {
      headers: { token: newToken, id: id },
    });
  }
  return result;
}

//
async function uploadPictures(data, pic_id) {
  const token = localStorage.getItem("accessToken");
  const id = localStorage.getItem("userId");
  console.log("uploadPictures functions");
  if (!token)
    return {
      status: -1,
    };
  let result = await axios({
    method: "POST",
    url: `http://localhost:5000/api/pictures/${pic_id}`,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
      token: token,
      id: id,
    },
  });
  if (result.data.status === 0) {
    console.log("let get a new token");
    let newToken = await getNewToken();
    localStorage.setItem("accessToken", newToken);
    result = result = await axios({
      method: "POST",
      url: `http://localhost:5000/api/pictures/${pic_id}`,
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

function getLocation(longitude, latitude) {
  const citiesData = require("../locationData/cities.json");
  const countriesData = require("../locationData/countries.json");

  let result = {
    longitude: 0,
    latitude: 0, 
    name : ""
  }
  let distance = Math.abs(
    Math.abs(
      Math.abs(parseFloat(citiesData[0].lat)) - Math.abs(latitude)
    ) +
      Math.abs(
        Math.abs(parseFloat(citiesData[0].lng)) -
          Math.abs(longitude)
      )
  );
  citiesData.forEach(function (item, index) {
    if (
      Math.abs(
        Math.abs(parseFloat(item.lat)) - Math.abs(latitude)
      ) +
        Math.abs(
          Math.abs(parseFloat(item.lng)) - Math.abs(longitude)
        ) <
      distance
    ) {
      result.name = item.name;
      countriesData.forEach(function(country, index){
        if (country.code == item.country){
          result.name += ", " + country.name;
        }
      });
      result.latitude = item.lat;
      result.longitude = item.lng;
      distance =
        Math.abs(
          Math.abs(parseFloat(item.lat)) - Math.abs(latitude)
        ) +
        Math.abs(
          Math.abs(parseFloat(item.lng)) - Math.abs(longitude)
        );
    }
  });
  return result;
}

export { getData, postData, putData, uploadPictures, logOut, getLocation };
