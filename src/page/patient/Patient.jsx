import React from 'react'
import DraggableTable from '../../components/draggablettable/DraggableTable'
import RowPinning from '../../components/draggablettable/RowPinning'
import TableComponent from '../../components/draggablettable/TableComponent'
import { useVisibility } from '../../contexts/VisibilityContext'
import Tabledropdown from '../../components/tabledropdownsearch/Tabledropdown'

const Patient = () => {
    const { isVisible, response, toggleVisibility } = useVisibility();

    return (
        <>

            <h2 className="text-2xl font-bold">pattents</h2>
            <p>Manage your patients here.</p>
            {isVisible && (<Tabledropdown />)}

            <div>
                {/* <RowPinning/> */}
                <TableComponent />
            </div></>
    )
}

export default Patient