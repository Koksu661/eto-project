import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import NavBar from '../../components/navbars/NavBar';
import Card from '../../components/cards/UpcomingEventCard';
import CancelModal from '../../components/Popups/CancelEventPopup';
import RateSessionModal from '../../components/Popups/RatePracticePopup';
import { mockEvents, MockUser } from '../../data/MockData';

export default function Home({ role = 'player' }) {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState([]);

  // Cancel & Rating modal states (Player only)
  const [cancellingEvent, setCancellingEvent] = useState(null);
  const [ratingEvent, setRatingEvent] = useState(null);

  // Track joined & rated sessions (Player only)
  const [joinedEventIds, setJoinedEventIds] = useState([]);
  const [ratedSessions, setRatedSessions] = useState({}); // { [id]: { rating, comment } }

  const isCoach = role?.toLowerCase() === 'coach';
  const activeUserName = currentUser?.name || MockUser.name;

  // Load & filter events based on role
  useEffect(() => {
    if (isCoach) {
      const coachEvents = mockEvents.filter(
        (e) => !e.coach || e.coach === activeUserName
      );
      setEvents(coachEvents);
    } else {
      setEvents(mockEvents);
    }
  }, [isCoach, activeUserName]);

  // Player: Open & confirm cancel modal
  const handleOpenCancelModal = (event) => {
    setCancellingEvent(event);
  };

  const handleConfirmCancel = (reason) => {
    console.log(`Esemény (${cancellingEvent.id}) lemondva. Ok:`, reason);
    setEvents((prev) => prev.filter((e) => e.id !== cancellingEvent.id));
    setCancellingEvent(null);
  };

  // Player: Check in to event
  const handleJoinEvent = (eventId) => {
    console.log('Bejelentkezés az eseményre:', eventId);
    setJoinedEventIds((prev) => (prev.includes(eventId) ? prev : [...prev, eventId]));
  };

  // Player: Submit session rating
  const handleSubmitRating = ({ rating, comment }) => {
    console.log(`Esemény (${ratingEvent.id}) értékelve:`, rating, comment);
    setRatedSessions((prev) => ({
      ...prev,
      [ratingEvent.id]: { rating, comment },
    }));
  };

  const featuredEvent = events[0];
  const nextEvents = events.slice(1);

  return (
    <div className="flex flex-col min-h-screen bg-(--bg-page) text-(--text-main) font-futura">
      <NavBar userName={activeUserName} role={role} />

      {/* Player-only Popups */}
      {!isCoach && (
        <>
          <CancelModal
            isOpen={!!cancellingEvent}
            eventTitle={cancellingEvent?.title}
            onClose={() => setCancellingEvent(null)}
            onConfirm={handleConfirmCancel}
          />

          <RateSessionModal
            isOpen={!!ratingEvent}
            sessionTitle={ratingEvent?.title}
            onClose={() => setRatingEvent(null)}
            onSubmitRating={handleSubmitRating}
          />
        </>
      )}

      <div className="flex-1 p-4 sm:p-6 max-w-4xl w-full mx-auto flex flex-col gap-6">
        {events.length === 0 ? (
          <div className="bg-(--bg-card) border border-(--border-subtle) rounded-2xl p-10 text-center">
            <p className="text-(--text-muted) font-bold">
              {isCoach
                ? 'Jelenleg nincs hozzád rendelt közelgő edzés.'
                : 'Nincs közelgő esemény.'}
            </p>
          </div>
        ) : (
          <>
            {/*upcomin*/}
            {featuredEvent && (
              <Card
                event={featuredEvent}
                role={role}
                isFeatured={true}
                isJoined={joinedEventIds.includes(featuredEvent.id)}
                userRating={ratedSessions[featuredEvent.id]}
                onCancel={() => handleOpenCancelModal(featuredEvent)}
                onJoin={() => handleJoinEvent(featuredEvent.id)}
                onRate={() => setRatingEvent(featuredEvent)}
              />
            )}

            {/*rest*/}
            {nextEvents.length > 0 && (
              <div className="w-full mt-2">
                <h1 className="text-2xl font-extrabold text-(--text-main) mb-4 border-b border-(--border-subtle) tracking-widest uppercase">
                  {isCoach ? 'Következő edzéseid' : 'Következő események'}
                </h1>

                <div className="flex flex-col gap-3">
                  {nextEvents.map((event) => (
                    <Card
                      key={event.id}
                      event={event}
                      role={role}
                      isFeatured={false}
                      isJoined={joinedEventIds.includes(event.id)}
                      userRating={ratedSessions[event.id]}
                      onCancel={() => handleOpenCancelModal(event)}
                      onJoin={() => handleJoinEvent(event.id)}
                      onRate={() => setRatingEvent(event)}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}