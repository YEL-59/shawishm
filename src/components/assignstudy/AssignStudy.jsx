





import { useEffect, useState } from "react";
import ModalContainer from "../modalContainer/ModalContainer";
import axiosInstance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";


const AssignStudy = () => {

    const [activeModal, setActiveModal] = useState(null);
    const [studyData, setStudyData] = useState([]);

    const { id } = useParams();
    const personDetails = studyData?.find((item) => item?.study_uid === id);
    console.log(personDetails);
  
    useEffect(() => {
      axiosInstance
        .get("studies/")
        .then((response) => {
          if (response.data.success) {
            setStudyData(response.data.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);
  

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
                                {/* <img src={person} alt="" /> */}
                                <h1 className='text-primary font-bold text-2xl mt-2'> {personDetails?.pat_inc_id_det?.Pat_Name || "Unknown Patient"}</h1>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <div className='flex justify-between'>
                                    <div><span className='text-gray-400 font-semibold '>Patient ID: :</span></div>
                                    <div><span>131</span></div>
                                </div>
                                <div className='flex justify-between'>
                                    <div><span className='text-gray-400 font-semibold'>Study Date: :</span></div>
                                    <div><span>02/02/2019</span></div>
                                </div>
                                <div className='flex justify-between'>
                                    <div><span className='text-gray-400 font-semibold '>Gender :</span></div>
                                    <div><span> {personDetails?.pat_inc_id_det?.Pat_Sex ||
                        "Unknown Patient"}</span></div>
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
                                <div className="border-b border-black">
                                    <h1 className='text-primary font-bold text-xl mb-10'>Assigned Study
                                    </h1>
                                </div>

                                <div >
                                    <h1 className='text-primary font-bold text-xl mt-10 mb-5'>Assigning Information

                                    </h1>
                                </div>
                                <div>
                                    <form action="">


                                        <div className="grid gap-6 mb-6 md:grid-cols-1">
                                            <div className="relative">
                                                <label for="countries" className="block mb-2 text-[16px] font-medium text-black ">Assign to Radiologist:</label>
                                                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                                    <option selected>Choose a country</option>
                                                    <option value="US">United States</option>
                                                    <option value="CA">Canada</option>
                                                    <option value="FR">France</option>
                                                    <option value="DE">Germany</option>
                                                </select>


                                            </div>
                                            <div className="relative">
                                                <label for="countries" className="block mb-2 text-[16px] font-medium text-black ">Radiologist Group:</label>
                                                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                                    <option selected>Choose a country</option>
                                                    <option value="US">United States</option>
                                                    <option value="CA">Canada</option>
                                                    <option value="FR">France</option>
                                                    <option value="DE">Germany</option>
                                                </select>


                                            </div>

                                            <div>
                                                <label for="phone" className="block text-md mb-2 md:text-md font-medium text-primary">Comment :</label>
                                                <textarea id="message" rows="3" className="block p-2.5 w-full text-sm text-gray-900 bg-[#e7e3e3] rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your thoughts here..."></textarea>

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

