import axios from "axios";

async function getNewToken() {
    let result = await axios.post(
        "http://localhost:5000/api/users/gettoken", {}, {
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
    let result = await axios.post(`http://localhost:5000/${route}`, params, {
        headers: { token: token, id: id },
    });
    console.log("the staus probem is ");
    console.log(result.data);
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
  console.log(result.data.status);
  if (result.data.status === 0) {
    let newToken = await getNewToken();
    localStorage.setItem("accessToken", newToken);
    result = axios.put(`http://localhost:5000/${route}`, params, {
      headers: { token: newToken, id: id },
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
}}

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
            `http://localhost:5000/api/users/${id}`, {}, {
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
    name: "",
  };
  let distance = Math.abs(
    Math.abs(Math.abs(parseFloat(citiesData[0].lat)) - Math.abs(latitude)) +
      Math.abs(Math.abs(parseFloat(citiesData[0].lng)) - Math.abs(longitude))
  );
  citiesData.forEach(function (item, index) {
    if (
      Math.abs(Math.abs(parseFloat(item.lat)) - Math.abs(latitude)) +
        Math.abs(Math.abs(parseFloat(item.lng)) - Math.abs(longitude)) <
      distance
    ) {
      result.name = item.name;
      countriesData.forEach(function (country, index) {
        if (country.code == item.country) {
          result.name += ", " + country.name;
        }
      });
      result.latitude = item.lat;
      result.longitude = item.lng;
      distance =
        Math.abs(Math.abs(parseFloat(item.lat)) - Math.abs(latitude)) +
        Math.abs(Math.abs(parseFloat(item.lng)) - Math.abs(longitude));
    }
  });
  return result;
}

const getCoords = async (userLocation) => {
    return new Promise(async (resolve, reject) => {
  console.warn("getCoords function");
  if (navigator.geolocation) {
    console.log("nice a sat");
    navigator.geolocation.watchPosition(function (position) {
      console.log("getLocation function");
      let locationResult = getLocation(
        position.coords.longitude,
        position.coords.latitude
      );
      console.log("getLocation off");
      let newLocation = { ...userLocation };
      newLocation.location_name = locationResult.name;
      newLocation.latitude = locationResult.latitude;
      newLocation.longitude = locationResult.longitude;
      console.log("getCoords out");
      navigator.geolocation.clearWatch(1);
      resolve( newLocation);
    });    
  } else {
    let ip = await axios.get("https://api.ipify.org/?format=json");
    let geoIpResult = await axios.get(
      `https://api.ipgeolocation.io/ipgeo?apiKey=978b0a54a29146d0a338c509fee94dab&ip=${ip.data.ip}`
    );
    console.log("the result from geoIpResult", geoIpResult.data);
    let locationResult = getLocation(parseFloat(geoIpResult.data.longitude), parseFloat(geoIpResult.data.latitude));
    console.log(
      "the coordinates are ",
      parseFloat(geoIpResult.data.longitude),
      parseFloat(geoIpResult.data.latitude)
    );
    let newLocation = { ...userLocation };
    newLocation.location_name = locationResult.name;
    newLocation.latitude = locationResult.latitude;
    newLocation.longitude = locationResult.longitude;
    console.log("getCoords out");
    resolve( newLocation);
    }
  });} 
  
  function calculate_age(bornDate) {
    let date = bornDate.split('T')[0].split('-');
    let dob = new Date(date[0], date[1], date[2]);
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

export {
  getData,
  postData,
  putData,
  uploadPictures,
  logOut,
  getLocation,
  getCoords,
  calculate_age
};
