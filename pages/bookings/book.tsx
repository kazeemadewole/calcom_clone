import { useRouter } from "next/router";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaClock } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaGlobeAfrica } from "react-icons/fa";

import { EmailField, TextField } from "../../components/ui/form/fields";

type FormValues = {
  username: string;
  email: string;
  password: string;
  passwordcheck: string;
  apiError: string;
};

const Book = () => {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [profile, setProfile] = useState({
    name: "Kazeem Adewole",
    duration: "15 mins",
    time: "4:30pm",
  });
  const methods = useForm<FormValues>();
  const submitForm = () => {
    //
    router.push("/bookings/confirm/4");
  };
  return (
    <div className="flex justify-center items-center min-h-screen border ">
      <div className="flex justify-between  border-2 w-3/5 p-8 divide-x-2">
        <div className="  w-2/4 mr-2 mt-8 ">
          <FaGlobeAfrica className="bg-green " color="green" size={70} />
          <p className="mb-8 text-gray-400 font-medium">{profile.name}</p>
          <p className="text-medium mb-8 font-black">{profile.duration} Meeting</p>
          <p className="mb-8 text-gray-400 flex items-center">
            <FaClock />
            {profile.duration}
          </p>
          <p className="mb-8 text-green-600 flex items-center">
            <FaCalendar />
            {profile.time}
          </p>
        </div>
        <div className="w-2/4 divide-x-8 divide-black ">
          <div className="  ml-7">
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(submitForm)} className="space-y-6 bg-white">
                {/* {errors.apiError && <Alert severity="error" message={errors.apiError?.message} />} */}
                <div className="space-y-2">
                  <label htmlFor="meeting-time">Choose a time for your appointment:</label>
                  <input
                    type="datetime-local"
                    id="meeting-time"
                    name="meeting-time"
                    value={date}
                    min=""
                    max=""
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="flex justify-start ">
                  <button
                    // loading={isSubmitting}
                    className=" justify-center text-medium p-2 px-3 bg-slate-900  borderpy-2 text-sm text-white hover:bg-sky"
                    color="black">
                    Confirm
                  </button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
