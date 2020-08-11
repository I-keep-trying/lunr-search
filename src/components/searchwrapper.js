import React from "react"
import SearchWidget from "./searchwidget"

const SearchWrapper = ({ children }) => (
  <>
    <SearchWidget />
    {children}

  </>
)

export default SearchWrapper
