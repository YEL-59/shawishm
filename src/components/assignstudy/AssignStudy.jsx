import { useEffect, useState } from "react";
import ModalContainer from "../modalContainer/ModalContainer";
import axiosInstance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

const AssignStudy = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [studyData, setStudyData] = useState([]);
  const { id } = useParams();
  console.log("the id is :",id)
  const {
    control, register, handleSubmit, reset, formState: { errors },} = useForm();

  // Fetch study data
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

  const personDetails = studyData?.find( (item) => item?.study_Inc_ID === Number(id) );
  

  const members =
    personDetails?.radiology_group?.Rg_Members?.split(",").map((member) =>member.trim() ) || [];
  const refmembers =
    personDetails?.ref_inc?.Ref_Phy_Name?.split(",").map((member) => member.trim() ) || [];

  const onSubmit = (data) => {
    const payload = {
      ref_inc: parseInt(data.refPhysician),
      radiology_group: parseInt(data.radiologistGroup),
      othercomments: data.comment,
    };

    axiosInstance.put(`studies/${id}/assignstudies/`, payload)
      .then((response) => {
        if (response.data.success) {
          alert("Study assigned successfully!");
          reset();
        }
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        alert("Failed to assign study.");
      });
  };
  const handleOpenModal = (modalName) => {
    setActiveModal(modalName);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <>
      <div>
        <div className="grid grid-cols-12 gap-5 ">
          {/* Left Panel */}
          <div className="col-span-3 ">
            <div className="bg-[#FFFFFF] p-4 rounded shadow-md">
              <div className="mb-4 text-start">
                <h1 className="text-primary font-bold text-2xl mt-2">
                  {personDetails?.pat_inc_id_det?.Pat_Name || "Unknown Patient"}
                </h1>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <span className="text-gray-400 font-semibold">
                    Patient ID:
                  </span>
                  <span>{personDetails?.pat_inc_id_det?.Pat_ID || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-semibold">
                    Study Date:
                  </span>
                  <span>{personDetails?.studydate || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-semibold">Gender:</span>
                  <span>
                    {personDetails?.pat_inc_id_det?.Pat_Sex || "Unknown"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-semibold">Age:</span>
                  <span>35</span>
                </div>
              </div>
            </div>
            <div className="mt-5 bg-[#FFFFFF] p-4 rounded shadow-md">
              <h1 className="text-primary font-bold text-2xl">Notes</h1>
              <p className="text-primary font-normal text-md">
                {personDetails?.study_description || "No notes available"}
              </p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="col-span-9 ">
            <div className="bg-[#FFFFFF] p-10 rounded shadow-md mt-5 h-[500px]">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="text-primary font-bold text-xl mb-5">
                  Assigning Information
                </h1>
                <div className="grid gap-6 mb-6 md:grid-cols-1">
                  {/* Referring Physician */}
                  <div>
                    <label
                      htmlFor="refPhysician"
                      className="block text-md font-medium text-primary"
                    >
                      Assign to Referring Physician:
                    </label>
                    <Controller
                      name="refPhysician"
                      control={control}
                      rules={{ required: "Referring physician is required" }}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                        >
                          <option value="">Select Physician</option>
                          {refmembers.map((member, index) => (
                            <option key={index} value={index + 1}>
                              {member}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    {errors.refPhysician && (
                      <p className="text-red-500 text-sm">
                        {errors.refPhysician.message}
                      </p>
                    )}
                  </div>

                  {/* Radiologist Group */}
                  <div>
                    <label htmlFor="radiologistGroup" className="block text-md font-medium text-primary" >
                      Radiologist Group
                    </label>
                    <Controller
                      name="radiologistGroup"
                      control={control}
                      rules={{ required: "Radiologist group is required" }}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                        >
                          <option value="">Select Group</option>
                          {members.map((member, index) => (
                            <option key={index} value={index + 1}>
                              {member}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    {errors.radiologistGroup && (
                      <p className="text-red-500 text-sm">
                        {errors.radiologistGroup.message}
                      </p>
                    )}
                  </div>

                  {/* Comment */}
                  <div>
                    <label
                      htmlFor="comment"
                      className="block text-md font-medium text-primary"
                    >
                      Comment
                    </label>
                    <textarea
                      {...register("comment", { required: true })}
                      id="comment"
                      rows="3"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-[#e7e3e3] rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Write your thoughts here..."
                    ></textarea>
                    {errors.comment && (
                      <p className="text-red-500 text-sm">
                        {errors.comment.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-5 justify-center items-center mt-3 ">
                  <button
                    type="button"
                    className="rounded-lg bg-transparent text-blue px-5 py-2 border font-medium"
                    onClick={() => reset()}
                  >
                    Cancel
                  </button>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignStudy;
