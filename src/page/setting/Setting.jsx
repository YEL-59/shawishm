import React from 'react'
import DraggableTable from '../../components/draggablettable/DraggableTable'
import EnhancedTable from '../../components/draggablettable/EnhancedTable'

const Setting = () => {
  return (
    <>
    
    <div>
      <h2 className="text-2xl font-bold">Settings</h2>
      <p>Manage your settings here.</p>
      <DraggableTable/> 

      {/* <EnhancedTable/> */}
    </div>
    
    </>
  )
}

export default Setting