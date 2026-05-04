document.addEventListener('DOMContentLoaded', function(){
    


    async function checkAvailable(e) {
        e.preventDefault();

        let room = document.getElementById('room').value;
        let date = document.getElementById('date').value;


        try {
            const response = await fetch('http://localhost:3000/get-availability', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ room, date })
            });

            if (response.status === 400) {
                alert("Please select a room and valid date");
                return;
            }

            const timeslots = await response.json();
            timeslots_array = timeslots.times;

            for (let i = 0; i<12; i++){
                console.log(`timeslot${i}-status`);
                let status_box = document.getElementById(`timeslot${i}-status`);
                if(timeslots_array[i]){
                    status_box.style.color = 'green';
                    status_box.textContent = 'Available';
                }
                else{
                    status_box.style.color = 'red';
                    status_box.textContent = 'Reserved';
                }
            }
            console.log(timeslots);
            
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred.");
        }
    }

    async function makeReservation(e, time) {
        let room = document.getElementById('room').value;
        let date = document.getElementById('date').value;
        let name = document.getElementById('name').value;
        let uhid = document.getElementById('uhid').value;
        let email = document.getElementById('email').value;
        let phone = document.getElementById('phone').value;
        let email_pref = document.getElementById('email_pref').checked;
        let phone_pref = document.getElementById('phone_pref').checked;

        let pref = 0; 
        if (email_pref){
            pref+=1;
        }
        if (phone_pref){
            pref+=2;
        }


        try {
            const response = await fetch('http://localhost:3000/make-reservation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ room, date, time, name, uhid, email, phone, pref })
            });

            if (!response.ok) {
                const error = await response.json();
                alert(`Error: ${error.error}`);
                return;
            }

            alert("Reservation Submitted!");
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while making the reservation.");
        }
    }


    document.getElementById('button-available').addEventListener('click', function(e){
        let room = document.getElementById('room').value;
        let date = document.getElementById('date').value;
        console.log("Date: ", date, " Type: ", typeof(date));
        let todays_date = new Date();
        
        e.preventDefault();
        error_div.innerHTML = '';
        const error_list = document.createElement('ul');

        if (room == ""){
            const newMessage = document.createTextNode('Please select a room');
            const newListElem = document.createElement('li');
            newListElem.appendChild(newMessage);
            error_list.appendChild(newListElem);
        }
        if (!date || date < todays_date){
            console.log("!date.value: ", !date.value, "\ndate.value<Date(): ", date.value < todays_date)
            const newMessage = document.createTextNode('Please enter a valid date');
            const newListElem = document.createElement('li');
            newListElem.appendChild(newMessage);
            error_list.appendChild(newListElem);
        }
        error_div.appendChild(error_list);
        console.log(room, date);

        let time = document.querySelector('input[name="timeslot-select"]:checked').value;
        console.log("Timeslot: ", time);
        
        if (room == "" || (date < todays_date)){
            alert('Please select a room and a valid date to continue');
        }
        else{
            checkAvailable(e);
        }
        
    })

    document.getElementById('button-submit').addEventListener('click', function(e){
        e.preventDefault();
        let room = document.getElementById('room').value;
        let date = document.getElementById('date').value;
        let name = document.getElementById('name').value;
        let uhid = document.getElementById('uhid').value;
        let email = document.getElementById('email').value;
        let phone = document.getElementById('phone').value;
        let email_pref = document.getElementById('email_pref').value;
        let phone_pref = document.getElementById('phone_pref').value;

        let error_div = document.getElementById('error_div');
        let todays_date = new Date();



        error_div.innerHTML = '';
        const error_list = document.createElement('ul');
        
        if (room == ""){
            const newMessage = document.createTextNode('Please select a room');
            const newListElem = document.createElement('li');
            newListElem.appendChild(newMessage);
            error_list.appendChild(newListElem);
        }
        if (!date || date < todays_date){
            const newMessage = document.createTextNode('Please enter a valid date');
            const newListElem = document.createElement('li');
            newListElem.appendChild(newMessage);
            error_list.appendChild(newListElem);
        }
        if (!name){
            const newMessage = document.createTextNode('Please enter a name for the reservation');
            const newListElem = document.createElement('li');
            newListElem.appendChild(newMessage);
            error_list.appendChild(newListElem);
        }
        if (!uhid){
            const newMessage = document.createTextNode('Please enter your UHID for the reservation');
            const newListElem = document.createElement('li');
            newListElem.appendChild(newMessage);
            error_list.appendChild(newListElem);
        }
        if (!email && !phone){
            const newMessage = document.createTextNode('Please enter at least one contact method');
            const newListElem = document.createElement('li');
            newListElem.appendChild(newMessage);
            error_list.appendChild(newListElem);
        }
        error_div.appendChild(error_list);

        let time = document.querySelector('input[name="timeslot-select"]:checked').value;
        console.log("Timeslot: ", time);
        
        if (room == "" || date<todays_date || !time || !name || !uhid || (!email && !phone)){
            alert('Please ensure you\'ve selected a time and entered all necessary reservation information');
        }
        else{
            makeReservation(e, time);
        }
        
    })

    
});