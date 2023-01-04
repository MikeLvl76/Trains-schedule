import { Header } from "./Header";

export const Home = () => {
  return (
    <>
      <Header />
      <div>
        <h1>Welcome to the app !</h1>
        <button onClick={() => console.log("Clicked !")}>View schedules</button>
      </div>
    </>
  );
};
