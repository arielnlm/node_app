function init() {

    showEvents();
}

function showEvents(){
    fetch('http://localhost:9000/api/events')
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('eventList');
            lst.innerHTML = "";
            lst.innerHTML += `<tr><th> ID </th> <th> Name </th> <th> Description </th> <th> Date </th> <th> Time </th> <th> Host </th> <th> Guests </th> </tr>`;
            data.forEach( el => { 
                lst.innerHTML += `<tr> <td> ${el.id} </td> <td> ${el.name} </td> <td> ${el.description} </td> <td> ${el.date}
                 </td> <td> ${el.time} </td> <td> ${el.host} </td> <td> ${el.guests} </td><td>
                 <button data-id="${el.id}" class="btn btn-secondary btn-dark delete" onclick="comingEvent(this)">
                   I'm coming!
                    </button> </td> </tr>`;
            });
        });
}

function comingEvent(obj){

    let id = obj.getAttribute('data-id');
    console.log("pozvan");
    fetch('http://localhost:9000/api/events/coming/' + id)
        .then( res => res.json() )
        .then( data => {
            alert("Added you as one more guest!");
            showEvents();
        });
}