// start your backend for the project with this file
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let rooms = [];
for (let i = 0; i<16; i++){
    let dates = [];
    rooms.push(dates);
}
let reservations = [];


app.post('/make-reservation', async (req, res) => {
    try {
        console.log('reservation request received');
        const { room, date, time, name, uhid, email, phone, pref } = req.body;
        console.log(req.body);
        if (!name || !uhid || !room || !date || !time) {
            return res.status(400).send({ error: "Missing minimum necessary reservation info" });
        }
        
        const dates = rooms[room];
        let day_stored = false;

        if (dates.length>0){
            for (let i = 0; i<=dates.length; i++){
                if (dates[i].date == date){
                    day_stored = true;
                    if(dates[i].times[time]){
                        let new_reservation = {
                            reservation_id: reservations.length,
                            room: room,
                            date_id: i,
                            time: time,
                            name: name,
                            uhid: uhid,
                            email: email,
                            phone: phone,
                            contact_pref: pref
                        };
                        reservations.push(new_reservation);
                        dates[i].times[time]=false;

                        return res.status(201).send({ reservation_details: new_reservation });
                    }
                    else{
                        return res.status(400).send({ error: "The selected room is already booked during that timeslot" });
                    }
                }
            }
        }
        if (!day_stored){
            new_times=[];
            for(let i = 0; i<12; i++){
                new_times[i]=true;
            }
            new_times[time]=false;
            let new_date = {
                id: dates.length,
                date: date,
                times: new_times
            };
            dates.push(new_date);

            let new_reservation = {
                reservation_id: reservations.length,
                room: room,
                date_id: new_date.id,
                time: time,
                name: name,
                uhid: uhid,
                email: email,
                phone: phone,
                contact_pref: pref
            };
            reservations.push(new_reservation);

            return res.status(201).send({ reservation_details: new_reservation });
        }
        
    } catch (error) {
        console.error("Error processing reservation request:", error);
        res.status(500).send({ error: "Internal server error" });
    }
});

app.post('/get-availability', async (req, res) => {
    try {
        console.log('availability request received');
        console.log(req.body);
        const { room, date } = req.body;
        if (!room || !date) {
            return res.status(400).send({ error: "Missing minimum necessary reservation info" });
        }

        const dates = rooms[room];
        let times = [];

        let day_stored = false;
        for (const day of dates){
            if (day.date == date){
                times = day.times;
                day_stored=true;
                
            }
        }
        if (!day_stored){
            for(let i = 0; i<12; i++){
                times[i]=true;
            }
        }
        
        return res.status(201).send({ times: times });
        
    } catch (error) {
        console.error("Error processing lookup request:", error);
        res.status(500).send({ error: "Internal server error" });
    }
});




const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});