import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaClock } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaGlobeAfrica } from "react-icons/fa";

import { EmailField, TextField } from "../../../components/ui/form/fields";

type FormValues = {
  name: string;
  email: string;
  apiError: string;
};

const Confirm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [profile, setProfile] = useState({
    name: "Kazeem Adewole",
    duration: "15 mins",
    time: "7:30pm",
  });
  const methods = useForm<FormValues>();

  methods.setValue("email", email);
  methods.setValue("name", name);

  const submitForm = () => {
    const id = Number(router.query.id);
    getUser(id);
  };

  const getUser = async (id: number) => {
    await fetch(`/api/auth/user/${id}`, {
      body: JSON.stringify({
        id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then(async (resp) => {
        if (!resp.ok) {
          const err = await resp.json();
          throw new Error(err.message);
        }
        const data = await resp.json();

        router.push(`/bookings/${data.user.id}`);
      })
      .catch((err) => {
        methods.setError("apiError", { message: err.message });
      });
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
                  <TextField
                    name="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jon Doe"
                    labelProps={{ className: "block text-sm font-medium text-gray-700" }}
                    className="block w-full min-w-0 flex-grow rounded-none rounded-r-sm border-gray-300 lowercase focus:border-black focus:ring-black sm:text-sm"
                    required
                  />
                  <EmailField
                    name="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-1 block w-full rounded-md border border-gray-300  px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                  />
                  <label className="font-dark">Additional Notes</label>
                  <textarea
                    name=""
                    placeholder="Additional Notes"
                    className="border w-full"
                    rows={3}></textarea>
                </div>
                <div className="flex justify-start ">
                  <button
                    // loading={isSubmitting}
                    className=" justify-center text-medium p-2 px-3 bg-slate-900  borderpy-2 text-sm text-white hover:bg-sky"
                    color="black">
                    Confirm
                  </button>

                  <button
                    // loading={isSubmitting}
                    className="ml-2 justify-center  text-medium text-black border p-2 px-3 text-sm  hover:bg-sky">
                    Cancel
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

export default Confirm;
