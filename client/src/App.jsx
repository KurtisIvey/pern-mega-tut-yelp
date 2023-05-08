import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import UpdatePage from "./routes/UpdatePage";
import { RestaurantsContextProvider } from "./context/RestaurantContext";

function App() {
  return (
    <RestaurantsContextProvider>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/restaurants/:id"
              exact
              element={<RestaurantDetailPage />}
            />
            <Route
              path="/restaurants/:id/update"
              exact
              element={<UpdatePage />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </RestaurantsContextProvider>
  );
}

export default App;
