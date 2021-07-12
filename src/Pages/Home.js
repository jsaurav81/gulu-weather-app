import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_WEATHER_QUERY } from "../graphql/Queries";
import "./Home.css";

function Home() {
  const [citySearched, setCitySearched] = useState("");
  //similar to use state, function is when to call query
  const [getWeather, { loading, data, error }] = useLazyQuery(
    GET_WEATHER_QUERY,
    {
      variables: { name: citySearched },
    }
  );
  if (error) {
    <h1>Error Found</h1>;
  }
  if (data) {
    console.log("data:", data);
  }
  return (
    <div className="home">
      <h1>Search for Weather</h1>
      <input
        type="text"
        placeholder="City name...."
        onChange={(event) => setCitySearched(event.target.value)}
      />
      <button onClick={() => getWeather()} className="search">
        Search
      </button>
      {data && (
        <div className="weather">
          <table id="datatable">
            <tr>
              <td>City</td>
              <td>{data?.getCityByName.name}</td>
            </tr>
            <tr>
              <td>Country</td>
              <td>{data?.getCityByName.country}</td>
            </tr>
            <tr>
              <td>Title</td>
              <td>{data?.getCityByName.weather.summary.title}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{data?.getCityByName.weather.summary.description}</td>
            </tr>
          </table>
        </div>
      )}
    </div>
  );
}

export default Home;
