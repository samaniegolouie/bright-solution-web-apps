function Maintenance() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="max-w-lg text-center bg-white p-10 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-red-800 mb-4">
          Under Maintenance
        </h1>
        <p className="text-gray-600 mb-6">
          We’re currently making improvements. Please check back soon.
        </p>
        <p className="text-sm text-gray-400">
          Thank you for your patience.
        </p>
      </div>
    </div>
  );
}

export default Maintenance;
