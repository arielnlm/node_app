function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    
   
    document.getElementById('sendBtn').addEventListener('click', e => {
        e.preventDefault();
        // TODO: implement
        let name = document.getElementById('toWho').value;

        fetch('http://127.0.0.1:9000/api/users/name/' + name)
        .then( res => res.json() )
        .then( userObj => {
            const data = {
                userId: userObj.id,
                body: document.getElementById('body').value,
            };
            fetch('http://127.0.0.1:9000/api/messages/', {
                method: 'POST',
                headers: { 
                'Content-Type': 'application/json', 
                },
                
                body: JSON.stringify(data)
            })
            .then( res => res.json() )
            .then( el => {
                    showMssgs();
            });
        });
        
    });

    showMssgs();
}

function showMssgs(){
    //let payload = token.split('.')[1];
    //let res = JSON.parse(atob(payload));
    //console.log(res);
    let userId = 2;
    // userId = res.userId;
    const lst = document.getElementById('msgs');
    // Get all messages
    fetch('http://127.0.0.1:9000/api/messages/')
        .then( res => res.json() )
        .then( data => {
            fetch('http://127.0.0.1:9000/api/users/' + userId)
            .then( res => res.json() )
            .then( data2 => {
                lst.innerHTML = `<tr> <th> ID </th> <th> Body </th> </tr>`;;
                if(data2 != null)
                data.forEach(el => {
                    if(el.userId == data2.id)
                        lst.innerHTML += `<tr> <td> ${el.id} </td> <td> ${el.body} </td> </tr>`;
                });
            });
        });

}