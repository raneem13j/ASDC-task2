import Room from "../models/roomModel.js";
import User from "../models/userModel.js";

export const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find()
        res.status(200).json(rooms);
      } catch (err) {
        res.status(500).json({ error: err });
      }
  };

export const getRoomById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const room = await Room.findById(id)

        if (!room) {
          return res.status(404).json({ message: "Id not found" });
        }
        
        res.status(200).json(room);
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
  }  



export const createRoom = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(userId);
         const newRoom = new Room ({
           roomName: req.body.roomName,
           userId: [userId],
         });
         await newRoom.save();

         res.status(201).json(newRoom);
         console.log(Room)
     } catch (error) {
         if (error) {
             return res.status(400).json({ message: error.message });
         }
         res.status(500).json({ message: "Internal Server Error" });
     }
  };
 
  export const joinRoom = async (req, res) => {
   
    try {
        const roomId = req.params.id; 
        const userId = req.body.userId; 
    
        // Validate if the room exists
        const room = await Room.findById(roomId);
        if (!room) {
          return res.status(404).json({ message: "Room not found" });
        }
    
        // Check if the user is already in the room
        if (room.userId.includes(userId)) {
          return res.status(400).json({ message: "User is already in the room" });
        }
    
        // Add the user to the room
        room.userId.push(userId);
        await room.save();
    
        res.status(200).json({ message: "User joined the room successfully", room });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
  };


  export const getUsersInRoom = async (req, res) => {
    try {
      const roomId = req.params.id; // Room ID
      const room = await Room.findById(roomId);
  
      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      }
  
      // Get user details for the user IDs in the room
      // Assuming you have a User model
      const users = await User.find({ _id: { $in: room.userId } });
  
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }; 

  export const getRoomsByUserId = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      // Find rooms where the userId array contains the specified user ID
      const rooms = await Room.find({ userId: userId });
  
      if (!rooms || rooms.length === 0) {
        return res.status(404).json({ message: "No rooms found for the user" });
      }
  
      res.status(200).json(rooms);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };