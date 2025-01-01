import React from 'react'
import DraggableTable from '../../components/draggablettable/DraggableTable'
import EnhancedTable from '../../components/draggablettable/EnhancedTable'
import Tabledrag from "../../components/draggablettable/Tabledrag"
import { ModalProvider } from '../../contexts/ModalContext'
import Modal from '../../components/modal/Modal'

const Setting = () => {
  return (
    <>
    
    <div className="w-auto mx-auto px-4 py-4">
     
      {/* <DraggableTable/>  */}
     
      <ModalProvider>
      <Tabledrag/>
      <Modal /> {/* Add the Modal component here */}
    </ModalProvider>

      {/* <EnhancedTable/> */}
    </div>
    
    </>
  )
}

export default Setting