import { useEffect, useState } from 'react';
import timeGridPlugin from '@fullcalendar/timegrid'
import FullCalendar from '@fullcalendar/react'
import visitService from "../../services/Visits";
import authService from "../../services/Auth";

let eventGuid = 0;

export function createEventId() {
	return String(eventGuid++);
}

const Overview = () => {
	const [visits, setVisits] = useState([]);
	const [events, setEvents] = useState([]);

	useEffect(() => {
		const currentUser = authService.getUser();
		const currentProvider = currentUser.provider;

		const fetchVisits = async () => {
			try {
				const visits = await visitService.getByProvider(currentProvider.id);
				setVisits(visits);
				const transformedEvents = visits.map(visit => {
					return {
						id: createEventId(),
						title: `Visit with ${visit.patient.user.name}`,
						start: visit.encounterDate,
						extendedProps: {
							address: visit.address,
							providerNotes: visit.providerNotes
						}
					};
				});
				setEvents(transformedEvents);
			} catch (error) {
				console.error("Error fetching visits:", error);
			}
		};

		fetchVisits();
	}, []);

	return (
		<>
			<FullCalendar
				plugins={[timeGridPlugin]}
				headerToolbar={{
					left: 'prev,next',
					center: 'title',
					right: ''
				}}
				initialView='timeGridWeek'
				slotMinTime={"07:00:00"}
				slotMaxTime={"20:00:00"}
				expandRows={true}
				allDaySlot={false}
				height={"100%"}
				eventContent={renderEventContent}
				events={events}
			/>
		</>
	);
};

function renderEventContent(eventInfo) {
	return (
		<>
			{eventInfo.event.title}
		</>
	)
}

export default Overview;
