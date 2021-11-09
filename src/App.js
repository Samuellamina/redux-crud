import React from "react";
import "rsuite/dist/rsuite.min.css";
import { CustomProvider } from "rsuite";
import Comments from "./features/comments/Comments";

const App = () => {
  return (
    <CustomProvider theme="dark">
      <div className="App">
        <Comments />
      </div>
    </CustomProvider>
  );
};

export default App;
