var mongoose = require("mongoose");
var mongoDBUrl = "mongodb://localhost:27017/shop24x7";

const initiateMongoServer = async () => {
	try {
		await mongoose.connect(mongoDBUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("!!CONNECTED TO DB!!")
	} catch (e) {
		console.log("ERROR while connecting to mongodb" + e);
		throw e;
	}
};

module.exports = initiateMongoServer;
