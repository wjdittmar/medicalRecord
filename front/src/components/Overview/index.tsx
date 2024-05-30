import ThreeColumnLayout from "../ThreeColumnLayout";
import VisitSummary from "../Visits/Summary";
import PatientSummary from "../Providers/Summary";
import ProviderSummary from "../Patients/Summary";

import timeGridPlugin from '@fullcalendar/timegrid'
import FullCalendar from '@fullcalendar/react'


let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
	{
		id: createEventId(),
		title: 'All-day event',
		start: todayStr
	},
	{
		id: createEventId(),
		title: 'Timed event',
		start: todayStr + 'T12:00:00'
	}
]

export function createEventId() {
	return String(eventGuid++)
}

const Overview = () => {
	return <>
		{/* <h2>Overview</h2> */}
		{/* <ThreeColumnLayout left={<ProviderSummary />} middle={<PatientSummary />} right={<VisitSummary />} /> */}
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
			initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
		/>
	</>;
};
export default Overview;