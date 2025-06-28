const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Station = require('./models/Station');
const TrainRoute = require('./models/TrainRoute');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {});

const stations = [
    { name: 'Dhaka', bn_name: 'ঢাকা' }, { name: 'Biman_Bandar', bn_name: 'বিমান বন্দর' },
    { name: 'Ibrahimabad', bn_name: 'ইব্রাহিমাবাদ' }, { name: 'Chatmohar', bn_name: 'চাটমোহর' },
    { name: 'Natore', bn_name: 'নাটোর' }, { name: 'Santahar', bn_name: 'সান্তাহার' },
    { name: 'Talora', bn_name: 'তালোড়া' }, { name: 'Bogura', bn_name: 'বগুড়া' },
    { name: 'Sonatola', bn_name: 'সোনাতলা' }, { name: 'Bonar_Para', bn_name: 'বোনারপাড়া' },
    { name: 'Gaibandha', bn_name: 'গাইবান্ধা' }, { name: 'Bamondanga', bn_name: 'বামনডাঙ্গা' },
    { name: 'Pirgacha', bn_name: 'পীরগাছা' }, { name: 'Kaunia', bn_name: 'কাউনিয়া' },
    { name: 'Kurigram', bn_name: 'কুড়িগ্রাম' }, { name: 'Rangpur', bn_name: 'রংপুর' },
    { name: 'Panchagarh', bn_name: 'পঞ্চগড়' }, { name: 'Thakurgaon_Road', bn_name: 'ঠাকুরগাঁও রোড' },
    { name: 'Pirganj', bn_name: 'পীরগঞ্জ' }, { name: 'Dinajpur', bn_name: 'দিনাজপুর' },
    { name: 'Parbatipur', bn_name: 'পার্বতীপুর' }, { name: 'Joypurhat', bn_name: 'জয়পুরহাট' },
    { name: 'Kismat', bn_name: 'কিসমত' }, { name: 'Ruhea', bn_name: 'রুহিয়া' },
    { name: 'Setabganj', bn_name: 'সেতাবগঞ্জ' }, { name: 'Akkelpur', bn_name: 'আক্কেলপুর' },
    { name: 'Sadarghat', bn_name: 'সদরঘাট' }, { name: 'Ullapara', bn_name: 'উল্লাপাড়া' },
    { name: 'Bhairab_Bazar', bn_name: 'ভৈরব বাজার' }, { name: 'Tangail', bn_name: 'টাঙ্গাইল' },
    { name: 'Joydebpur', bn_name: 'জয়দেবপুর' }
];

// ছবি থেকে পাওয়া সব ট্রেনের রুট
const trainRoutes = [
    {
        trainName: 'Rangpur Express', trainNumber: '771',
        runDays: ['Friday', 'Saturday', 'Sunday', 'Tuesday', 'Wednesday', 'Thursday'],
        stops: [
            { stationName: 'Dhaka', departureTime: '09:10 am' },
            { stationName: 'Biman_Bandar', arrivalTime: '09:33 am', departureTime: '09:38 am' },
            { stationName: 'Ibrahimabad', arrivalTime: '11:33 am', departureTime: '11:35 am' },
            { stationName: 'Chatmohar', arrivalTime: '12:31 pm', departureTime: '12:34 pm' },
            { stationName: 'Natore', arrivalTime: '01:43 pm', departureTime: '01:46 pm' },
            { stationName: 'Santahar', arrivalTime: '02:45 pm', departureTime: '02:50 pm' },
            { stationName: 'Talora', arrivalTime: '03:13 pm', departureTime: '03:15 pm' },
            { stationName: 'Bogura', arrivalTime: '03:36 pm', departureTime: '03:41 pm' },
            { stationName: 'Sonatola', arrivalTime: '04:11 pm', departureTime: '04:13 pm' },
            { stationName: 'Bonar_Para', arrivalTime: '04:30 pm', departureTime: '04:40 pm' },
            { stationName: 'Gaibandha', arrivalTime: '05:03 pm', departureTime: '05:08 pm' },
            { stationName: 'Bamondanga', arrivalTime: '05:37 pm', departureTime: '05:40 pm' },
            { stationName: 'Pirgacha', arrivalTime: '05:58 pm', departureTime: '06:00 pm' },
            { stationName: 'Kaunia', arrivalTime: '06:16 pm', departureTime: '06:36 pm' },
            { stationName: 'Kurigram', arrivalTime: '07:20 pm', departureTime: '07:20 pm' },
            { stationName: 'Rangpur', arrivalTime: '07:00 pm' }
        ]
    },
    {
        trainName: 'Rangpur Express', trainNumber: '772',
        runDays: ['Friday', 'Saturday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        stops: [
            { stationName: 'Rangpur', departureTime: '08:00 pm' },
            { stationName: 'Kaunia', arrivalTime: '08:20 pm', departureTime: '08:40 pm' },
            { stationName: 'Kurigram', arrivalTime: '07:50 pm', departureTime: '07:30 pm' },
            { stationName: 'Pirgacha', arrivalTime: '08:56 pm', departureTime: '08:58 pm' },
            { stationName: 'Bamondanga', arrivalTime: '09:15 pm', departureTime: '09:18 pm' },
            { stationName: 'Gaibandha', arrivalTime: '09:47 pm', departureTime: '09:52 pm' },
            { stationName: 'Bonar_Para', arrivalTime: '10:15 pm', departureTime: '10:25 pm' },
            { stationName: 'Sonatola', arrivalTime: '10:42 pm', departureTime: '10:44 pm' },
            { stationName: 'Bogura', arrivalTime: '11:15 pm', departureTime: '11:20 pm' },
            { stationName: 'Talora', arrivalTime: '11:40 pm', departureTime: '11:42 pm' },
            { stationName: 'Santahar', arrivalTime: '12:10 am', departureTime: '12:15 am' },
            { stationName: 'Natore', arrivalTime: '01:25 am', departureTime: '01:28 am' },
            { stationName: 'Ibrahimabad', arrivalTime: '03:34 am', departureTime: '03:36 am' },
            { stationName: 'Dhaka', arrivalTime: '06:00 am' }
        ]
    },
    {
        trainName: 'Panchagarh Express', trainNumber: '793',
        runDays: ['Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        stops: [
            { stationName: 'Dhaka', departureTime: '11:30 pm' },
            { stationName: 'Biman_Bandar', arrivalTime: '11:53 pm', departureTime: '11:58 pm' },
            { stationName: 'Natore', arrivalTime: '03:27 am', departureTime: '03:30 am' },
            { stationName: 'Santahar', arrivalTime: '04:25 am', departureTime: '04:30 am' },
            { stationName: 'Joypurhat', arrivalTime: '05:01 am', departureTime: '05:04 am' },
            { stationName: 'Parbatipur', arrivalTime: '06:05 am', departureTime: '06:25 am' },
            { stationName: 'Dinajpur', arrivalTime: '06:58 am', departureTime: '07:03 am' },
            { stationName: 'Pirganj', arrivalTime: '08:05 am', departureTime: '08:08 am' },
            { stationName: 'Thakurgaon_Road', arrivalTime: '08:33 am', departureTime: '08:36 am' },
            { stationName: 'Panchagarh', arrivalTime: '09:50 am' }
        ]
    },
    {
        trainName: 'Panchagarh Express', trainNumber: '794',
        runDays: ['Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        stops: [
            { stationName: 'Panchagarh', departureTime: '12:10 pm' },
            { stationName: 'Thakurgaon_Road', arrivalTime: '12:50 pm', departureTime: '12:55 pm' },
            { stationName: 'Pirganj', arrivalTime: '01:20 pm', departureTime: '01:23 pm' },
            { stationName: 'Dinajpur', arrivalTime: '02:12 pm', departureTime: '02:20 pm' },
            { stationName: 'Parbatipur', arrivalTime: '03:00 pm', departureTime: '03:20 pm' },
            { stationName: 'Joypurhat', arrivalTime: '04:13 pm', departureTime: '04:16 pm' },
            { stationName: 'Santahar', arrivalTime: '04:50 pm', departureTime: '04:55 pm' },
            { stationName: 'Natore', arrivalTime: '05:36 pm', departureTime: '05:39 pm' },
            { stationName: 'Dhaka', arrivalTime: '10:10 pm' }
        ]
    },
    {
        trainName: 'Ekota Express', trainNumber: '706',
        runDays: ['Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        stops: [
            { stationName: 'Panchagarh', departureTime: '09:10 pm' },
            { stationName: 'Kismat', arrivalTime: '09:25 pm', departureTime: '09:27 pm' },
            { stationName: 'Ruhea', arrivalTime: '09:34 pm', departureTime: '09:36 pm' },
            { stationName: 'Thakurgaon_Road', arrivalTime: '09:51 pm', departureTime: '09:54 pm' },
            { stationName: 'Pirganj', arrivalTime: '10:16 pm', departureTime: '10:18 pm' },
            { stationName: 'Setabganj', arrivalTime: '10:32 pm', departureTime: '10:34 pm' },
            { stationName: 'Dinajpur', arrivalTime: '11:05 pm', departureTime: '11:13 pm' },
            { stationName: 'Chirirbandar', arrivalTime: '11:30 pm', departureTime: '11:32 pm' },
            { stationName: 'Parbatipur', arrivalTime: '11:50 pm', departureTime: '11:58 pm' },
            { stationName: 'Phulbari', arrivalTime: '12:28 am', departureTime: '12:31 am' },
            { stationName: 'Birampur', arrivalTime: '12:42 am', departureTime: '12:45 am' },
            { stationName: 'Panchbibi', arrivalTime: '01:05 am', departureTime: '01:07 am' },
            { stationName: 'Joypurhat', arrivalTime: '01:18 am', departureTime: '01:21 am' },
            { stationName: 'Akkelpur', arrivalTime: '01:35 am', departureTime: '01:37 am' },
            { stationName: 'Santahar', arrivalTime: '01:55 am', departureTime: '02:00 am' },
            { stationName: 'Natore', arrivalTime: '02:41 am', departureTime: '02:44 am' },

            { stationName: 'Ullapara', arrivalTime: '04:12 am', departureTime: '04:15 am' },
            { stationName: 'Bhairab_Bazar', arrivalTime: '04:50 am', departureTime: '04:52 am' },
            { stationName: 'Tangail', arrivalTime: '05:12 am', departureTime: '05:14 am' },
            { stationName: 'Joydebpur', arrivalTime: '06:18 am', departureTime: '06:21 am' },
            { stationName: 'Dhaka', arrivalTime: '07:20 am' }
        ]
    }
];

const importData = async () => {
    try {
        await Station.deleteMany();
        await TrainRoute.deleteMany();
        console.log('Old data destroyed.');

        await Station.insertMany(stations);
        await TrainRoute.insertMany(trainRoutes);
        console.log('✅ New Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error with data import', error);
        process.exit(1);
    }
};

const deleteData = async () => {
    try {
        await Station.deleteMany();
        await TrainRoute.deleteMany();
        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error('Error with data destruction', error);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    deleteData();
} else {
    importData();
}