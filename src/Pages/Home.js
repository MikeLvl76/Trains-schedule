import { Link } from "react-router-dom";
import { Header } from "../Components/Header";

export const Home = () => {
  return (
    <>
      <head>
        <title>Home</title>
      </head>
      <Header />
      <div>
        <h1>Welcome to the app !</h1>
        <Link to='/schedules'><button>View schedules</button></Link>
      </div>
    </>
  );
};
