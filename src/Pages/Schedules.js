import { useEffect, useState } from "react";
import { Header } from "../Header";
import { Travel } from "../Components/Travel";

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

const formatTime = (time) => {
  const split = time.split("T");
  const d = `${split[0].substring(0, 4)}/${split[0].substring(
    4,
    6
  )}/${split[0].substring(6)}`;
  const t = `${split[1].substring(0, 2)}:${split[1].substring(
    2,
    4
  )}:${split[1].substring(4)}`;
  return `${d} ${t}`;
};

export const Schedules = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [stopAreas, setStopAreas] = useState([]);
  const [stopArea, setStopArea] = useState("");
  const [arrivalsChecked, setArrivalsChecked] = useState(false);
  const [departuresChecked, setDeparturesChecked] = useState(false);
  const [travelStatus, setTravelStatus] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const split = new Date().toLocaleString("fr-FR").split(" ");
      setDate(split[0]);
      setTime(split[1]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
      if (stopArea) {
        const data = await fetchFromAPI(
          undefined,
          undefined,
          stopArea +
          "/" +
          (arrivalsChecked
            ? "arrivals?"
            : departuresChecked
              ? "departures"
              : "")
        );
        setTravelStatus(data);
        console.log(data);
      }
    })();
  }, [stopArea, arrivalsChecked, departuresChecked]);

  const validate = (event) => {
    setStopArea(event.target.value);
  };

  const changeArrivalsChecked = () => {
    if (!arrivalsChecked && !departuresChecked) {
      setArrivalsChecked(true);
      return;
    }

    setArrivalsChecked(!arrivalsChecked);
    setDeparturesChecked(!departuresChecked);
  };

  const changeDeparturesChecked = () => {
    if (!arrivalsChecked && !departuresChecked) {
      setDeparturesChecked(true);
      return;
    }

    setArrivalsChecked(!arrivalsChecked);
    setDeparturesChecked(!departuresChecked);
  };

  return (
    <>
      <Header />
      <head>
        <title>Schedules</title>
      </head>

      <h1>Welcome to Schedules page !</h1>
      <h2>Date : {date}</h2>
      <h2>Current time: {time}</h2>
      <h3>Pick a station</h3>
      <select onChange={validate}>
        <option>-- Choose an area --</option>
        {stopAreas.map((v, i) => (
          <option value={v.id} key={i}>
            {v.name}
          </option>
        ))}
      </select>
      {stopArea ? (
        <div>
          <label>
            <input
              type="checkbox"
              checked={arrivalsChecked}
              onChange={changeArrivalsChecked}
            />
            Arrivals
          </label>
          <label>
            <input
              type="checkbox"
              checked={departuresChecked}
              onChange={changeDeparturesChecked}
            />
            Departures
          </label>
        </div>
      ) : null}
      {stopArea
        ? arrivalsChecked && travelStatus.arrivals
          ? <Travel
            labels={['Direction', 'Arrival', 'Mode']}
            values={travelStatus.arrivals.map(v =>
              [
                v.display_informations.direction,
                formatTime(v.stop_date_time.arrival_date_time),
                v.route.line.commercial_mode.name
              ]
            )}
          />
          : departuresChecked && travelStatus.departures
            ? <Travel
              labels={['Direction', 'Departure', 'Mode']}
              values={travelStatus.departures.map(v =>
                [
                  v.display_informations.direction,
                  formatTime(v.stop_date_time.departure_date_time),
                  v.route.line.commercial_mode.name
                ]
              )}
            />
            : null
        : null}
    </>
  );
};
