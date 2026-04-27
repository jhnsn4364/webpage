// start your backend for the project with this file
const path = require("path");

const express = require("express");
const serveIndex = require("serve-index");
const bodyParser = require("body-parser");

const app = express();
const formParser = bodyParser.urlencoded({ inflate: false });

const formUrl = "/form";
const formErrorPage = "/form-error.html";

const bannedUsers = ["9999999"];
const day_start = 8;
const day_end = 12 + 8;

const rooms = new Map();
for (const room of [
  "101",
  "102",
  "103",
  "104",
  "105",
  "106",
  "107",
  "108",
  "201",
  "202",
  "203",
  "204",
  "205",
  "206",
  "207",
  "208",
]) {
  rooms.set(room, []);
}

const formKeys = [
  "name",
  "uhid",
  "email",
  "phone",
  "email_pref",
  "phone_pref",
  "room",
  "datetime-start",
  "datetime-end",
];

app.post(formUrl, formParser, (req, res, next) => {
  const formData = req.body;
  console.log("formData: %o", formData);
  console.log("rooms: %o", rooms);

  const validation_errors = {};
  for (const key of formKeys) {
    validation_errors[key] = {
      original_value: formData[key],
      error_messages: [],
    };
  }

  if (bannedUsers.includes(formData.uhid)) {
    validation_errors.uhid.error_messages.push(
      `user ${formData.uhid} is banned`,
    );
  }

  const start_time = new Date(formData["datetime-start"]);
  const end_time = new Date(formData["datetime-end"]);

  if (start_time.getTime() > end_time.getTime()) {
    const message = `start time (${start_time}) is after end time (${end_time})`;
    validation_errors["datetime-start"].error_messages.push(message);
    validation_errors["datetime-end"].error_messages.push(message);
  }

  const opening_time = new Date(start_time);
  opening_time.setHours(day_start, 0, 0, 0);
  if (start_time.getTime() < opening_time) {
    validation_errors["datetime-start"].error_messages.push(
      `start time (${start_time}) must be after opening (${opening_time})`,
    );
  }

  const closing_time = new Date(end_time);
  closing_time.setHours(day_end, 0, 0, 0);
  if (end_time.getTime() > closing_time) {
    validation_errors["datetime-end"].error_messages.push(
      `end time (${end_time}) must be before closing time (${closing_time})`,
    );
  }

  if (!rooms.has(formData.room)) {
    validation_errors.room.error_messages.push(
      `invalid room chosen: ${formData.room}`,
    );
  } else {
    console.log(
      "formData.room: %o,\nrooms.get(form.room): %o",
      formData.room,
      rooms.get(formData.room),
    );
    for (const booking of rooms.get(formData.room)) {
      const start_overlaps =
        start_time.getTime() >= booking.start_time.getTime() &&
        start_time.getTime() <= booking.end_time.getTime();
      if (start_overlaps) {
        validation_errors["datetime-start"].error_messages.push(
          `start time (${start_time}) overlaps with existing booking: ${JSON.stringify(booking)}`,
        );
      }
      const end_overlaps =
        end_time.getTime() <= booking.end_time.getTime() &&
        end_time.getTime() >= booking.start_time.getTime();
      if (end_overlaps) {
        validation_errors["datetime-end"].error_messages.push(
          `end time (${end_time}) overlaps with existing booking: ${JSON.stringify(booking)}`,
        );
      }
    }
  }

  for (const key in validation_errors) {
    if (validation_errors[key].error_messages.length > 0) {
      const fragment =
        "#" + encodeURIComponent(JSON.stringify(validation_errors));
      res.redirect(302, "/reservations.html" + fragment);
      return;
    }
  }

  rooms.get(formData.room).push({
    name: formData.name,
    uhid: formData.uhid,
    email: formData.email,
    phone: formData.phone,
    email_pref: formData.email_pref,
    phone_pref: formData.phone_pref,
    start_time,
    end_time,
  });

  res.status(200).send("success");
});

// This could return json encoding the current bookings for each room. That
// json could be used to render a bar graph for each room with the booking
// start and end times being used to calculate where a rectangle is placed
// along on that bar graph:
// Room 101: 8AM -------[=====]--[==]----- 8PM
// Room 102: 8AM [===]-------------------- 8PM
/*
app.get(formUrl, (req, res) => {
});
*/

const webRoot = path.join(__dirname, "..", "frontend");
app.use("/", express.static(webRoot), serveIndex(webRoot, {}));

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
