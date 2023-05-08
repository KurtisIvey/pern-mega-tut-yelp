import { useState, createContext } from "react";
import PropTypes from "prop-types";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);

  const addRestaurants = (restaurant) => {
    setRestaurants([...restaurants, restaurant]);
  };

  return (
    <RestaurantsContext.Provider
      value={{ restaurants, setRestaurants, addRestaurants }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};

RestaurantsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
