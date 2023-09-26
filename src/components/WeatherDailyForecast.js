import moment from "moment";
import { conditionForecastSvg } from "./WeatherComponents";
import { Fragment } from "react";

export default function WeatherDailyForecast(props) {
  
  const objWeather = props.weatherDailyForecast;
  const weatherData = objWeather.data
  let dailyForecast;
  
  // use forecast request url (5 day / 3 hr forecast): http://api.openweathermap.org/data/2.5/forecast?q=Winnipeg&appid={OPENWEATHER_API_KEY}
  function renderDailyForecast(limit) {
    if (objWeather.status == 200) {
      // check api status
      dailyForecast = weatherData.forecast.forecastday.map((e, i) => {
        // map forecastday arr right away
        if (e.date > moment().format("YYYY-MM-DD")) {
          // only map dates not today
          return (
            <Fragment key={e.date_epoch}>
              <div className="flex justify-between items-center text-gray-700">
                <span className="font-semibold text-lg w-1/4">
                  {moment(e.date).format("ddd, DD MMM")}
                </span>
                <div className="flex items-center justify-end w-1/4 pr-10">
                  <span className="font-semibold"> 12% </span>{" "}
                  {/* chance of rain % */}
                  {/* chance of rain svg */}
                  <svg
                    className="w-6 h-6 fill-current ml-1"
                    viewBox="0 0 16 20"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g transform="matrix(1,0,0,1,-4,-2)">
                      <path
                        d="M17.66,8L12.71,3.06C12.32,2.67 11.69,2.67 11.3,3.06L6.34,8C4.78,9.56 4,11.64 4,13.64C4,15.64 4.78,17.75 6.34,19.31C7.9,20.87 9.95,21.66 12,21.66C14.05,21.66 16.1,20.87 17.66,19.31C19.22,17.75 20,15.64 20,13.64C20,11.64 19.22,9.56 17.66,8ZM6,14C6.01,12 6.62,10.73 7.76,9.6L12,5.27L16.24,9.65C17.38,10.77 17.99,12 18,14C18.016,17.296 14.96,19.809 12,19.74C9.069,19.672 5.982,17.655 6,14Z"
                        //style="fill-rule:nonzero;"
                      />
                    </g>
                  </svg>
                </div>
                {/* sunny svg */}
                {/* <svg
                  className="h-8 w-8 fill-current w-1/4"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41 1.79-1.8-1.41-1.41z" />
                </svg> */}
                {conditionForecastSvg(e.day.condition.text)}
                {/* cloudy svg */}
                {/* <svg
                  className="h-8 w-8 fill-current w-1/4"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M12.01 6c2.61 0 4.89 1.86 5.4 4.43l.3 1.5 1.52.11c1.56.11 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3h-13c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.95 6 12.01 6m0-2C9.12 4 6.6 5.64 5.35 8.04 2.35 8.36.01 10.91.01 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96C18.68 6.59 15.65 4 12.01 4z" />
                </svg> */}
                <span className="font-semibold text-lg w-1/4 text-right">
                  {e.day.mintemp_c}° / {e.day.maxtemp_c}°
                </span>
              </div>
            </Fragment>
          );
        }
      });
      return dailyForecast;
    }
    return <>None</>;
  }
  return <>{renderDailyForecast()}</>;
}