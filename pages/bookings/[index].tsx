/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Index = () => {
  const router = useRouter();
  const [meetings, setMeetings] = useState([]);
  const getMeeting = async (id: number) => {
    await fetch(`/api/bookings/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then(async (data) => {
        const result = await data.json();

        const meets = result.event.map((each: any) => {
          return {
            title: each.event.name,
            name: each.user.username,
            email: each.user.email,
            date: each.event.createdAt.split("T")[0],
            time: each.event.createdAt.split("T")[1],
          };
        });

        setMeetings(meets);

        // router.push(`/bookings`);
      })
      .catch((err) => {
        // methods.setError("apiError", { message: err.message });
      });
  };

  useEffect(() => {
    const id = Number(router.query.index);
    getMeeting(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.index]);

  const showUpcoming = () => {
    //
    const newMeet = meetings.filter((each: any) => {
      const now = moment(new Date());
      const end = moment(each.date);

      if (Number(moment.duration(end.diff(now)).asMinutes()) > 0) {
        return each;
      }
    });
    setMeetings(newMeet);
  };

  const showPast = () => {
    const newMeet = meetings.filter((each: any) => {
      const now = moment(new Date());
      const end = moment(each.date);

      if (Number(moment.duration(end.diff(now)).asMinutes()) < 0) {
        return each;
      }
    });
    setMeetings(newMeet);
  };

  const showCancelled = () => {
    //
  };

  return (
    <>
      <div className="w-full bg-gray-200 min-h-screen text-sm">
        <div className="pt-8">
          <h2 className="font-medium text-xl">Bookings</h2>
          <p>See upcoming and past events booked through your event type links</p>
        </div>
        <div className="flex flex-col w-full ">
          <div>
            <ul className="flex w-1/5 justify-between my-5 text-gray-800">
              <button onClick={showUpcoming} className="hover:bg-blue border p-2 bg-white px-3">
                Upcoming
              </button>
              <button onClick={showPast} className="hover:bg-blue border p-2 bg-white ml-3 px-3">
                Past
              </button>
              <button onClick={showCancelled} className="hover:bg-blue border p-2 bg-white ml-3 px-3">
                Cancelled
              </button>
            </ul>
          </div>

          {meetings && meetings.length > 0 ? (
            meetings.map((meeting: any, index: number) => (
              <div key={index} className="flex justify-between w-full bg-white text-black p-3 mb-2">
                <div className="flex flex-col w-1/5">
                  <p>{moment().format(meeting.date)}</p>
                  <p className="text-gray-400">{moment().format(meeting.time)}</p>
                </div>
                <div className="flex flex-col grow ">
                  <h2 className="font-medium">{meeting.title}</h2>
                  <p className="text-gray-400">{meeting.name}</p>
                  <p>{meeting.email}</p>
                </div>

                <div className="flex w-1/5 ml-3">
                  <button className="bg-white px-5 border">Cancel</button>
                  <button className="bg-white px-5 border ml-3">Reschedule</button>
                </div>
              </div>
            ))
          ) : (
            <p className=" flex justify-center text-3xl">Add Event</p>
          )}
        </div>
        <div className=" flex justify-center">
          <Link href="/bookings/book">
            <button className=" flex justify-center text-3xl my-3">Add Event</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Index;
