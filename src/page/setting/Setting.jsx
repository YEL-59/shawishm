import React from 'react'
import DraggableTable from '../../components/draggablettable/DraggableTable'
import EnhancedTable from '../../components/draggablettable/EnhancedTable'
import Tabledrag from "../../components/draggablettable/Tabledrag"

const Setting = () => {
  return (
    <>
    
    <div>
      <h2 className="text-2xl font-bold">Settings</h2>
      <p>Manage your settings here.</p>
      {/* <DraggableTable/>  */}
      <Tabledrag/>

      {/* <EnhancedTable/> */}
    </div>
    
    </>
  )
}

export default Setting