const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config();

const mongoose = require('mongoose');
const CheckLog = require('./src/models/CheckLog');
const Pass = require('./src/models/Pass');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Seeding'))
  .catch(err => console.error(err));

const seedData = async () => {
  try {
    await CheckLog.deleteMany();
    await Pass.deleteMany();

    const mockPass = await Pass.create({
      visitorId: new mongoose.Types.ObjectId(),
      purpose: 'Interview',
      qrCodeUrl: 'https://example.com/qr.png',
      validUntil: new Date(new Date().setDate(new Date().getDate() + 1))
    });

    await CheckLog.create([
      { passId: mockPass._id, action: 'Check-In' },
      { passId: mockPass._id, action: 'Check-Out' }
    ]);

    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();