const express = require('express');
const router = express.Router();
const Bookingdetails = require('../model/bookingdetails');

// Endpoint to add booking details
router.post('/addbookingdetails', async (req, res) => {
    const { roomName, fromDate, toDate, Count } = req.body;

    // Validate date inputs
    if (isNaN(new Date(fromDate)) || isNaN(new Date(toDate))) {
        return res.status(400).json({ success: false, error: 'Invalid date format' });
    }

    try {
        // Check for overlapping bookings and return the count
        const overlappingBookingsCount = await BookingDetails.countDocuments({
            roomName,
            fromDate: { $lte: new Date(toDate) },
            toDate: { $gte: new Date(fromDate) },
        });

        if (overlappingBookingsCount > 0) {
            // If there are overlapping bookings, increment the count for each
            const existingBookings = await BookingDetails.find({
                roomName,
                fromDate: { $lt: new Date(toDate) },
                toDate: { $gt: new Date(fromDate) },
            });

            for (const existingBooking of existingBookings) {
                existingBooking.Count += 1;
                await existingBooking.save();
            }

            // Return the greatest count
            const greatestCount = Math.max(...existingBookings.map(booking => booking.Count));
            return res.status(200).json({ count: greatestCount });
        }

        // If no overlapping booking, create a new booking details record
        const newBookingDetails = new BookingDetails({
            roomName,
            fromDate,
            toDate,
            Count: Count || 1, // Initialize count to 1 if not provided
        });

        const savedBookingDetails = await newBookingDetails.save();

        res.status(201).json({ count: savedBookingDetails.Count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Endpoint to get the count of overlapping bookings for a specific room and date range
router.post('/getBookingCount', async (req, res) => {
    try {
      const { roomName, fromDate, toDate } = req.body;
  
      // Check for overlapping bookings and return the count
      const overlappingBookingsCount = await Bookingdetails.countDocuments({
        roomName,
        fromDate: { $lt: new Date(toDate) },
        toDate: { $gt: new Date(fromDate) },
      });
  
      res.json({ count: overlappingBookingsCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  module.exports=router;  