import person from "../../assets/person.png";
import { useEffect, useState } from "react";
import ModalContainer from "../modalContainer/ModalContainer";
import { Controller, useForm } from "react-hook-form";
import axiosInstance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";

const Editstudy = () => {
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

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <div>
        <div className="grid grid-cols-12 gap-5 ">
          <div className="col-span-3 ">
            <div className="bg-[#FFFFFF] p-4 rounded shadow-md">
              <div className="mb-4 text-start">
                <img src={person} alt="" />
                <h1 className="text-primary font-bold text-2xl mt-2">
                  {personDetails?.pat_inc_id_det?.Pat_Name || "Unknown Patient"}
                </h1>
              </div>
              <div className="">
                <div className="flex justify-between">
                  <div>
                    <span className="text-gray-400 font-semibold ">
                      Gender :
                    </span>
                  </div>
                  <div>
                    <span>
                      {" "}
                      {personDetails?.pat_inc_id_det?.Pat_Sex ||
                        "Unknown Patient"}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <span className="text-gray-400 font-semibold">Age :</span>
                  </div>
                  <div>
                    <span>
                      {studyData?.pat_inc_id_det?.Pat_DOB
                        ? (() => {
                            const dob = new Date(
                              studyData.pat_inc_id_det.Pat_DOB
                            );
                            const currentDate = new Date();
                            const currentYear = currentDate.getFullYear();
                            const birthYear = dob.getFullYear();
                            //const birthMonth = dob.getMonth();
                            //const birthDay = dob.getDate();

                            let age = currentYear - birthYear;

                            // if (currentDate.getMonth() < birthMonth || (currentDate.getMonth() === birthMonth && currentDate.getDate() < birthDay)) {
                            //   age--;
                            // }

                            return age;
                          })()
                        : "Unknown"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 bg-[#FFFFFF] p-4 rounded shadow-md">
              <div className=" mb-5">
                <h1 className="text-primary font-bold text-2xl">
                  Assigned Doctor
                </h1>
                <p className="text-primary font-normal text-md">
                  {" "}
                  {personDetails?.radiologist_name || "Unknown Patient"}
                </p>
              </div>
            </div>

            <div className="mt-5 bg-[#FFFFFF] p-4 rounded shadow-md">
              <div className=" mb-5">
                <h1 className="text-primary font-bold text-2xl">Notes</h1>
                <p className="text-primary font-normal text-md">
                  {personDetails?.study_description || "Unknown Patient"}
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-9 ">
            <div className="bg-[#FFFFFF] p-10 rounded shadow-md">
              <div>
                <div>
                  <h1 className="text-primary font-bold text-2xl">
                    Patient Information
                  </h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid gap-6 mb-6 md:grid-cols-2">
                    {/* Patient Name */}
                    <div>
                      <label
                        htmlFor="patientName"
                        className="block text-md md:text-md font-medium text-primary"
                      >
                        Patient Name
                      </label>
                      <input
                        {...register("patientName", { required: true })}
                        type="text"
                        id="patientName"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                        placeholder={
                          personDetails?.pat_inc_id_det?.Pat_Name ||
                          "Enter name"
                        }
                      />
                      {errors.patientName && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>

                    {/* Patient ID */}
                    <div>
                      <label
                        htmlFor="patientID"
                        className="block text-md md:text-md font-medium text-primary"
                      >
                        Patient ID
                      </label>
                      <input
                        {...register("patientID", { required: true })}
                        type="text"
                        id="patientID"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                        placeholder={
                          personDetails?.pat_inc_id_det?.Pat_ID || "Enter ID"
                        }
                      />
                      {errors.patientID && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>

                    {/* Gender */}
                    <div>
                      <label
                        htmlFor="gender"
                        className="block text-md md:text-md font-medium text-primary"
                      >
                        Gender
                      </label>
                      <div className="flex gap-4">
                        <div>
                          <input
                            {...register("gender", { required: true })}
                            type="radio"
                            id="male"
                            value="Male"
                            className="focus:ring-blue-500 focus:border-blue-500"
                          />
                          <label
                            htmlFor="male"
                            className="ml-2 text-sm text-gray-900"
                          >
                            Male
                          </label>
                        </div>
                        <div>
                          <input
                            {...register("gender", { required: true })}
                            type="radio"
                            id="female"
                            value="Female"
                            className="focus:ring-blue-500 focus:border-blue-500"
                          />
                          <label
                            htmlFor="female"
                            className="ml-2 text-sm text-gray-900"
                          >
                            Female
                          </label>
                        </div>
                      </div>
                      {errors.gender && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>

                    {/* Birth Date */}
                    <div>
                      <label
                        htmlFor="birthDate"
                        className="block text-md md:text-md font-medium text-primary"
                      >
                        Birth Date
                      </label>
                      <input
                        {...register("birthDate", { required: true })}
                        type="date"
                        id="birthDate"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                        placeholder={
                          personDetails?.pat_inc_id_det?.Pat_DOB || "Enter date"
                        }
                      />
                      {errors.birthDate && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>

                    {/* Cell Phone */}
                    <div>
                      <label
                        htmlFor="cellPhone"
                        className="block text-md md:text-md font-medium text-primary"
                      >
                        Cell Phone
                      </label>
                      <input
                        {...register("cellPhone", { required: true })}
                        type="text"
                        id="cellPhone"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                        placeholder={
                          personDetails?.pat_inc_id_det?.Pat_Phone ||
                          "Enter phone"
                        }
                      />
                      {errors.cellPhone && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>

                    {/* Notes */}
                    <div>
                      <label
                        htmlFor="notes"
                        className="block text-md md:text-md font-medium text-primary"
                      >
                        Notes
                      </label>
                      <input
                        {...register("notes", { required: true })}
                        type="text"
                        id="notes"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                        placeholder={
                          personDetails?.study_description || "Enter notes"
                        }
                      />
                      {errors.notes && (
                        <span className="text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div>
              <div className="flex gap-5 justify-center items-center mt-3">
                <div>
                  <button className="rounded-lg bg-transparent text-blue px-5 py-2 border font-medium">
                    Cancel
                  </button>
                </div>
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
  );
};

export default Editstudy;
