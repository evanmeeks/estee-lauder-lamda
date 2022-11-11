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
import { debounce } from "./scripts/util/debounce";
import Menu from "./scripts/components/menu";
import Home from "./scripts/components/home";
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
    showingMenu: true,
    searchText: "",
    results: [],
  });

  /**
   * Shows or hides the search container
   * @memberof Menu
   * @param e [Object] - the event from a click handler
   */

  function hideSearchContainer(e) {
    e?.preventDefault();

    setState((state) => {
      return {
        ...state,
        showingSearch: false,
      };
    });
  }

  function hideMenuSearch(e) {
    e?.preventDefault();

    setState((state) => {
      return {
        ...state,
        showingMenu: !!state?.showingSearch,
        showingSearch: !state?.showingSearch,
      };
    });
  }

  function getAll() {
    fetch(process.env.REACT_APP_API + `/all-results`, {
      method: "GET",
    })
      .then((response) => response?.json())
      .then((data) => {
        setState((state) => {
          return {
            ...state,
            allResults: data,
          };
        });
      })
      .catch((e) => {
        console?.error(e);
      });

    if (state?.results?.length >= 0) hideSearchContainer(null);
  }

  function searchFetch(terms) {
    fetch(process.env.REACT_APP_API + `?query=${terms}`, {
      method: "GET",
    })
      .then((response) => response?.json())
      .then((data) => {
        setState((state) => {
          return {
            ...state,
            results: data,
          };
        });
      })

      .catch((e) => {
        console?.error(e);
      });

    if (state?.results?.length >= 0) hideSearchContainer(null);
  }

  function onSearch(e) {
    let terms = e?.target.value;
    console?.log("onSearc termsh", terms);
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
        searchRef={searchRef}
        hideSearchContainer={hideSearchContainer}
        hideMenuSearch={hideMenuSearch}
        onSearch={onSearch}
        results={state?.results}
        searchText={state?.searchText}
        showingSearch={state?.showingSearch}
        showingMenu={state?.showingMenu}
      />
      <pre>{JSON.stringify(state?.showingMenu, null, 4)}</pre>

      <Home
        hideSearchContainer={hideSearchContainer}
        results={state?.results}
      />
    </div>
  );
}
export default App;
