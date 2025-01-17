

import { useVisibility } from '../../contexts/VisibilityContext'
import Tabledropdown from '../../components/tabledropdownsearch/Tabledropdown'

const Setting = () => {
  const { isVisible,   } = useVisibility();  
 
  return (
    <>
    {isVisible && (<Tabledropdown/>)}
    <div className="w-auto mx-auto px-4 py-4">
     
    
    </div>
    
    </>
  )
}

export default Setting