
"use client";
import moment from "moment";
import { conditionHourlySvg } from "./WeatherComponents";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function WeatherToday(props) {
  const [ weatherData, setWeatherData ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState("");
// console.log(process.env.OPENWEATHER_API_URL + "/v1/forecast.json?key=" + process.env.OPENWEATHER_API_KEY + "&q=" + "Winnipeg" + "&days=" + "6");
  // useEffect(() => {
  //   console.log("useEffect");
  //   // getWeatherData();
  // }, []);

  const getWeatherData = useCallback(() => {
    console.log("getWeatherData");
    const URL = process.env.OPENWEATHER_API_URL + "/v1/forecast.json?key=" + process.env.OPENWEATHER_API_KEY + "&q=" + "Winnipeg" + "&days=" + "6";
    axios.get(URL)
    .then(data => {
      console.log(data); // this works
      return data;
    })
    .catch(err => console.log(err));
  });
// getWeatherData();
// useEffect(() => {  
//   (async () => {
//    const response = await apiDetails(); 
//    setData({
//       name: response.data.name,
//       id: response.data.id,
//     });
//   })();
//  }, [])
  useEffect(() => {
    (async () => {
      console.log("useEffect async");
      const response = await getWeatherData();
      console.log(response);
      setWeatherData(response);
      console.log(weatherData);
    })();
    // if(weatherData.length) {
    //   console.log("weatherData has data");
    //   console.log(weatherData);
    // }
  }, []);

  // if(weatherData) {
  //   console.log(weatherData);
  //   return <>{weatherData}</>
  // }

  // function renderTodaysForecast(limit) {
  //   if (props.weatherNowForecast.status == 200) {
  //     // check api status
  //     weatherData.forecast.forecastday.forEach((e, i) => {
  //       hourlyForecast = e.hour.map((hourly, idx) => {
  //         if (hourly.time_epoch < moment().format("X")) return false;
  //         return (
  //           <>
  //             <div className="flex flex-col items-center">
  //               <span className="font-semibold text-lg text-dark-custom">
  //                 {hourly.temp_c}°C
  //               </span>
  //               {conditionHourlySvg(hourly.condition.text)}
  //               {/* <svg
  //                 className="h-10 w-10 fill-current text-gray-400 mt-3"
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 height="24"
  //                 viewBox="0 0 24 24"
  //                 width="24"
  //               >
  //                 <path d="M0 0h24v24H0V0z" fill="none" />
  //                 <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41 1.79-1.8-1.41-1.41z" />
  //               </svg> */}
  //               <span className="font-semibold mt-1 text-sm text-dark-custom">
  //                 {moment(hourly.time).format("hh:mm")}
  //               </span>
  //               <span className="text-xs font-semibold text-gray-400">
  //                 {moment(hourly.time).format("A")}
  //               </span>
  //             </div>
  //           </>
  //         );
  //       });
  //     });
  //     return limit ? hourlyForecast.slice(0, limit) : hourlyForecast;
  //   }
  //   return <>None</>;
  // }

  // // console.log(props);
  // // console.log(Object.keys(props.weatherNowForecast.main));
  // const city = props.weatherNowForecast.name;
  // // const weatherData = props.weatherNowForecast.main; // openapi
  // const weatherData = props.weatherNowForecast;
  // let location = weatherData.location;
  // let hourlyForecast;
  // let dailyForecast;

  // // request url for WeatherAPI http://api.weatherapi.com/v1/forecast.json?key={OPENWEATHER_API_KEY}&q=Winnipeg&days=6&aqi=no&alerts=no
  // // request url https://api.openweathermap.org/data/2.5/weather?q=Winnipeg&appid={OPENWEATHER_API_KEY}
  // /**
  //  * Returns today's forecast
  //  * @param {*} limit
  //  * @returns
  //  */
  // function renderTodaysForecast(limit) {
  //   if (props.weatherNowForecast.status == 200) {
  //     // check api status
  //     weatherData.forecast.forecastday.forEach((e, i) => {
  //       hourlyForecast = e.hour.map((hourly, idx) => {
  //         if (hourly.time_epoch < moment().format("X")) return false;
  //         return (
  //           <>
  //             <div className="flex flex-col items-center">
  //               <span className="font-semibold text-lg text-dark-custom">
  //                 {hourly.temp_c}°C
  //               </span>
  //               {conditionHourlySvg(hourly.condition.text)}
  //               {/* <svg
  //                 className="h-10 w-10 fill-current text-gray-400 mt-3"
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 height="24"
  //                 viewBox="0 0 24 24"
  //                 width="24"
  //               >
  //                 <path d="M0 0h24v24H0V0z" fill="none" />
  //                 <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41 1.79-1.8-1.41-1.41z" />
  //               </svg> */}
  //               <span className="font-semibold mt-1 text-sm text-dark-custom">
  //                 {moment(hourly.time).format("hh:mm")}
  //               </span>
  //               <span className="text-xs font-semibold text-gray-400">
  //                 {moment(hourly.time).format("A")}
  //               </span>
  //             </div>
  //           </>
  //         );
  //       });
  //     });
  //     return limit ? hourlyForecast.slice(0, limit) : hourlyForecast;
  //   }
  //   return <>None</>;
  // }

  // // use forecast request url (5 day / 3 hr forecast): http://api.openweathermap.org/data/2.5/forecast?q=Winnipeg&appid={OPENWEATHER_API_KEY}
  // function renderDailyForecast(limit) {
  //   // console.log(moment().format("YYYY-MM-DD"));
  //   if (props.weatherNowForecast.status == 200) {
  //     // check api status
  //     weatherData.forecast.forecastday.forEach((e, i) => {
  //       // only map forecast for upcoming days
  //       if (e.date >= moment().format("YYYY-MM-DD")) {
  //         dailyForecast = e.hour.map((hourly, idx) => {
  //           // console.log(hourly.time_epoch);
  //           if (hourly.time_epoch < moment().format("X")) return false;
  //           return (
  //             <>
  //               <div className="flex justify-between items-center text-gray-700">
  //                 <span className="font-semibold text-lg w-1/4">
  //                   Fri, 22 Jan
  //                 </span>
  //                 <div className="flex items-center justify-end w-1/4 pr-10">
  //                   <span className="font-semibold">12%</span>
  //                   <svg
  //                     className="w-6 h-6 fill-current ml-1"
  //                     viewBox="0 0 16 20"
  //                     version="1.1"
  //                     xmlns="http://www.w3.org/2000/svg"
  //                   >
  //                     <g transform="matrix(1,0,0,1,-4,-2)">
  //                       <path
  //                         d="M17.66,8L12.71,3.06C12.32,2.67 11.69,2.67 11.3,3.06L6.34,8C4.78,9.56 4,11.64 4,13.64C4,15.64 4.78,17.75 6.34,19.31C7.9,20.87 9.95,21.66 12,21.66C14.05,21.66 16.1,20.87 17.66,19.31C19.22,17.75 20,15.64 20,13.64C20,11.64 19.22,9.56 17.66,8ZM6,14C6.01,12 6.62,10.73 7.76,9.6L12,5.27L16.24,9.65C17.38,10.77 17.99,12 18,14C18.016,17.296 14.96,19.809 12,19.74C9.069,19.672 5.982,17.655 6,14Z"
  //                         //style="fill-rule:nonzero;"
  //                       />
  //                     </g>
  //                   </svg>
  //                 </div>
  //                 <svg
  //                   className="h-8 w-8 fill-current w-1/4"
  //                   xmlns="http://www.w3.org/2000/svg"
  //                   height="24"
  //                   viewBox="0 0 24 24"
  //                   width="24"
  //                 >
  //                   <path d="M0 0h24v24H0V0z" fill="none" />
  //                   <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41 1.79-1.8-1.41-1.41z" />
  //                 </svg>
  //                 <span className="font-semibold text-lg w-1/4 text-right">
  //                   18° / 32°
  //                 </span>
  //               </div>
  //               {/* <div className="flex flex-col items-center">
  //                 <span className="font-semibold text-lg text-dark-custom">
  //                   {hourly.temp_c}°C
  //                 </span>
  //                 <svg
  //                   className="h-10 w-10 fill-current text-gray-400 mt-3"
  //                   xmlns="http://www.w3.org/2000/svg"
  //                   height="24"
  //                   viewBox="0 0 24 24"
  //                   width="24"
  //                 >
  //                   <path d="M0 0h24v24H0V0z" fill="none" />
  //                   <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41 1.79-1.8-1.41-1.41z" />
  //                 </svg>
  //                 <span className="font-semibold mt-1 text-sm text-dark-custom">
  //                   {moment(hourly.time).format("hh:mm")}
  //                 </span>
  //                 <span className="text-xs font-semibold text-gray-400">
  //                   {moment(hourly.time).format("A")}
  //                 </span>
  //               </div> */}
  //             </>
  //           );
  //         });
  //       }
  //     });
  //     return limit ? hourlyForecast.slice(0, limit) : hourlyForecast;
  //   }
  //   return <>None</>;
  // }

  return (
    <>
      <div className="flex justify-between">
        <div className="flex flex-col">
          {/* <span className="text-6xl font-bold text-gray-700">{weatherData.status ? parseInt(weatherData.temp * 0.1) : "N/A"}°C</span> */
          /* openapi */}
          <span className="text-6xl font-bold text-gray-700">
            {/* {process.env.OPENWEATHER_API_URL + "/v1/forecast.json?key=" + process.env.OPENWEATHER_API_KEY + "&q=" + "Winnipeg" + "&days=" + "6"} */}
            {/* {weatherData.status ? parseInt(weatherData.current.temp_c) : "N/A"} */}
            °C
          </span>
          <span className="font-semibold mt-1 text-gray-500">
            {/* {location.name}, {location.region} {location.country} */}
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
        {/* {renderTodaysForecast(5)} */}
      </div>
      {/* {renderDailyForecast()} */}
      {/* {props.weatherNowForecast?.length} */}
      {/* <div className="flex justify-between mt-12"> */}
      {/* {props.weatherNowForcast.map((forecast) => {
          <div className="flex flex-col items-center">
            <span className="font-semibold text-lg text-dark-custom">
              {forecast.weather}°C
            </span>
          </div>;
        })} */}

      {/* <div className="flex flex-col items-center">
          <span className="font-semibold text-lg text-dark-custom">29°C</span>
          <svg
            className="h-10 w-10 fill-current text-gray-400 mt-3"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41 1.79-1.8-1.41-1.41z" />
          </svg>
          <span className="font-semibold mt-1 text-sm text-dark-custom">
            11:00
          </span>
          <span className="text-xs font-semibold text-gray-400">AM</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-semibold text-lg text-dark-custom">31°C</span>
          <svg
            className="h-10 w-10 fill-current text-gray-400 mt-3"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41 1.79-1.8-1.41-1.41z" />
          </svg>
          <span className="font-semibold mt-1 text-sm text-dark-custom">
            1:00
          </span>
          <span className="text-xs font-semibold text-gray-400">PM</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-semibold text-lg text-dark-custom">32°C</span>
          <svg
            className="h-10 w-10 fill-current text-gray-400 mt-3"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M12.01 6c2.61 0 4.89 1.86 5.4 4.43l.3 1.5 1.52.11c1.56.11 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3h-13c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.95 6 12.01 6m0-2C9.12 4 6.6 5.64 5.35 8.04 2.35 8.36.01 10.91.01 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96C18.68 6.59 15.65 4 12.01 4z" />
          </svg>
          <span className="font-semibold mt-1 text-sm text-dark-custom">
            3:00
          </span>
          <span className="text-xs font-semibold text-gray-400">PM</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-semibold text-lg text-dark-custom">31°C</span>
          <svg
            className="h-10 w-10 fill-current text-gray-400 mt-3"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M12.01 6c2.61 0 4.89 1.86 5.4 4.43l.3 1.5 1.52.11c1.56.11 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3h-13c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.95 6 12.01 6m0-2C9.12 4 6.6 5.64 5.35 8.04 2.35 8.36.01 10.91.01 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96C18.68 6.59 15.65 4 12.01 4z" />
          </svg>
          <span className="font-semibold mt-1 text-sm text-dark-custom">
            5:00
          </span>
          <span className="text-xs font-semibold text-gray-400">PM</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-semibold text-lg text-dark-custom">27°C</span>
          <svg
            className="h-10 w-10 fill-current text-gray-400 mt-3"
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 24 24"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <g>
              <rect fill="none" height="24" width="24" />
            </g>
            <g>
              <g>
                <path d="M19.78,17.51c-2.47,0-6.57-1.33-8.68-5.43C8.77,7.57,10.6,3.6,11.63,2.01C6.27,2.2,1.98,6.59,1.98,12 c0,0.14,0.02,0.28,0.02,0.42C2.61,12.16,3.28,12,3.98,12c0,0,0,0,0,0c0-3.09,1.73-5.77,4.3-7.1C7.78,7.09,7.74,9.94,9.32,13 c1.57,3.04,4.18,4.95,6.8,5.86c-1.23,0.74-2.65,1.15-4.13,1.15c-0.5,0-1-0.05-1.48-0.14c-0.37,0.7-0.94,1.27-1.64,1.64 c0.98,0.32,2.03,0.5,3.11,0.5c3.5,0,6.58-1.8,8.37-4.52C20.18,17.5,19.98,17.51,19.78,17.51z" />
                <path d="M7,16l-0.18,0C6.4,14.84,5.3,14,4,14c-1.66,0-3,1.34-3,3s1.34,3,3,3c0.62,0,2.49,0,3,0c1.1,0,2-0.9,2-2 C9,16.9,8.1,16,7,16z" />
              </g>
            </g>
          </svg>
          <span className="font-semibold mt-1 text-sm text-dark-custom">
            7:00
          </span>
          <span className="text-xs font-semibold text-gray-400">PM</span>
        </div> */}
      {/* </div> */}
    </>
  );
}
