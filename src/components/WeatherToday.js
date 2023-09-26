import moment from "moment";
import { conditionHourlySvg } from "./WeatherComponents";
import { Fragment } from "react";

export default function WeatherToday(props) {

  const objWeather = props.weatherNowForecast;
  const weatherData = objWeather.data;
  let hourlyForecast;

  // console.log(props);
  // console.log(objWeather);
  // console.log(weatherData);

  function renderTodaysForecast(limit) {
    if (objWeather.status == 200) {
      // check api status
      weatherData.forecast.forecastday.forEach((e, i) => {
        hourlyForecast = e.hour.map((hourly, idx) => {
          if (hourly.time_epoch < moment().format("X")) return false;
          return (
            <Fragment key={hourly.time_epoch}>
              <div className="flex flex-col items-center" key={hourly.time_epoch}>
                <span className="font-semibold text-lg text-dark-custom">
                  {hourly.temp_c}°C
                </span>
                {conditionHourlySvg(hourly.condition.text)}
                <span className="font-semibold mt-1 text-sm text-dark-custom">
                  {moment(hourly.time).format("hh:mm")}
                </span>
                <span className="text-xs font-semibold text-gray-400">
                  {moment(hourly.time).format("A")}
                </span>
              </div>
            </Fragment>
          );
        });
      });
      return limit ? hourlyForecast.slice(0, limit) : hourlyForecast;
    }
    return <>None</>;
  }

  return (
    <>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="text-6xl font-bold text-gray-700">
            {objWeather.status === 200 ? parseInt(weatherData.current.temp_c) : "N/A"}
            °C
          </span>
          <span className="font-semibold mt-1 text-gray-500">
            {weatherData.location.name}, {weatherData.location.region} {weatherData.location.country}
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
      <div className="flex justify-between mt-12">
        {renderTodaysForecast(5)}
      </div>
    </>
  );
}