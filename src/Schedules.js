import { useEffect, useState } from "react";
import { Header } from "./Header";

const fetchFromAPI = async (
  authorization = process.env.REACT_APP_API_KEY,
  base_url = process.env.REACT_APP_BASE_URL,
  extend_url = ""
) => {
  console.log(base_url + extend_url);
  const response = await fetch(base_url + extend_url, {
    method: "GET",
    headers: {
      Authorization: authorization,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.log(`Error: ${response.status}`);
    return [];
  }

  return await response.json();
};

export const Schedules = () => {
  const [stopAreas, setStopAreas] = useState([]);
  const [stopArea, setStopArea] = useState();
  const [arrivalsChecked, setArrivalsChecked] = useState(true);
  const [departuresChecked, setDeparturesChecked] = useState(false);
  const [arrivals, setArrivals] = useState('');
  const [departures, setDepartures] = useState('');

  useEffect(() => {
    (async () => {
      const data = await fetchFromAPI();
      setStopAreas(
        data.stop_areas.map((v) => {
          return {
            id: v.id,
            label: v.label,
            name: v.name,
            timezone: v.timezone,
          };
        })
      );
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await fetchFromAPI(undefined, undefined, stopArea + "/");
      console.log(data);
    })();
  }, [stopArea]);

  useEffect(() => {
    (async () => {
      if (stopArea) {
        if (arrivalsChecked) {
          const data = await fetchFromAPI(
            undefined,
            undefined,
            stopArea + "/arrivals?"
          );
          setArrivals(data.arrivals.toString());
        }

        if (departuresChecked) {
          const data = await fetchFromAPI(
            undefined,
            undefined,
            stopArea + "/departures?"
          );
          setDepartures(data.departures.toString());
        }

      }
    })();
  }, [stopArea, arrivalsChecked, departuresChecked]);

  const validate = (event) => {
    setStopArea(event.target.value);
  };

  const handleChange = () => {
    setArrivalsChecked(!arrivalsChecked);
    setDeparturesChecked(!departuresChecked);
  };

  return (
    <>
      <Header />
      <h1>Welcome to Schedules page !</h1>
      <h3>Area</h3>
      <select onChange={validate}>
        <option>-- Choose an area --</option>
        {stopAreas.map((v) => (
          <option value={v.id} key={stopAreas.indexOf(v)}>
            {v.name}
          </option>
        ))}
      </select>
      {stopArea && (
        <div>
          <label>
            <input
              type="checkbox"
              checked={arrivalsChecked}
              onChange={handleChange}
            />
            Arrivals
          </label>
          <label>
            <input
              type="checkbox"
              checked={departuresChecked}
              onChange={handleChange}
            />
            Departures
          </label>
        </div>
      )}
      <p>1: {arrivals}</p>
      <p>2: {departures}</p>
    </>
  );
};
