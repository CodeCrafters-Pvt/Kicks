const cron = require('node-cron');
const UserModel = require('../models/user');
const PastUserModel = require('../models/pastUser');


const removeUsers = cron.schedule('0 0 * * *', async () => {
  try {
    const currentDate = new Date();
    const deactivationThreshold = new Date(currentDate - 14 * 24 * 60 * 60 * 1000);

    // Find all deactivated users older than 14 days
    const deactivatedUsers = await UserModel.find({
      isActive: false,
      deactivationDate: { $lt: deactivationThreshold },
    });

    // Move deactivated users to PastUsers model
    for (const user of deactivatedUsers) {
      const { _id, ...pastUserData } = user.toObject();
      await PastUserModel.create(pastUserData);
      await UserModel.findByIdAndDelete(user._id);
    }

    console.log('Scheduled task completed successfully.');
  } catch (error) {
    console.error('Scheduled task failed:', error);
  }
});

console.log('Scheduled task started.');

// Keep the script running
process.stdin.resume();

module.exports=removeUsers;
