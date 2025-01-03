




import person from "../../assets/person.png"
import PlusIcon from '../../assets/icons/PlusIcon'
import { useState } from "react";
import ModalContainer from "../modalContainer/ModalContainer";


const AssignStudy = () => {

    const [activeModal, setActiveModal] = useState(null); 

    const handleOpenModal = (modalName) => {  
        setActiveModal(modalName); 
    };

    const handleCloseModal = () => { 
        setActiveModal(null); 
    };
    return (
        <>

            <div>
                <div className='grid grid-cols-12 gap-5 '>
                    <div className='col-span-3 '>

                        <div className='bg-[#FFFFFF] p-4 rounded shadow-md'>
                            <div className='mb-4 text-start'>
                                <img src={person} alt="" />
                                <h1 className='text-primary font-bold text-2xl mt-2'>Tanzir Rahman</h1>
                            </div>
                            <div className=''>
                                <div className='flex justify-between'>
                                    <div><span className='text-gray-400 font-semibold '>Gender :</span></div>
                                    <div><span>Male</span></div>
                                </div>
                                <div className='flex justify-between'>
                                    <div><span className='text-gray-400 font-semibold'>Age :</span></div>
                                    <div><span>35</span></div>
                                </div>
                            </div>
                        </div>



                        <div className='mt-5 bg-[#FFFFFF] p-4 rounded shadow-md'>

                            <div className=' mb-5'>

                                <h1 className='text-primary font-bold text-2xl'>Notes</h1>
                                <p className='text-primary font-normal text-md'>Knee Pain, Headache</p>


                            </div>
                        </div>
                    </div>
                    <div className='col-span-9 '>



                       







                        <div className='bg-[#FFFFFF] p-10 rounded shadow-md mt-5 h-[500px]'> 
                            <div>
                                <div>
                                    <h1 className='text-primary font-bold text-2xl'>Study Information 
                                    </h1>
                                </div>
                                <div>
                                    <form action="">


                                        <div class="grid gap-6 mb-6 md:grid-cols-1">
                                            <div class="relative">
                                                <label for="first_name" class="block text-md md:text-md font-medium text-primary">First name</label>
                                                <input type="text" id="first_name" class=" border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3 " placeholder="John" required />
                                                {/* <button
                                                    type="button" 

                                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 border p-2 h-5 w-5 "
                                                >
                                                    <PlusIcon />  
                                                </button> */}


                                            </div>
                                            <div>
                                                <label for="last_name" class="block text-md md:text-md font-medium text-primary">Last name</label>
                                                <input type="text" id="last_name" class=" border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3 " placeholder="Doe" required />
                                            </div>

                                            <div>
                                                <label for="phone" class="block text-md md:text-md font-medium text-primary">Phone number</label>
                                                <textarea id="message" rows="3" class="block p-2.5 w-full text-sm text-gray-900 bg-[#e7e3e3] rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your thoughts here..."></textarea>
                                           
                                              </div>
                                              </div>


                                    </form>
                                </div>
                            </div>

                        </div>



                        <div>
                            <div className='flex gap-5 justify-center items-center mt-3'>
                                <div><button className='rounded-lg bg-transparent text-blue px-5 py-2 border font-medium'>cancle</button></div>
                                <button
                                    onClick={() => handleOpenModal("modal5")}
                                    className="rounded-lg bg-blue text-white px-5 py-2 font-medium" 
                                >
                                    Assign 
                                </button>


                                <ModalContainer
                                    activeModal={activeModal} 
                                    handleCloseModal={handleCloseModal}   
                                    handleOpenModal={handleOpenModal} 
                                /> 

                            </div>
                        </div>
                    </div>

                </div>

            </div>


        </>
    )
}

export default AssignStudy

