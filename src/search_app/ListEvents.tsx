import "./styles.css";
import { useAppContext } from "./MyContext";
export const ListEvents = () => {
  const [globalState, dispatch] = useAppContext();

  return (
    <div>
      <h5>List Events</h5>
      <br />
      <table>
        <thead>
          <tr>
            <td>
              <b>City</b>
            </td>
            <td>
              <b>Artist</b>
            </td>
            <td>
              <b>Price</b>
            </td>
            <td>
              <b>Date</b>
            </td>
          </tr>
        </thead>
        <tbody>
          <Events obj={globalState.events} />
        </tbody>
      </table>
    </div>
  );
};

/*const ResetBtn = () => {
  const [ dispatch] = useAppContext();
  const onReset = (e) => {
    dispatch({
      type: "RESET",
      payload: { events: e }
    });
  };

  return (
    <button
      type="button"
      id="searchBtn"
      onClick={onReset(globalState.resetEvents)}
    >
      Reset
    </button>
  );
};*/

const Events = (val) => {
  const rows = [];
  const values = Object.values(val)[0];
  //console.log(values);

  if (values.length !== 0) {
    values.forEach((row, key) => {
      const { name, city, price, date } = row;
      rows.push(
        <tr key={key}>
          <td>{city}</td>
          <td>{name}</td>
          <td>{price}</td>
          <td>{date}</td>
        </tr>
      );
    });
  } else {
    rows.push(
      <tr key="0">
        <td colSpan="4">Sorry event does not exist</td>
      </tr>
    );
  }

  return rows;
};
