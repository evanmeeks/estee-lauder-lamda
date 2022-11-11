/**
 * This file will hold the Main content that lives in the main body of the site
 *
 */
import React from "react";

class Home extends React.Component {
  /**
   * Renders the default app in the window, we have assigned this to an element called root.
   *
   * @returns JSX
   * @memberof Home
   */
  render() {
    return (
      <section id="home" onMouseEnter={this.props.hideMenuSearch}>
        <div className="content">
          {this.props.results?.map((result) => (
            <div className="home-search__result" key={result._id}>
              <span href={`/product_${result._id}`}>
                <img
                  className="home-search__result__image"
                  alt={`${result.name}`}
                  src={`${result.picture}`}
                />
                <div className="home-search_description">{result.name}</div>
                <div className="home-search_price">${result.price}</div>
              </span>
              <div className="home-search_tags">
                {result.tags.map((tag) => (
                  <a href={`/filter_${tag}`}>
                    <div className="home-search__result__tag">{tag}</div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export default Home;
