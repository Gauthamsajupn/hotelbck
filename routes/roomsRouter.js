const express = require("express");
const router = express.Router();
const Room = require('../model/room');

// Route to get all rooms
router.get("/getallrooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.send(rooms);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to get room by ID
router.post("/getroombyid", async (req, res) => {
    const roomid = req.body.roomid;
    try {
      const foundRoom = await Room.findOne({ _id: roomid });
      res.send(foundRoom);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
});

// Route to add a new room
router.post("/addroom", async (req, res) => {
  try {
    const newroom = new Room(req.body);
    await newroom.save();
    res.send("New Room Added Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to update room details
router.put("/updateroom/:id", async (req, res) => {
  const roomId = req.params.id;
  const updatedRoomDetails = req.body;

  try {
    await Room.updateOne({ _id: roomId }, { $set: updatedRoomDetails });
    res.send("Room updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to delete a room by ID
// Route to delete a room by ID
router.delete("/deleteroom/:id", async (req, res) => {
  const roomId = req.params.id;
  try {
    const deletedRoom = await Room.findOneAndDelete({ _id: roomId });
    if (deletedRoom) {
      res.send("Room deleted successfully");
    } else {
      res.status(404).send("Room not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
// Activation route
router.put('/handleactivate/:roomId', async (req, res) => {
  try {
    const roomId = req.params.roomId;

    // Find the room by ID
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Update the 'display' field to true (activate)
    room.display = true;

    // Save the updated room
    await room.save();

    return res.status(200).json({ message: 'Room activated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Deactivation route
router.put('/handledeactivate/:roomId', async (req, res) => {
  try {
    const roomId = req.params.roomId;

    // Find the room by ID
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Update the 'display' field to false (deactivate)
    room.display = false;

    // Save the updated room
    await room.save();

    return res.status(200).json({ message: 'Room deactivated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/getroomcount/:roomId', async (req, res) => {
  try {
    const roomId = req.params.roomId;

    // Fetch the room by ID from the database
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    // Send the count of the room
    res.json({ count: room.count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
