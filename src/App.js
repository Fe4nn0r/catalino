import Home from "./carrefour/home/Home";

function App() {
  return (
    <>
      <h1>{process.env.REACT_APP_BRAND_NAME}</h1>
      <Home />
    </>
  );
}

export default App;
