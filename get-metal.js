const Data = require("./models/Data");
const axios = require("axios");

const getPageCount = () => {
	axios
		.get("https://www.metal-archives.com/release/ajax-upcoming/json/1?iDisplayStart=0")
		.then((res) => {
			const numResults = res.data.iTotalDisplayRecords;
			const pages = Math.round(numResults / 100);
			getTheirData(pages);
		})
		.catch((err) => {
			console.log(err);
		});
};

const getTheirData = (pages) => {
	let displayStart = 0;
	let promises = [];
	let releases = [];

	Data.deleteMany({})
		.then((res) => {
			for (let i = 0; i <= pages; i++) {
				const url = "https://www.metal-archives.com/release/ajax-upcoming/json/1?iDisplayStart=" + displayStart;
				promises.push(axios.get(url));
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
						Data.create(newItem);
					});
				})
				.catch((err) => console.log(err));
		})
		.catch((err) => console.log(err));
};

module.exports = getPageCount;
