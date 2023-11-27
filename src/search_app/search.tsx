import "./styles.css";
import { useState } from "react";
import { useAppContext } from "./MyContext";

export const Search = () => {
  const [globalState, dispatch] = useAppContext();
  let tempEvents = globalState.resetEvents;
  const [searchName, setName] = useState("");
  const [searchPrice, setPrice] = useState("");

  const onSearch = (e) => {
    dispatch({
      type: "SEARCH",
      payload: e
    });
  };

  const onReset = (e) => {
    dispatch({
      type: "RESET",
      payload: { events: e }
    });
  };
