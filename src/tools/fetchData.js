import axios from "axios";

async function getNewToken() {
  let result = await axios.post(
    "http://localhost:5000/api/users/gettoken",
    {},
    {
      withCredentials: true,
    }
  );
  if (result.data.status === 1)
    return result.data.accessToken;
  return null;
}

export default async function getData(token, callBackFctn) {
  let result = await callBackFctn(token);
  if (result.data.status === 0) {
      let newToken = await getNewToken();
      result = await callBackFctn(newToken);
  }
  return result;
}
