import React from 'react'
import Header from './Header'
import './LayoutStyle.css'



const Layout = props => (
  <div class="layoutstyle">

    {props.children}

  </div>
)

export default Layout