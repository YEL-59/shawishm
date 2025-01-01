import React from 'react'
import DraggableTable from '../../components/draggablettable/DraggableTable'
import EnhancedTable from '../../components/draggablettable/EnhancedTable'
import Tabledrag from "../../components/draggablettable/Tabledrag"

const Setting = () => {
  return (
    <>
    
    <div className="w-auto mx-auto px-4 py-4">
     
      {/* <DraggableTable/>  */}
      <Tabledrag/>

      {/* <EnhancedTable/> */}
    </div>
    
    </>
  )
}

export default Setting