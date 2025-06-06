import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const {
    doctors = [],   // ✅ fallback to empty array
    aToken,
    getAllDoctors,
    changeAvailability,
  } = useContext(AdminContext) || {};  // ✅ fallback if AdminContext is undefined

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors.length > 0 ? (
          doctors.map((item, index) => (
            <div
              key={item._id || index}
              className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer"
            >
              <img src={item.image} alt={item.name} />
              <div className="p-2">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">{item.speciality}</p>
                <div className="flex items-center mt-2">
                  <input
                    onChange={() => changeAvailability(item._id)}
                    type="checkbox"
                    checked={item.available}
                  />
                  <p className="ml-2 text-sm">Available</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No doctors found.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
