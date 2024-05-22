function getFormattedDate(d) {
	return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
}

function getDayRange(dateString) {
	const dobDate = new Date(dateString);
	const startOfDay = new Date(dobDate.setUTCHours(0, 0, 0, 0));
	const endOfDay = new Date(dobDate.setUTCHours(23, 59, 59, 999));
	return { startOfDay, endOfDay };
}

module.exports = {
	getFormattedDate, getDayRange
};
