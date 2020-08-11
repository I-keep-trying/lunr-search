import React, { useState, useRef } from "react"
import lunr, { Index } from "lunr"
import { graphql, useStaticQuery } from "gatsby"
import SearchResults from "./searchresults"

const SearchWidget = () => {
  const inputEl = useRef(null)
  const [value, setValue] = useState("")
  // results is now a state variable
  const [results, setResults] = useState([])
console.log('value',value)
  const { LunrIndex } = useStaticQuery(graphql`
    query {
      LunrIndex
    }
  `)
  const index = Index.load(LunrIndex.index)
  const { store } = LunrIndex

  const handleChange = e => {
    const query = e.target.value || ""
    setValue(query)
    if (!query.length) {
      setResults([])
    }
    const keywords = query.trim().replace(/\*/g, "").toLowerCase().split(/\s+/)

    if (keywords[keywords.length - 1].length < 2) {
      return
    }
    try {
      let andSearch = []
      keywords
        .filter(el => el.length > 1)
        .forEach((el, i) => {
          // per-single-keyword results
          const keywordSearch = index
            .query(function (q) {
              q.term(el, {
                editDistance: el.length > 5 ? 1 : 0,
              })
              q.term(el, {
                wildcard:
                  lunr.Query.wildcard.LEADING | lunr.Query.wildcard.TRAILING,
              })
            })
            .map(({ ref }) => {
              return {
                slug: ref,
                ...store[ref],
              }
            })
          andSearch =
            i > 0
              ? andSearch.filter(x =>
                  keywordSearch.some(el => el.slug === x.slug)
                )
              : keywordSearch
        })
      setResults(andSearch)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="search-wrapper">
      <form role="search">
        <label htmlFor="search-input" className="visually-hidden"></label>
        <input
          id="search-input"
          ref={inputEl}
          type="search"
          value={value}
          onChange={handleChange}
          placeholder="Search blog title or content"
        />
      </form>
      {value.trim().length > 1 && <SearchResults value={value} results={results} />}
    </div>
  )
}

export default SearchWidget
