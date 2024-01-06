const mongoose = require("mongoose");

const roomschema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    maxcount: {
      type: Number,
      required: true,
    },

    conditioning: {
      type: String,
      required: true,
    },

    rentperday: {
      type: Number,
      required: true,
    },

    imageurls: [],

    currentbookings: [],

    type: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    count: {
      type: Number,
      required: true,
      default: 0,
    },

    display: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const roomModel = mongoose.model("rooms", roomschema);

module.exports = roomModel;
