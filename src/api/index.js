import axios from "axios";

const URL = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  try {
    let modifiedUrl=URL;
    if(country){
      modifiedUrl=`${URL}/countries/${country}`;
    }
    const {
      data: { confirmed, recovered, deaths, lastUpdate }
    } = await axios.get(modifiedUrl);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (err) {
    console.log(err);
  }
};

export const fetchDailyData = async () => {
  try {
    const dailyURL = `${URL}/daily`;
    const { data } = await axios.get(dailyURL);

    // console.log(`data : ${dailyData}`);
    const modifiedData = data.map(item => ({
      confirmed: item.confirmed.total,
      deaths: item.deaths.total,
      date: item.reportDate
    }));

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const countryUrl = `${URL}/countries`;
    const {
      data: { countries }
    } = await axios.get(countryUrl);
    // console.log("fetchedCountries=" + countries);
    return countries.map(country => country.name);
  } catch (error) {
    console.log(error);
  }
};
