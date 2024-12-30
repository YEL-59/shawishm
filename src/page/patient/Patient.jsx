import React from 'react'
import DraggableTable from '../../components/draggablettable/DraggableTable'
import RowPinning from '../../components/draggablettable/RowPinning'

const Patient = () => {
    return (
        <>

            <h2 className="text-2xl font-bold">pattents</h2>
            <p>Manage your patients here.</p>

            <div>
               <RowPinning/>
            </div></>
    )
}

export default Patient