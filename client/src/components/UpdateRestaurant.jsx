import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { RestaurantsContext } from "../context/RestaurantContext";
import RestaurantFinder from "../apis/RestaurantFinder";

const UpdateRestaurant = (props) => {
  const navigate = useNavigate();
  // id is passed through as params
  const { id } = useParams();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        // received as arr from restaurants
        console.log(response.data.data.restaurants);
        setName(response.data.data.restaurants.name);
        setLocation(response.data.data.restaurants.location);
        setPriceRange(response.data.data.restaurants.price_range);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
        name,
        location,
        price_range: priceRange,
      });
      // received as arr from restaurants
      console.log(updatedRestaurant);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1></h1>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input
            value={name && name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            className="form-control"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="location">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            id="location"
            className="form-control"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="price_ranger">Price Range</label>
          <input
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            type="text"
            id="price_range"
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
