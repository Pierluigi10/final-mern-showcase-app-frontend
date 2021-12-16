import { useContext } from "react";
import AppContext from "../AppContext";

const PageWelcome = () => {
  const { currentUser } = useContext(AppContext);
  console.log(currentUser);
  return (
    <div>
     
      <h1>FINAL MERN Showcase App</h1>
      {/* <h2>
        Current User: {currentUser.firstName} {currentUser.lastName}
      </h2> */}
      {currentUser.login !== 'anonymousUser' && (
          <>
            <h2>Welcome {currentUser.login}</h2>
          </>
        )}
    </div>
  );
};

export default PageWelcome;
