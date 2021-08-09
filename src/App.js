import { Link, Router } from "@reach/router";

const Home = () => (
  <div>
    Home <Link to="/test">Go to test</Link>
  </div>
);
const PageTest = () => (
  <div>
    Test <Link to="/">Back to home</Link>
  </div>
);

function App() {
  return (
    <>
      <h1>{process.env.REACT_APP_BRAND_NAME}</h1>
      <Router>
        <Home path="/" />
        <PageTest path="test" />
      </Router>
    </>
  );
}

export default App;
