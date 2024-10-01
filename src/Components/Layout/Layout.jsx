import React from 'react'
import {Navbar, Header, TaskBoard} from '../../Constants/Components'

const Layout = () => {
  return (
    <div className='layout'>
      <Navbar />
      <div className="mainLayout">
        <Header />
        <TaskBoard />
      </div>
    </div>
  )
}

export default Layout
