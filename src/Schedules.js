import { useEffect, useState } from "react";
import { Header } from "./Header";

const getStopAreasMainInfos = async () => {
  const response = await fetch(process.env.REACT_APP_BASE_URL, {
    method: "GET",
    headers: {
      Authorization: process.env.REACT_APP_API_KEY,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.log(response);
    return [];
  }

  const json = await response.json();
  return json.stop_areas.map((v) => {
    return {
      id: v.id,
      label: v.label,
      name: v.name,
      timezone: v.timezone,
    };
  });
};

export const Schedules = () => {
  const [stopAreas, setStopAreas] = useState([]);

  useEffect(() => {
    (async () => {
      setStopAreas(await getStopAreasMainInfos());
    })();
  }, []);

  return (
    <>
      <Header />
      <h1>Welcome to Schedules page !</h1>
      <select onSelect={() => null}>
        <option>-- Choose an area --</option>
        {stopAreas.map(v => <option value={v.id} key={stopAreas.indexOf(v)}>{v.name}</option>)}
      </select>
    </>
  );
};
