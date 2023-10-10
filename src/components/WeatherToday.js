import moment from "moment";
import { conditionHourlySvg } from "./WeatherComponents";
import { Fragment } from "react";

import { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";

export default function WeatherToday(props) {
  const [geolocation, setGeolocation] = useState([]);
  const [city, setCity] = useState(props.city);
  const [weatherDataTodayResponse, setWeatherDataTodayResponse] = useState([]);
  const [weatherDataToday, setWeatherDataToday] = useState([]);
  const [weatherForecastResponse, setWeatherForecastResponse] = useState([]);
  const [weatherForecast, setWeatherForecast] = useState([]);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const loader = (
    <div className="text-center">
      <div role="status">
        <svg
          aria-hidden="true"
          className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );

  useEffect(() => {
    console.log(city);
    const loadInitialData = async () => {
      axios.get("http://ip-api.com/json").then((result) => {
        // console.log(result);
        setGeolocation(result);
        setCity(result.data.city);
        // let cityResult = result.data.city;
        // if (city) getWeatherDataToday(cityResult);
      });
    };

    if (!city) {
      return;
    }

    getWeatherDataToday(city);
  }, [city]);

  const getWeatherDataToday = async (city, days = 2) => {
    axios
      .get(
        `${process.env.WEATHER_API_URL}/v1/forecast.json?q=${city}&key=${process.env.WEATHER_API_KEY}&days=${days}&aqi=no&alerts=no`
      )
      .then((result) => {
        console.log(result);
        setWeatherDataTodayResponse(result);
        setWeatherDataToday(result.data);
      });
  };

  function renderWeatherToday() {
    return (
      <>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-6xl font-bold text-gray-700">
              {Object.keys(weatherDataTodayResponse).length &&
              weatherDataTodayResponse.status === 200
                ? parseInt(weatherDataToday.current.temp_c)
                : "N/A"}
              °C
            </span>
            <span className="font-semibold mt-1 text-gray-500">
              {Object.keys(weatherDataTodayResponse).length &&
              weatherDataTodayResponse.status === 200
                ? `${weatherDataToday.location.name}, ${weatherDataToday.location.region} ${weatherDataToday.location.country}`
                : "Loading Data..."}
            </span>
          </div>
          <svg
            className="h-24 w-24 fill-current text-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41 1.79-1.8-1.41-1.41z" />
          </svg>
        </div>
      </>
    );
  }

  function renderTodaysForecast(limit) {
    let hourlyForecast;
    // check api status
    if (weatherDataTodayResponse.status == 200) {
      // map by forecastday(s). by default we get 2 days forecast to display enough data to cover from late night to next day
      hourlyForecast = weatherDataToday.forecast.forecastday.map((day, i) => {
        return day.hour.map((hourElement, idx) => {
          if (hourElement.time_epoch < moment().format("X")) return false;

          return (
            <Fragment key={hourElement.time_epoch}>
              <div
                className="flex flex-col items-center"
                key={hourElement.time_epoch}
              >
                <span className="font-semibold text-lg text-dark-custom">
                  {hourElement.temp_c}°C
                </span>
                {conditionHourlySvg(hourElement.condition.text)}
                <span className="font-semibold mt-1 text-sm text-dark-custom">
                  {moment(hourElement.time).format("hh:mm")}
                </span>
                <span className="text-xs font-semibold text-gray-400">
                  {moment(hourElement.time).format("A")}
                </span>
              </div>
            </Fragment>
          );
        });
      });

      // this is for hourly forecasts that are separated by multiple indexes/days
      // this is by default to get weather data today and next day
      if (hourlyForecast.length > 1) {
        // combine all indexes/days into one index
        let combinedForecast = [];
        hourlyForecast.forEach((fc) => {
          combinedForecast.push(...fc);
        });
        // filter out data where false
        combinedForecast = combinedForecast.filter((element) => {
          return element != false;
        });

        return limit ? combinedForecast.slice(0, limit) : combinedForecast;
      }

      return limit ? hourlyForecast.slice(0, limit) : hourlyForecast;
    }
    return <>None</>;
  }

  return (
    <>
      {Object.keys(weatherDataToday).length ? renderWeatherToday() : loader}
      <div className="flex justify-between mt-12">
        {renderTodaysForecast(5)}
      </div>
    </>
  );
}
