import "./styles.css";
import { useState } from "react";
import { useAppContext } from "./MyContext";

export const Search = () => {
  const [globalState, dispatch] = useAppContext();
  const { events, resetEvents } = globalState;
  let tempEvents = resetEvents;
  const [searchName, setName] = useState("");
  const [searchPrice, setPrice] = useState("");

  const onSearch = (e: any) => {
    dispatch({
      type: "SEARCH",
      payload: e
    });
  };

  const onReset = (e: any) => {
    dispatch({
      type: "RESET",
      payload: { events: e }
    });
  };

   const filterOnSearch = () => {
    let events = [];
    // If both Search fields are empty reset the event list
    if (!searchName && !searchPrice) {
      return onReset(resetEvents);
    }

    // Search with both Name and Price fields
    if (searchName && searchPrice) {
      events = tempEvents.filter((data: any) => {
        return data.city.match(searchName) && data.price <= searchPrice;
      });
      return onSearch({ events });
    }

    // Search with only the Name field
    if (searchName) {
      events = tempEvents.filter((data: any) => {
        return data.city.match(searchName);
      });
      return onSearch({ events });
    }
    // Search with only the Price field
    if (searchPrice) {
      events = tempEvents.filter((data: any) => {
        return data.price <= searchPrice;
      });
      return onSearch({ events });
    }

    tempEvents = resetEvents;
  };

  return (
    <div className="App">
      <input
        type="text"
        id="searchName"
        placeholder="Enter city name"
        onChange={(e) => setName(e.target.value)}
        value={searchName}
      />
      <input
        type="number"
        id="searchPrice"
        placeholder="Enter price"
        onChange={(e) => setPrice(e.target.value)}
        value={searchPrice}
      />
      <button type="button" id="searchBtn" onClick={filterOnSearch}>
        Search
      </button>
    </div>
  );
};