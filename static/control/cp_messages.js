function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    document.getElementById('mId').addEventListener('input', e =>{
        fetch('http://localhost:9000/api/messages/' + document.getElementById('mId').value,
        {headers: {'Authorization': `Bearer ${token}`}})
        .then( res => res.json() )
        .then( mssg => {
            fetch('http://localhost:9000/api/users/' + mssg.userId)
            .then( res => res.json() )
            .then( user => {
                document.getElementById('mBody').value = mssg.body;
                if(user != null)
                    document.getElementById('mBelongsTo').value = user.name;
                else
                    document.getElementById('mBelongsTo').value = "User not found / deleted"
            });
        });
    });

    document.getElementById('editMssg').addEventListener('click', e => {
        e.preventDefault();
        validity();
        let mssgId = document.getElementById('mId').value;
        let username = document.getElementById("mBelongsTo").value;
        if(username != ""){
            fetch('http://localhost:9000/api/users/name/' + username,
            {headers: {'Authorization': `Bearer ${token}`}})
            .then( res => res.json() )
            .then( user => {
                const input = {
                    body: document.getElementById('mBody').value,
                    userId: user.id
                };
                
                fetch('http://localhost:9000/api/messages/' + mssgId, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify(input)
                })
                .then( res => res.json() )
                .then( data => {
                   
                    showMessages();
                });
            });
        }
    });
    
    document.getElementById('addMssg').addEventListener('click', e => {
        e.preventDefault();
        validity();
        let username = document.getElementById("mBelongsTo").value;
        if(username != ""){
            fetch('http://localhost:9000/api/users/name/' + username,
            {headers: {'Authorization': `Bearer ${token}`}})
            .then( res => res.json() )
            .then( user => {
                const input = {
                    body: document.getElementById('mBody').value,
                    userId: user.id
                };
                fetch('http://localhost:9000/api/messages', 
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify(input),
                })
                .then( res => res.json() )
                .then( data => {
                    showMessages();
                });
            });
        }
        
    });
    document.getElementById('deleteMssg').addEventListener('click', e => {
        e.preventDefault();
        
        mssgId = document.getElementById('mId').value;
        if(mssgId.length == 0){
            document.getElementById('mId').style.borderColor = "red";
        }
        else{
            document.getElementById('mId').style.removeProperty('border');
        }
        fetch('http://localhost:9000/api/messages/' + mssgId, 
        {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        })
        .then( res => res.json() )
        .then( data => {
            showMessages();
        });
    });

    
    showMessages();
}

function showMessages(){
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    fetch('http://127.0.0.1:9000/api/messages',
    {headers: {'Authorization': `Bearer ${token}`}})
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('mssgList');
            lst.innerHTML = "";
            lst.innerHTML += `<tr><th> ID </th> <th> Belongs to </th> <th> Body </th> </tr>`;
            data.forEach( el => { 
                fetch('http://localhost:9000/api/users/' + el.userId,
                {headers: {'Authorization': `Bearer ${token}`}})
                .then( res => res.json() )
                .then( user => {
                    if(user != null)
                        lst.innerHTML += `<tr> <td> ${el.id} </td> <td> ${user.name} </td> <td> ${el.body} </td> </tr>`;
                    else
                        lst.innerHTML += `<tr> <td> ${el.id} </td> <td> User not found / deleted </td> <td> ${el.body} </td> </tr>`;
                });
            });
        });
}

function validity(){
    body = document.getElementById('mBody').value;;
    uname = document.getElementById('mBelongsTo').value;

    if(body.length == 0){
        document.getElementById('mBody').style.borderColor = "red";
    }
    else{
        document.getElementById('mBody').style.removeProperty('border');
    }
    if(uname.length == 0){
        document.getElementById('mBelongsTo').style.borderColor = "red";
    }
    else{
        document.getElementById('mBelongsTo').style.removeProperty('border');
    }
}
