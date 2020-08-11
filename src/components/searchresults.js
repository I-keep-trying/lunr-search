import React from "react"
import { Link } from "gatsby"
const SearchResults = ({ results, value }) => {
  console.log("value", value)
  return (
    <div>
      {results.length ? (
        <>
          <h2>{results.length} blog(s) matched your query</h2>
          <ul>
            {results.map(result => (
              <li key={result.slug}>
                <Link to={result.slug}>{result.title || result.slug}</Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Sorry, no matches found.</p>
      )}
    </div>
  )
}
export default SearchResults
