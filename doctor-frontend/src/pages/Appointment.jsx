import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { RelatedDoctors } from "../components/RelatedDoctors";
import { toast } from "react-toastify";

export const Appointment = () => {
  const { docId } = useParams();
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const {
    getDoctorsData,
    doctors,
    token,
    setToken,
    userData,
    loadUserProfileData,
    setuserData,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [docInfo, setDocTnfo] = useState([]);
  const [docSlots, setdocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const fetchDocInfo = () => {
    const newdocInfo = doctors.filter((doc) => doc._id === docId);
    setDocTnfo(newdocInfo);
  };
  const getAvailableSlots = async () => {
    setdocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);
      if (today.getDate() === currentDate.getDate()) {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();

        if (hours < 10) {
          currentDate.setHours(10, 0, 0, 0);
        } else {
          let nextHalfHour = minutes <= 30 ? 30 : 0;
          let nextHour = minutes <= 30 ? hours : hours + 1;
          currentDate.setHours(nextHour, nextHalfHour, 0, 0);
        }
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setdocSlots((prev) => [...prev, timeSlots]);
    }
  };
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }
    try {
      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = day + "_" + month + "_" + year;
      console.log(slotDate);
      const res = await fetch(
        "http://localhost:8000/api/user/book-appointment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: userData._id,
            docId,
            slotDate,
            slotTime,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Appointment booked successfully!");
        navigate("/myappointment")
      } else {
        toast.error(data.message || "Failed to book appointment");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);
  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  return (
    <div className="p-6">
      {docInfo && docInfo.length > 0 ? (
        docInfo.map((currEle, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-6 mb-6 hover:shadow-2xl transition-shadow"
          >
            <div className="flex items-center gap-6">
              <img
                src={currEle.image}
                alt={currEle.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {currEle.name}
                </h2>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">Speciality:</span>{" "}
                  {currEle.specality}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">Appointment Fees:</span> $
                  {currEle.fees || "N/A"}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">About:</span>{" "}
                  {currEle.about || "N/A"}
                </p>
              </div>
            </div>
            <button className="mt-4 px-5 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition">
              Book Appointment
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center mt-10 text-lg">
          No doctors available.
        </p>
      )}

      <div className="mt-10 font-medium text-gray-700">
        <p className="text-lg mb-4">Booking slots</p>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {docSlots.length > 0 &&
            docSlots.map((item, index) => (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`flex flex-col justify-center items-center w-14 h-14 rounded-full cursor-pointer text-sm transition-all duration-300 ${
                  slotIndex === index
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p className="text-xs">
                  {item[0] && item[0].datetime.getDate()}
                </p>
              </div>
            ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          {docSlots[slotIndex]?.map((slot, i) => (
            <div
              key={i}
              onClick={() => setSlotTime(slot.time)}
              className={`px-4 py-2 rounded-full text-sm border cursor-pointer transition-all ${
                slotTime === slot.time
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {slot.time}
            </div>
          ))}
        </div>

        {slotTime && (
          <button
            onClick={() => bookAppointment()}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition"
          >
            Book an appointment
          </button>
        )}
      </div>
      {docInfo.length > 0 && (
        <RelatedDoctors docId={docId} speciality={docInfo[0].specality} />
      )}
    </div>
  );
};
