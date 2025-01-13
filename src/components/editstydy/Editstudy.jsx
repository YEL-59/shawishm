
import person from "../../assets/person.png"
import PlusIcon from '../../assets/icons/PlusIcon'
import { useState } from "react";
import ModalContainer from "../modalContainer/ModalContainer";


const Editstudy = () => {

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

                                <h1 className='text-primary font-bold text-2xl'>Assigned Doctor</h1>
                                <p className='text-primary font-normal text-md'>Dr.Manager</p>


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



                        <div className='bg-[#FFFFFF] p-10 rounded shadow-md'>
                            <div>
                                <div>
                                    <h1 className='text-primary font-bold text-2xl'>Personal Information </h1>
                                </div>
                                <div>
                                    <form action="">


                                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                                            <div>
                                                <label for="first_name" className="block text-md md:text-md font-medium text-primary">First name</label>
                                                <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3 " placeholder="John" required />
                                            </div>
                                            <div>
                                                <label for="last_name" className="block text-md md:text-md font-medium text-primary">Last name</label>
                                                <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3 " placeholder="Doe" required />
                                            </div>
                                            <div>
                                                <label for="company" className="block text-md md:text-md font-medium text-primary">Company</label>
                                                <input type="text" id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3 " placeholder="Flowbite" required />
                                            </div>
                                            <div>
                                                <label for="phone" className="block text-md md:text-md font-medium text-primary">Phone number</label>
                                                <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3 " placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                                            </div>
                                            <div>
                                                <label for="website" className="block text-md md:text-md font-medium text-primary">Website URL</label>
                                                <input type="url" id="website" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3 " placeholder="flowbite.com" required />
                                            </div>
                                            <div>
                                                <label for="visitors" className="block text-md md:text-md font-medium text-primary">Unique visitors (per month)</label>
                                                <input type="number" id="visitors" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3 " placeholder="" required />
                                            </div>
                                        </div>


                                    </form>
                                </div>
                            </div>

                        </div>







                        <div className='bg-[#FFFFFF] p-10 rounded shadow-md mt-5'>
                            <div>
                                <div>
                                    <h1 className='text-primary font-bold text-2xl'>Study Information
                                    </h1>
                                </div>
                                <div>
                                    <form action="">


                                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                                            <div className="relative">
                                                <label for="first_name" className="block text-md md:text-md font-medium text-primary">Procedure Name</label>
                                                <input type="text" id="first_name" className=" border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3 " placeholder="Procedure Name" required />
                                            </div>
                                            <div>
                                                <label for="last_name" className="block text-md md:text-md font-medium text-primary">Study ID</label>
                                                <input type="text" id="last_name" className=" border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3 " placeholder="Study ID" required />
                                            </div>

                                            <div>
                                                <label for="phone" className="block text-md md:text-md font-medium text-primary">Study Description
                                                </label>
                                                <textarea id="message" rows="3" className="block p-2.5 w-full text-sm text-gray-900 bg-[#e7e3e3] rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your thoughts here..."></textarea>
                                            </div>
                                            <div>
                                                <label for="company" className="block text-md md:text-md font-medium text-primary">Study Date</label>
                                                <input type="text" id="company" className=" border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3 " placeholder="Flowbite" required />
                                            </div>
                                            <div>
                                                <label for="website" className="block text-md md:text-md font-medium text-primary">Ref.Physican</label>
                                                <input type="url" id="website" className=" border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3 " placeholder="flowbite.com" required />
                                            </div>
                                            <div>
                                                <label for="visitors" className="block text-md md:text-md font-medium text-primary">Radiologist</label>
                                                <input type="number" id="visitors" className=" border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3 " placeholder="" required />
                                            </div>
                                            <div>
                                                <label for="last_name" className="block text-md md:text-md font-medium text-primary">Radiologist Group</label>
                                                <input type="text" id="last_name" className=" border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3 " placeholder="Doe" required />
                                            </div>

                                            <div>
                                                <label for="last_name" className="block text-md md:text-md font-medium text-primary">Comment </label>


                                                <textarea id="message" rows="3" className="block p-2.5 w-full text-sm text-gray-900 bg-[#e7e3e3] rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your thoughts here..."></textarea>
                                            </div>
                                            <div>
                                                <label for="last_name" className="block text-md md:text-md font-medium text-primary">Institution Name </label>
                                                <input type="text" id="last_name" className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3 " placeholder="Doe" required />
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
                                    onClick={() => handleOpenModal("modal1")}
                                    className="rounded-lg bg-blue text-white px-5 py-2 font-medium"
                                >
                                    Save
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

export default Editstudy