import axios from "axios";
// axios - Node.js
//RAPID API: https://rapidapi.com/apidojo/api/travel-advisor
export const getPlacesData = async (bl_lat, bl_lng, tr_lat, tr_lng, type) => {
  try {
    const {
      //destructure data
      data: { data }, //api returns a data object
    } = await axios.get(
      // api endpoint, we want to pass restaurants, attractions, or hotel as type
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          // if these exist, else use hard coded location. Rochester Hills, MI
          bl_latitude: bl_lat ? bl_lat : "42.62099507235023", //default
          tr_latitude: tr_lat ? tr_lat : "42.71249097457993",
          bl_longitude: bl_lng ? bl_lng : "-83.21378004689228",
          tr_longitude: tr_lng ? tr_lng : "-83.09144900094026",
          limit: "20", // limiting to 20 request, up to 20 cards only
          currency: "USD", // currency of API
          lunit: "mi", // miles of API
          lang: "en_US", // language for API
        },
        headers: {
          "X-RapidAPI-Key": "",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );

    return data;
  } catch (error) {
    return null;
  }
};
