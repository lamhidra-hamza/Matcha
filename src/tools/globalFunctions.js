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
  try {
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
  } catch (err) {
    throw err;
  }
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
  console.log(result.data);
  if (result.data.status === 0) {
    let newToken = await getNewToken();
    localStorage.setItem("accessToken", newToken);
    result = axios.put(`http://localhost:5000/${route}`, params, {
      headers: { token: newToken, id: id },
    });
    console.log("the staus probem is ");
    console.log(result.data);
    if (result.data && result.data.status === 0) {
      let newToken = await getNewToken();
      localStorage.setItem("accessToken", newToken);
      result = axios.put(`http://localhost:5000/${route}`, params, {
        headers: { token: newToken, id: id },
      });
    }
    return result;
  }
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
  try {
    const token = localStorage.getItem("accessToken");
    const id = localStorage.getItem("userId");
    if (!token)
      return {
        status: -1,
      };
    axios.put(
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
        if (country.code === item.country) {
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
    if (navigator.geolocation) {
      let newLocation = { ...userLocation };
      navigator.geolocation.getCurrentPosition(
        function (position) {
          let locationResult = getLocation(
            position.coords.longitude,
            position.coords.latitude
          );
          newLocation.location_name = locationResult.name;
          newLocation.latitude = position.coords.latitude;
          newLocation.longitude = position.coords.longitude;
          console.log("the coordinates are", position.coords.latitude, position.coords.longitude);
          resolve(newLocation);
        },
        async function (erro) {
          let ip = await axios.get("https://api.ipify.org/?format=json");
          let geoIpResult = await axios.get(
            `http://ip-api.com/json/${ip.data.ip}`
          );
          newLocation.location_name = geoIpResult.data.city + " " + geoIpResult.data.country;
          newLocation.latitude = geoIpResult.data.lat;
          newLocation.longitude = geoIpResult.data.long;
          resolve(newLocation);
        },
        {
          enableHighAccuracy: true,
          timeout: 2000,
          maximumAge: 0,
        }
      );
    }
  });
};

function calculate_age(bornDate) {
  if (!bornDate)
    return null;
  console.log("====>", bornDate);
  let date = bornDate.split("T")[0].split("-");
  let dob = new Date(date[0], date[1], date[2]);
  var diff_ms = Date.now() - dob.getTime();
  var age_dt = new Date(diff_ms);
  return Math.abs(age_dt.getUTCFullYear() - 1970);
}

function notifyMe(message) {
  // Let's check if the browser supports notifications

  // Let's check whether notification permissions have already been granted
  if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    //eslint-disable-next-line
    var notification = new Notification(message);
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
                          //eslint-disable-next-line
        var notification = new Notification(message);
      }
    });
  }
  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}

export {
  getData,
  postData,
  putData,
  uploadPictures,
  logOut,
  getLocation,
  getCoords,
  calculate_age,
  notifyMe
};
