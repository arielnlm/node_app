function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    
    document.getElementById('eId').addEventListener('input', e =>{
        
        fetch('http://localhost:9000/api/events/' + document.getElementById('eId').value,
        {headers: {'Authorization': `Bearer ${token}`}})
        .then( res => res.json() )
        .then( event => {
            document.getElementById('eName').value = event.name;
            document.getElementById('eDescription').value = event.description;
            let date = new Date(event.date);
            let newDate = date.getDate() + "-" + date.getMonth()+1 + "-" + date.getFullYear();
            console.log(Date(date.getDate(), date.getMonth() + 1, date.getFullYear()));
            
            document.getElementById('eDate').value = new Date(newDate);
            document.getElementById('eTime').value = event.time;
            document.getElementById('eHost').value = event.host;
            document.getElementById('eGuests').value = event.guests;
        });
    });
    document.getElementById('editEvent').addEventListener('click', e => {
        e.preventDefault();
        validity();
        let eventId = document.getElementById('eId').value;
        const input = {
            name: document.getElementById('eName').value,
            description: document.getElementById('eDescription').value,
            date: document.getElementById('eDate').value,
            time: document.getElementById('eTime').value,
            host: document.getElementById('eHost').value,
            guests: document.getElementById('eGuests').value
        };

        fetch('http://localhost:9000/api/events/' + eventId,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify(input)
        })
        .then( res => res.json() )
        .then( data => {
            showEvents();
        });

    });
    document.getElementById('addEvent').addEventListener('click', e => {
        e.preventDefault();
        validity();
        const input = {
            name: document.getElementById('eName').value,
            description: document.getElementById('eDescription').value,
            date: document.getElementById('eDate').value,
            time: document.getElementById('eTime').value,
            host: document.getElementById('eHost').value,
            guests: document.getElementById('eGuests').value
        };
        fetch('http://localhost:9000/api/events', 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify(input)
        })
        .then( res => res.json() )
        .then( data => {
            showEvents();
        });
    });
    document.getElementById('deleteEvent').addEventListener('click', e => {
        e.preventDefault();
        
        let eventId = document.getElementById('eId').value;
        if(eventId.length == 0){
            document.getElementById('eId').style.borderColor = "red";
        }
        else{
            document.getElementById('eId').style.removeProperty('border');
        }
        fetch('http://localhost:9000/api/events/' + eventId, 
        {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        })
        .then( res => res.json() )
        .then( data => {
            showEvents();
        });
    });

    showEvents();
    
}

function showEvents(){
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    fetch('http://localhost:9000/api/events',
    {headers: {'Authorization': `Bearer ${token}`}})
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('eventList');
            lst.innerHTML = "";
            lst.innerHTML += `<tr><th> ID </th> <th> Name </th> <th> Description </th> <th> Date </th> <th> Time </th> <th> Host </th> <th> Guests </th> </tr>`;
            data.forEach( el => { 
                lst.innerHTML += `<tr> <td> ${el.id} </td> <td> ${el.name} </td> <td> ${el.description} </td> <td> ${el.date} </td> <td> ${el.time} </td> <td> ${el.host} </td> <td> ${el.guests} </td> </tr>`;
            });
        });
}

function validity(){
    ename = document.getElementById('eName').value,
    edescription = document.getElementById('eDescription').value,
    edate = document.getElementById('eDate').value,
    etime = document.getElementById('eTime').value,
    ehost = document.getElementById('eHost').value,
    eguests = document.getElementById('eGuests').value

    if(ename.length == 0){
        document.getElementById('eName').style.borderColor = "red";
    }
    else{
        document.getElementById('eName').style.removeProperty('border');
    }
    if(edescription.length == 0){
        document.getElementById('eDescription').style.borderColor = "red";
    }
    else{
        document.getElementById('eDescription').style.removeProperty('border');
    }
    if(edate.length == 0){
        document.getElementById('eDate').style.borderColor = "red";
    }
    else{
        document.getElementById('eDate').style.removeProperty('border');
    }
    if(etime.length == 0){
        document.getElementById('eTime').style.borderColor = "red";
    }
    else{
        document.getElementById('eTime').style.removeProperty('border');
    }
    if(ehost.length == 0){
        document.getElementById('eHost').style.borderColor = "red";
    }
    else{
        document.getElementById('eHost').style.removeProperty('border');
    }
    if(eguests.length == 0){
        document.getElementById('eGuests').style.borderColor = "red";
    }
    else{
        document.getElementById('eGuests').style.removeProperty('border');
    }
}

