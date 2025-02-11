import { useEffect, useState } from "react";
import MeetingCard from '../components/MeetingCard';
import MomCard from '../components/MomCard';
import MeetingModal from "../components/MeetingModal";

import { useMeetingsContext } from "../hooks/useMeetingsContext"
import { useAuthContext } from "../hooks/useAuthContext"

const Home = () => {

  const { meetings, dispatch } = useMeetingsContext()
  const { user } = useAuthContext()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMeeting, setCurrentMeeting] = useState(null);

  function handleCardClick(meeting) {
    setCurrentMeeting(meeting);
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    const fetchMeetings = async () => {
      const response = await fetch('/api/meetings/', {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });

      const json = await response.json();

      if (response.ok) {

        dispatch({ type: 'SET_MEETINGS', payload: json })
        console.log("response is ok");

      }
    }

    if (user) {
      console.log("home called");
      fetchMeetings()
    }
  }, [dispatch, user]);
  console.log(meetings);


  return (
    <div className="right-container">
      <div className="upcoming-meetings-container">
        <div className="upcoming-meetings-heading">Upcoming Meetings <span> </span></div>
        <div className="meeting-cards-container">
          {console.log(meetings)}
          {meetings && meetings.map(meeting => (
            <div key={meeting._id}>
      
              <MeetingCard meeting={meeting} onClick={() => handleCardClick(meeting)}  />

            </div>
          ))}

          <div className={`modal-overlay ${isModalOpen ? 'is-open' : ''}`}></div>
          {currentMeeting && (
            <MeetingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} meeting={currentMeeting} />
          )}
        </div>

      </div>
      <hr />
      <div className="mom-container">
        <div className="mom-heading">MoMs <span></span></div>
        <div className="mom-cards-container">
          <MomCard />
          <MomCard />
          <MomCard />

        </div>
      </div>

    </div>
  );
}

export default Home;