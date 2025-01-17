

const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      <p className="text-blue-500 text-lg font-semibold">Loading, please wait...</p>
    </div>
  );
};

export default Spinner;
