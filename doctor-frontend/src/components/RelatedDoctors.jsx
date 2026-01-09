import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export const RelatedDoctors = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext);
  const [relDoc, setrelDoc] = useState([]);
const navigator = useNavigate("")
  useEffect(() => {
    console.log("Doctors in context:", doctors);
    console.log("Speciality:", speciality);
    console.log("DocId:", docId);

    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors
        .filter(
          (doc) =>
            doc.specality.toLowerCase() === speciality.toLowerCase() &&
            String(docId) !== String(doc._id)
        )

        .sort((a, b) => a.name.localeCompare(b.name));

      setrelDoc(doctorsData.slice(0, 4));
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">Related Doctors</h2>

      {relDoc.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {relDoc.map((doc) => (
            <div
              key={doc._id}
              onClick={() => {
                navigator(`/appointment/${doc._id}`);
                scrollTo(0, 0);
              }}
              className="bg-white p-4 cursor-pointer rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={doc.image}
                alt={doc.name}
                className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
              />
              <h3 className="text-center font-medium">{doc.name}</h3>
              <p className="text-center text-sm text-gray-600">
                {doc.speciality}
              </p>
              <p className="text-center text-sm text-blue-600 font-semibold mt-2">
                ${doc.fees}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-4">
          No related doctors found.
        </p>
      )}
    </div>
  );
};
