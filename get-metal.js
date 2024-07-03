const Data = require("./models/Data");
const axios = require("axios");

// Get page count for upcoming and call getUpcomingData
const getUpcoming = () => {
	axios
		.get("https://www.metal-archives.com/release/ajax-upcoming/json/1?iDisplayStart=0")
		.then((res) => {
			const numResults = res.data.iTotalDisplayRecords;
			const pages = Math.round(numResults / 100);
			getUpcomingData(pages);
		})
		.catch((err) => {
			console.log(err);
		});
};

// Get page count for recent and call getRecentData
const getRecent = () => {
	axios
		.get(
			"https://www.metal-archives.com/release/ajax-upcoming/json/1?iDisplayStart=0&fromDate=2024-06-25&toDate=2024-07-02"
		)
		.then((res) => {
			const numResults = res.data.iTotalDisplayRecords;
			const pages = Math.round(numResults / 100);
			getRecentData(pages);
		})
		.catch((err) => {
			console.log(err);
		});
};

// Get the upcoming data
const getUpcomingData = (pages) => {
	let displayStart = 0;
	let promises = [];
	let releases = [];

	Data.UpcomingData.deleteMany({})
		.then((res) => {
			for (let i = 0; i <= pages; i++) {
				promises.push(
					axios.get("https://www.metal-archives.com/release/ajax-upcoming/json/1?iDisplayStart=" + displayStart)
				);
				displayStart += 100;
			}
			Promise.all(promises)
				.then((res) => {
					res.forEach((item) => {
						const data = item.data.aaData;
						data.forEach((itemB) => releases.push(itemB));
					});
					releases.forEach((item) => {
						let newItem = {
							band: item[0],
							album: item[1],
							type: item[2],
							genre: item[3],
							date: item[4]
						};
						Data.UpcomingData.create(newItem);
					});
				})
				.catch((err) => console.log(err));
		})
		.catch((err) => console.log(err));
};

// Get the recent data
const getRecentData = (pages) => {
	let displayStart = 0;
	let promises = [];
	let releases = [];
	const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split("T")[0];
	const aWeekAgo = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split("T")[0];

	Data.RecentData.deleteMany({})
		.then((res) => {
			for (let i = 0; i <= pages; i++) {
				promises.push(
					axios.get(
						"https://www.metal-archives.com/release/ajax-upcoming/json/1?fromDate=" +
							aWeekAgo +
							"&toDate=" +
							yesterday +
							"&iDisplayStart=" +
							displayStart
					)
				);
				displayStart += 100;
			}
			Promise.all(promises)
				.then((res) => {
					res.forEach((item) => {
						const data = item.data.aaData;
						data.forEach((itemB) => releases.push(itemB));
					});
					releases.forEach((item) => {
						let newItem = {
							band: item[0],
							album: item[1],
							type: item[2],
							genre: item[3],
							date: item[4]
						};
						Data.RecentData.create(newItem);
					});
				})
				.catch((err) => console.log(err));
		})
		.catch((err) => console.log(err));
};

exports.getUpcoming = getUpcoming;
exports.getRecent = getRecent;
