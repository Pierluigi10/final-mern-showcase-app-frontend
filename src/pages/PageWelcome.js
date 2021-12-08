import { useContext } from "react";
import AppContext from "../AppContext";

const PageWelcome = () => {
  const { currentUser } = useContext(AppContext);
  return (
    <div>
      <h1>FINAL MERN Showcase App</h1>
      <h2>
        Current User: {currentUser.firstName} {currentUser.lastName}
      </h2>
    </div>
  );
};

export default PageWelcome;
