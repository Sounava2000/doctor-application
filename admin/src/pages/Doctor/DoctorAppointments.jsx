import React, {useEffect, useContext} from 'react';
import {DoctorContext} from '../../context/DoctorContext.jsx';
import {FaCheckCircle, FaTimesCircle} from 'react-icons/fa';
import Swal from 'sweetalert2';
export const DoctorAppointments = () => {
  const {
    dToken,
    appointments,

    getAppointments,
    completeAppointment,
    CancelAppointment,
  } = useContext (DoctorContext);

  useEffect (
    () => {
      if (dToken) {
        getAppointments ();
      }
    },
    [dToken]
  );

  const calculateAge = dob => {
    const birthDate = new Date (dob);
    const diff = Date.now () - birthDate.getTime ();
    const age = new Date (diff).getUTCFullYear () - 1970;
    return age;
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-3">Doctor Appointments</h2>

      <div className="border-b font-semibold grid grid-cols-6 py-2">
        <p>#</p>
        <p>Patient</p>
        <p>Age</p>
        <p>Date & Time</p>
        <p>Fees</p>
        <p>Action</p>
      </div>

      {appointments && appointments.length > 0
        ? appointments.map ((item, index) => (
            <div
              key={index}
              className="grid grid-cols-6 items-center border-b py-3 text-sm"
            >

              <p>{index + 1}</p>

              <div className="flex items-center gap-3">
                <img
                  src={item.userData.image}
                  alt={item.userData.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p>{item.userData.name}</p>
              </div>

              <p>{calculateAge (item.userData.dob)} yrs</p>

              <p>
                {item.slotDate.replace (/_/g, '/')} <br /> {item.slotTime}
              </p>

              <p>₹{item.amount}</p>
              {item.cancelled
                ? <p> Cancelled</p>
                : item.isCompleted
                    ? <p>Complete</p>
                    : <div className="flex items-center gap-3">

                        <FaTimesCircle
                          onClick={() => {
                            Swal.fire ({
                              title: 'Are you sure?',
                              text: "You won't be able to revert this!",
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonColor: '#3085d6',
                              cancelButtonColor: '#d33',
                              confirmButtonText: 'Yes, delete it!',
                            }).then (result => {
                              if (result.isConfirmed) {
                                CancelAppointment (item._id);
                                Swal.fire ({
                                  title: 'Deleted!',
                                  text: 'Your file has been deleted.',
                                  icon: 'success',
                                });
                              }
                            });
                          }}
                          className="text-red-500 text-xl cursor-pointer"
                          title="Cancelled"
                        />
                        <FaCheckCircle
                          onClick={() => {
                            Swal.fire ({
                              title: 'Mark as completed?',
                              text: 'Do you want to mark this appointment as completed?',
                              icon: 'question',
                              showCancelButton: true,
                              confirmButtonColor: '#28a745',
                              cancelButtonColor: '#3085d6',
                              confirmButtonText: 'Yes, complete it!',
                            }).then (result => {
                              if (result.isConfirmed) {
                                completeAppointment (item._id);
                                Swal.fire (
                                  'Completed!',
                                  'The appointment has been marked as completed.',
                                  'success'
                                );
                              }
                            });
                          }}
                          className="text-green-500 text-xl cursor-pointer"
                          title="Completed"
                        />

                      </div>}

            </div>
          ))
        : <p className="mt-4 text-gray-500">No appointments found.</p>}
    </div>
  );
};
