/**
 * The Initial React Setup file
 * ...
 *
 * === CSS
 * The stylesheets are handled seperately using the gulp sass rather than importing them directly into React.
 * You can find these in the ./app/sass/ folder
 *
 * == JS
 * All files in here start from this init point for the React Components.
 *
 *
 * Firstly we need to import the React JS Library
 */
import React from "react";
import ReactDOM from "react-dom";
import { debounce } from "../util/debounce";
import Menu from "./components/menu";
import Home from "./components/home";
import "./sass/main.scss";

/**
 * We can start our initial App here in the main.js file
 */
function App() {
  /**
   * Renders the default app in the window, we have assigned this to an element called root.
   *
   * @returns JSX
   * @memberof App
   */
  const searchRef = React.useRef();
  const [state, setState] = React.useState({
    showingSearch: false,
    searchText: "",
    results: [],
  });

  /**
   * Shows or hides the search container
   * @memberof Menu
   * @param e [Object] - the event from a click handler
   */
  function hideSearchContainer(e) {
    e.preventDefault();
    debounce(
      setState({
        ...state,
        showingSearch: !state.showingSearch,
      }),
      3000
    );
    setTimeout(() => {
      searchRef.current.focus();
    }, 0);
  }

  /**
   * Calls upon search change
   * @memberof Menu
   * @param e [Object] - the event from a text change handler
   */

  function searchFetch(terms) {
    fetch(process.env.REACT_APP_API + `?query=${terms}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) =>
        setState({
          ...state,
          results: data,
        })
      )
      .catch((e) => {
        console.error(e);
      });
  }

  function onSearch(e) {
    let terms = e.target.value;
    if (terms.length !== 0 && terms.length >= 3)
      debounce(searchFetch(terms), 500);
    else
      setState({
        ...state,
        results: [],
      });
  }

  return (
    <div className="App">
      <Menu
        hideSearchContainer={hideSearchContainer}
        onSearch={onSearch}
        results={state.results}
        searchText={state.searchText}
        showingSearch={state.showingSearch}
      />
      <Home />
    </div>
  );
}

// Render this out
ReactDOM.render(<App />, document.getElementById("root"));
