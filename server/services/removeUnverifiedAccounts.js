const User = require("../models/userModel");
const cron = require("node-cron");
const removeUnverifiedAccounts = () => {
    cron.schedule("*/5 * * * *", async() => {
        const thirtyMiniutesAgo = new Date( Date.now() - 30*60*1000);
        await User.deleteMany({
            accountVerified: false,
            createdAt: {$lt : thirtyMiniutesAgo},
        });
    });
}
module.exports = {removeUnverifiedAccounts};