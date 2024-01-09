const mongoose = require('mongoose');

const bookingdetailsSchema = mongoose.Schema(
    {
        roomName: {
            type: String,
            required: true,
        },

        fromDate: {
            type: Date,
            required: true,
        },

        toDate: {
            type: Date,
            required: true,
        },

        Count: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const bookingsModel = mongoose.model('BookingDetails', bookingdetailsSchema);

module.exports = bookingsModel;
