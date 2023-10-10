import moment from "moment";
import { conditionForecastSvg } from "./WeatherComponents";
import { Fragment } from "react";

import { useState, useEffect } from "react";
import axios from "axios";

export default function WeatherDailyForecast(props) {
  const [city, setCity] = useState(props.city);
  const [weatherForecastResponse, setWeatherForecastResponse] = useState([]);
  const [weatherForecast, setWeatherForecast] = useState([]);
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
        setGeolocation(result);
        setCity(result.data.city);
      });
    };

    if (!city) {
      return;
    }

    getWeatherForecast(city);
  }, [city]);

  const getWeatherForecast = async (city) => {
    axios
      .get(
        `${process.env.OPENWEATHER_API_URL}/data/2.5/forecast?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
      )
      .then((result) => {
        setWeatherForecastResponse(result);
        setWeatherForecast(result.data);
      });
  };

  // const objWeather = props.weatherDailyForecast;
  // const weatherData = objWeather.data;
  let dailyForecast;

  // use forecast request url (5 day / 3 hr forecast): http://api.openweathermap.org/data/2.5/forecast?q=Winnipeg&appid={OPENWEATHER_API_KEY}
  function renderDailyForecast(limit) {
    if (weatherForecastResponse.status == 200) {
      console.log(weatherForecast);
      // check api status
      dailyForecast = weatherForecast.list.map((list, i) => {
        // map forecastday arr right away
        // if (e.date > moment().format("YYYY-MM-DD")) {
        // only map dates not today
        return (
          <Fragment key={list.dt}>
            <div className="flex justify-between items-center text-gray-700">
              <span className="font-semibold text-lg w-1/4">
                {moment(list.dt_txt).format("ddd, DD MMM")}
              </span>
              <div className="flex items-center justify-start w-1/4 pr-10">
                <span className="font-semibold text-sm">
                  {list.weather[0].description.toUpperCase()}{" "}
                </span>
              </div>

              <img
                src={`https://openweathermap.org/img/w/${list.weather[0].icon}.png`}
                alt=""
              />

              <span className="font-semibold text-lg w-1/4 text-right">
                {list.main.temp_min}°C / {list.main.temp_max}°C
              </span>
            </div>
            <div className="flex justify-between items-center text-gray-700">
              <span className="font-semibold text-sm w-1/4">
                Time: {moment(list.dt_txt).format("hh:mmA")}
              </span>
            </div>
            {/* find a place for this (time) */}
          </Fragment>
        );
        // }
      });
      return dailyForecast;
    }
    return <>None</>;
  }
  return <>{renderDailyForecast()}</>;
}
