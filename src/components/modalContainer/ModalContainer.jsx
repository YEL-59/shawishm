
import RightIcon from "../../assets/icons/RightIcon";
import CrossIcon from "../../assets/icons/CrossIcon";
import Deleteicon from "../../assets/icons/Deleteicon";
import SearchIcon from "../../assets/icons/SearchIcon";
import LoadIcon from "../../assets/icons/LoadingIcon";

const ModalContainer = ({ activeModal, handleCloseModal, handleOpenModal, }) => {
    return (
        <>
            {/* Modal 1 */}
            {activeModal === "modal1" && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 ">
                    <div className="bg-white rounded-lg shadow-lg w-96 relative">
                        {/* Close Button */}
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-5 right-3 text-gray-500 hover:text-gray-700"
                            aria-label="Close"
                        >
                            <CrossIcon />
                        </button>

                        {/* Modal Content */}
                        <div className="p-12 text-center">
                            <h2 className="text-4xl font-bold text-primary">Save Changes</h2>
                            <p className="text-gray-600 mt-2">
                                Are you sure you want to save these changes?
                            </p>

                            {/* Action Buttons */}
                            <div className="mt-10 flex justify-around space-x-3">

                                <button
                                    onClick={handleCloseModal}
                                    className="bg-transparent border text-primary px-4 py-1 rounded font-medium hover:bg-red-600 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleOpenModal("modal2")}
                                    className="bg-[#17AF17] text-white px-4 py-1 rounded font-medium hover:bg-green-600 transition"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            )}

            {/* Modal 2 */}
            {activeModal === "modal2" && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 ">
                    <div className="bg-white rounded-lg shadow-lg w-96  relative">
                        {/* Close Button */}
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-5 right-3 text-gray-500 hover:text-gray-700"
                            aria-label="Close"
                        >
                            <CrossIcon />
                        </button>

                        {/* Modal Content */}
                        <div className="p-12 text-center flex flex-col items-center justify-center">
                            <RightIcon />

                            <h2 className="text-4xl font-bold text-[#17AF17]">Saved!</h2>
                            <p className=" text-sm font-normal max-w-sm leading-5 mt-2">
                                You are successfully save all new changes
                            </p>

                            {/* Action Buttons */}
                            {/* <div className="mt-10 flex justify-around space-x-3">

                             <button
                                 onClick={handleCloseModal}
                                 className="bg-transparent border text-primary px-4 py-1 rounded font-medium hover:bg-red-600 transition"
                             >
                                 Cancel
                             </button>
                             <button
                                 onClick={() => handleOpenModal("modal2")}
                                 className="bg-[#17AF17] text-white px-4 py-1 rounded font-medium hover:bg-green-600 transition"
                             >
                                 Save
                             </button>
                         </div> */}
                        </div>
                    </div>
                </div>
            )}
            {/* Modal 3 */}
            {activeModal === "modal3" && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 ">
                    <div className="bg-white rounded-lg shadow-lg w-96  relative">
                        {/* Close Button */}
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-5 right-3 text-gray-500 hover:text-gray-700"
                            aria-label="Close"
                        >
                            <CrossIcon />
                        </button>

                        {/* Modal Content */}
                        <div className="p-12 text-center flex flex-col items-center justify-center">
                            <RightIcon />

                            <h2 className="text-4xl font-bold text-[#17AF17]">Deleted!</h2>
                            <p className=" text-sm font-normal max-w-sm leading-5 mt-2">
                                You are successfully save all new changes
                            </p>

                            {/* Action Buttons */}
                            <div className="mt-10 flex justify-around space-x-3">

                                <button
                                    onClick={handleCloseModal}
                                    className="bg-transparent border text-primary px-4 py-1 rounded font-medium hover:bg-red-600 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleOpenModal("modal4")}
                                    className="bg-[#17AF17] text-white px-4 py-1 rounded font-medium hover:bg-green-600 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Modal 4 */}
            {activeModal === "modal4" && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 ">
                    <div className="bg-white rounded-lg shadow-lg w-96  relative">
                        {/* Close Button */}
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-5 right-3 text-gray-500 hover:text-gray-700"
                            aria-label="Close"
                        >
                            <CrossIcon />
                        </button>

                        {/* Modal Content */}
                        <div className="p-12 text-center flex flex-col items-center justify-center">
                            <Deleteicon />

                            <h2 className="text-4xl font-bold text-[#F73B3B]">Deleted!!</h2>
                            <p className=" text-sm font-normal max-w-sm leading-5 mt-2">
                                The item has deleted
                            </p>


                        </div>
                    </div>
                </div>
            )}




            {/* Modal 5 */}
            {activeModal === "modal5" && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 ">
                    <div className="bg-white rounded-lg shadow-lg w-96  relative">
                        {/* Close Button */}
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-5 right-3 text-gray-500 hover:text-gray-700"
                            aria-label="Close"
                        >
                            <CrossIcon />
                        </button>

                        {/* Modal Content */}
                        <div className="p-12 text-center flex flex-col items-center justify-center">
                            <RightIcon />

                            <h2 className="text-4xl font-bold text-[#17AF17]">Assigned!</h2>
                            <p className=" text-sm font-normal max-w-sm leading-5 mt-2">
                                You are successfully save all new changes
                            </p>

                            {/* Action Buttons */}
                            <div className="mt-10 flex gap-5 ">

                                <button
                                    onClick={handleCloseModal}
                                    className="bg-transparent border text-primary px-4 py-1 rounded font-medium hover:bg-red-600 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleOpenModal("modal6")}
                                    className="bg-[#17AF17] text-white px-4 py-1 rounded font-medium hover:bg-green-600 transition"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Modal 6 */}
            {activeModal === "modal6" && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 ">
                    <div className="bg-white rounded-lg shadow-lg w-96  relative">
                        {/* Close Button */}
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-5 right-3 text-gray-500 hover:text-gray-700"
                            aria-label="Close"
                        >
                            <CrossIcon />
                        </button>

                        {/* Modal Content */}
                        <div className="p-12 text-center flex flex-col items-center justify-center">
                            <RightIcon />

                            <h2 className="text-4xl font-bold text-[#17AF17]">assigned!</h2>
                            <p className=" text-sm font-normal max-w-sm leading-5 mt-2">
                                You are successfully save all new changes
                            </p>

                            {/* Action Buttons */}
                            {/* <div className="mt-10 flex justify-around space-x-3">

                             <button
                                 onClick={handleCloseModal}
                                 className="bg-transparent border text-primary px-4 py-1 rounded font-medium hover:bg-red-600 transition"
                             >
                                 Cancel
                             </button>
                             <button
                                 onClick={() => handleOpenModal("modal4")}
                                 className="bg-[#17AF17] text-white px-4 py-1 rounded font-medium hover:bg-green-600 transition"
                             >
                                 Save
                             </button>
                         </div> */}
                        </div>
                    </div>
                </div>
            )}
            {/* Modal 7 */}

      
{activeModal === "modal7" && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg relative w-full max-w-7xl max-h-full">
      {/* Modal Header */}
      <div className="p-5 flex justify-between items-center border-b border-gray-200">
        <h1 className="text-lg font-semibold text-gray-800">Merge Patient</h1>
        <button
          onClick={handleCloseModal}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <CrossIcon />
        </button>
      </div>

      {/* Modal Content */}
      <div className="p-8">
        <h1 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Determine the Patients
        </h1>

        {/* Form 1 */}
        <form className="w-full mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Name */}
            <div className="col-span-1">
              <label
                htmlFor="first_name"
                className="block text-md font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                placeholder="John"
                required
              />
            </div>

            {/* Last Name */}
            <div className="col-span-1">
              <label
                htmlFor="last_name"
                className="block text-md font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                placeholder="Doe"
                required
              />
            </div>

            {/* Buttons */}
            <div className="col-span-1 flex items-center gap-3 justify-center">
              <button
                type="button"
                className="flex items-center text-gray-500 hover:text-gray-700"
              >
                <SearchIcon />
              </button>
              <button
                type="button"
                className="flex items-center text-gray-500 hover:text-gray-700"
              >
                <LoadIcon />
              </button>
            </div>
          </div>
        </form>

        {/* Form 2 */}
        <form className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Name */}
            <div className="col-span-1">
              <label
                htmlFor="first_name_2"
                className="block text-md font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="first_name_2"
                className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                placeholder="John"
                required
              />
            </div>

            {/* Last Name */}
            <div className="col-span-1">
              <label
                htmlFor="last_name_2"
                className="block text-md font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last_name_2"
                className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                placeholder="Doe"
                required
              />
            </div>
          </div>
        </form>

          {/* Table */}
          <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Column 1</th>
                <th className="border border-gray-300 px-4 py-2">Column 2</th>
                <th className="border border-gray-300 px-4 py-2">Column 3</th>
                <th className="border border-gray-300 px-4 py-2">Column 4</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Data 1</td>
                <td className="border border-gray-300 px-4 py-2">Data 2</td>
                <td className="border border-gray-300 px-4 py-2">Data 3</td>
                <td className="border border-gray-300 px-4 py-2">Data 4</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Data 5</td>
                <td className="border border-gray-300 px-4 py-2">Data 6</td>
                <td className="border border-gray-300 px-4 py-2">Data 7</td>
                <td className="border border-gray-300 px-4 py-2">Data 8</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex gap-5 ">

<button
    onClick={handleCloseModal}
    className="bg-transparent border text-primary px-4 py-1 rounded font-medium hover:bg-red-600 transition" 
>
    Cancel
</button>
<button
    onClick={() => handleOpenModal("modal1")} 
    className="bg-[#17AF17] text-white px-4 py-1 rounded font-medium hover:bg-green-600 transition" 
>
    Save
</button>
</div>
      </div>
    </div>
  </div>
)}


        </>
    );
};

export default ModalContainer; 
