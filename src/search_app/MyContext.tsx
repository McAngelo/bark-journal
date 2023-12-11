import { useReducer, useContext, createContext } from "react";
import * as eventsData from "../public/events";

const flattenEvents = (mData) => {
  let flattenedData:any = [];

  if (!mData) return;
  mData.forEach((data:any) => {
    flattenedData.push(...data.events);
    if (Array.isArray(data.children) && data.children.length > 0) {
      flattenedData = flattenedData.concat(flattenEvents(data.children));
    }
  });
  return flattenedData;
};

const initialValue = {
  events: flattenEvents(eventsData.children),
  resetEvents: flattenEvents(eventsData.children)
};

const AppContext = createContext(initialValue);

const AppReducer = (state:any, action:any) => {
  switch (action.type) {
    case "SEARCH":
      return {
        ...state,
        ...action.payload
      };
    case "RESET":
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

const MyContext = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialValue);
  return (
    <AppContext.Provider value = {[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
export default MyContext;
