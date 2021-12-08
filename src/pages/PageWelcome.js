import { useContext } from "react";
import AppContext from "../AppContext";

const PageWelcome = () => {
  const { siteStatus, toggleStatus } = useContext(AppContext);

  return (
    <div>
      This is the welcome page.
      <p>
        The current status is: <span className="highlight">{siteStatus}</span>
      </p>
      <p>
        <button onClick={toggleStatus}>Toggle Status</button>
      </p>
    </div>
  );
};

export default PageWelcome;
