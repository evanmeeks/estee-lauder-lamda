/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 *
 */

import React from "react";

function Menu({
  hideSearchContainer,
  hideMenuSearch,
  onSearch,
  searchRef,
  results,
  showingSearch,
  showingMenu,
}) {
  /**
     * Renders the default app in the window, we have assigned this to an element called root.
     *
     *  {
          "_id": "002",
          "isActive": "true",
          "price": "22.00",
          "picture": "/img/products/N0EN01_430.png",
          "name": "Volume Advance Conditioner",
          "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
          "tags": [
              "ojon",
              "conditioner"
          ]
      },
     * @returns JSX
     * @memberof App
     */

  return (
    <>
      <header
        className="menu"
        onMouseOut={(e) => {
          hideMenuSearch(e);
        }}
      >
        <div
          className="menu-container"
          onMouseOver={(e) => {
            hideMenuSearch(e);
          }}
        >
          <div className="menu-holder">
            <h1>ELC</h1>
            <nav>
              <div className={"showing search-container"}>
                <i className="material-icons search">search</i>
                <input
                  className="search"
                  type="text"
                  ref={searchRef}
                  onChange={onSearch}
                />
                <div
                  role="button"
                  href="#"
                  name="close search"
                  onClick={hideSearchContainer}
                ></div>
              </div>
              <div role="menuitem" className="nav-item">
                HOLIDAY
              </div>
              <div role="menuitem" className="nav-item">
                WHAT'S NEW
              </div>
              <div role="menuitem" className="nav-item">
                PRODUCTS
              </div>
              <div role="menuitem" className="nav-item">
                BESTSELLERS
              </div>
              <div role="menuitem" className="nav-item">
                GOODBYES
              </div>
              <div role="menuitem" className="nav-item">
                STORES
              </div>
              <div role="menuitem" className="nav-item">
                INSPIRATION
              </div>
            </nav>
          </div>
        </div>
        <div className="header-search__results">
          {results?.map(
            (item, index) =>
              index <= 3 && (
                <div
                  className={`${
                    showingSearch
                      ? "hide header-search__result"
                      : "show header-search__result"
                  }`}
                  key={item._id}
                >
                  <span
                    className="header-search__result__image"
                    href={`/product_${item._id}`}
                  >
                    <img alt={`${item.name}`} src={`${item.picture}`} />
                    <div className="header-search_description">{item.name}</div>
                    <div className="header-search_price">${item.price}</div>
                  </span>
                  <div className="header-search_tags">
                    {item.tags.map((tag) => (
                      <a href={`/filter_${tag}`}>
                        <div className="header-search__result__tag">{tag}</div>
                      </a>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      </header>
    </>
  );
}

// Export out the React Component
export default Menu;
