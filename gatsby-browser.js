// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

import "prismjs/themes/prism.css"
import React from "react"
import SearchWrapper from "./src/components/searchwrapper"
export const wrapPageElement = ({ element, props }) => {
    return (
    <div>
  <SearchWrapper {...props}>{element}</SearchWrapper>

    </div>
)}