export function getFormattedDate(d) {
	return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
}

export function getDayRange(dateString) {
	const startOfDay = new Date(dateString);
	const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000 - 1);
	return { startOfDay, endOfDay };
}
