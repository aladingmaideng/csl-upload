import { Suspense, lazy } from "react";
import './index.css';
const A = lazy(() => import("./A"));
const App = () => {
  return (
    <div>
      我是App1
      <br />
      <Susponse>
        <A />
      </Susponse>
    </div>
  );
};

export default App;
