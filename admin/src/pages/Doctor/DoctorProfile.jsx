import React, {useContext, useEffect, useState} from 'react';
import {DoctorContext} from '../../context/DoctorContext.jsx';
import {toast} from 'react-toastify';

export const DoctorProfile = () => {
  const {dToken, profileData, getProfileData, setprofileData} = useContext (
    DoctorContext
  );
  const [isEdit, setIsEdit] = useState (false);
  const updateProfile = async () => {
    try {
      const res = await fetch (
        'http://localhost:8000/api/doctor/update-profile',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${dToken}`,
          },
          body: JSON.stringify ({
            fees: profileData.fees,
            available: profileData.abalibility,
            about:profileData.about,
            experience:profileData.experience,
            specality:profileData.specality,
            email:profileData.email,

          }),
        }
      );
      const data = await res.json ();
      if (data.success) {
        toast.success (data.message);
        setIsEdit(false)
        getProfileData ();
      }
      else {
      toast.error (data.message);

      }
    } catch (error) {
      console.error (error);
      toast.error (error.message);
    }
  };
  useEffect (() => {
    if (dToken) {
      getProfileData ();
    }
  }, []);

  if (!profileData)
    return (
      <p className="text-center mt-10 text-gray-500">Loading profile...</p>
    );

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Doctor Profile
      </h2>

      <div className="bg-white shadow-lg rounded-2xl p-6 space-y-6">

        <div className="flex items-center space-x-4">
          <img
            src={profileData.image || '/doctor-placeholder.png'}
            alt="Doctor"
            className="w-20 h-20 rounded-full border-4 border-blue-200 object-cover"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              Dr. {profileData.name}
            </h3>
            <p className="text-gray-600">
              {profileData.speciality || 'General Physician'}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
          <div>
            <p className="text-sm text-gray-500">Email</p>

            <p className="font-medium">
              {' '}{isEdit
                ? <input
                    type="text"
                    className="border rounded-md px-2 py-1 w-50"
                    value={profileData.email}
                    onChange={e =>
                      setprofileData (prev => ({
                        ...prev,
                        email: e.target.value,
                      }))}
                    name=""
                    id=""
                  />
                : profileData.email || 'Not Avaliable '}{' '}{' '}
            </p>
          </div>
         
          <div>

            <p className="text-sm text-gray-500">Experience</p>
            <p className="font-medium">
              {isEdit
                ? <input
                    type="text"
                    className="border rounded-md px-2 py-1 w-24"
                    value={profileData.experience}
                    onChange={e =>
                      setprofileData (prev => ({
                        ...prev,
                        experience: e.target.value,
                      }))}
                    name=""
                    id=""
                  />
                : profileData.experience || '—'}{' '}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Fees</p>
            <p className="font-medium">
              ₹
              {isEdit
                ? <input
                    type="number"
                    className="border rounded-md px-2 py-1 w-24"
                    value={profileData.fees}
                    onChange={e =>
                      setprofileData (prev => ({
                        ...prev,
                        fees: e.target.value,
                      }))}
                    name=""
                    id=""
                  />
                : profileData.fees || '—'}
            </p>
          </div>
          <div>
            <input
              type="checkbox"
              checked={profileData.availability}
              disabled={!isEdit}
              onChange={e =>
                setprofileData (prev => ({
                  ...prev,
                  availability: e.target.checked,
                }))}
            />
            <label className="ml-2">Available</label>

          </div>
        </div>
  <div>
            <p className="text-sm text-gray-500">Speciality</p>
            <p className="font-medium">
              {isEdit ? (
                <input
                  type="text"
                  className="border rounded-md px-2 py-1 w-full"
                  value={profileData.specality}
                  onChange={(e) =>
                    setprofileData((prev) => ({
                      ...prev,
                      specality: e.target.value,
                    }))
                  }
                />
              ) : (
                profileData.specality || "Not Specified"
              )}
            </p>
          </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">About</p>
          <p className="text-gray-700 leading-relaxed">
            {isEdit
              ? <input
                  type="text"
                  className="border rounded-md px-2 py-1 w-24"
                  value={profileData.about}
                  onChange={e =>
                    setprofileData (prev => ({
                      ...prev,
                      about: e.target.value,
                    }))}
                  name=""
                  id=""
                />
              : profileData.about || 'Not Avaliable '}{' '}

          </p>
        </div>

        <div className="text-right">
          {isEdit
            ? <button
                onClick={updateProfile}
                // onClick={() => setIsEdit (false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Save Profile
              </button>
            : <button
                onClick={() => setIsEdit (true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>}

        </div>
      </div>
    </div>
  );
};
