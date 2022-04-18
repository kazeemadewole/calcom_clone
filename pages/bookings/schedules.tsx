import React from "react";

const Schedules = () => {
  return (
    <div className="flex flex-col justify-center items-center border min-h-screen">
      <div className="mt-8 sm:mx-auto  sm:w-full sm:max-w-md  ">
        <div className="mx-2 bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10 ">
          <div className="flex flex-col justify-center">
            <h2 className="text-black">This meeting is scheduled</h2>
            <p>We Email you and the other attendees a calendar invitation with all the details</p>
          </div>

          <hr />
          <div>
            <div>
              <p>What</p>
              <p>15 mins meeting between daniel tonel and test</p>
            </div>

            <div>
              <p>When</p>
              <p>
                Wednesday 27, December 2021 <br />
                4:30pm -15 mins(Europe/Vienna)
              </p>
            </div>
          </div>
          <hr />
          <div>
            <p>Add to Calendar</p>
            <p></p>
          </div>
          <hr />
          <p>create your won booking link with cal.com</p>
          <input type="text" name="email" placeholder="Email" className="border" />
          <label className="bg-black p-2 text-white">try it for free</label>
        </div>
      </div>
    </div>
  );
};

export default Schedules;
