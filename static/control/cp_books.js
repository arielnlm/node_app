
function validity(){
    bname = document.getElementById('bName').value; 
    bauthor = document.getElementById('bAuthor').value;
    bdesc = document.getElementById('bDescription').value;
    bid = document.getElementById('uname').value;

    if(bname.length == 0){
        document.getElementById('bName').style.borderColor = "red";
    }
    else{
        document.getElementById('bName').style.removeProperty('border');
    }
    if(bauthor.length == 0){
        document.getElementById('bAuthor').style.borderColor = "red";
    }
    else{
        document.getElementById('bAuthor').style.removeProperty('border');
    }
    if(bdesc.length == 0){
        document.getElementById('bDescription').style.borderColor = "red";
    }
    else{
        document.getElementById('bDescription').style.removeProperty('border');
    }
    if(bid.length == 0){
        document.getElementById('uname').style.borderColor = "red";
    }
    else{
        document.getElementById('uname').style.removeProperty('border');
    }
}

function init() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    document.getElementById('bId').addEventListener('input', e =>{
        
        fetch('http://localhost:9000/api/books/' + document.getElementById('bId').value,
        {headers: {'Authorization': `Bearer ${token}`}})
        .then( res => res.json() )
        .then( book => {
            document.getElementById('bName').value = book.name;
            document.getElementById('bAuthor').value = book.author;
            document.getElementById('bDescription').value = book.description;
            document.getElementById('uname').value = book.userId;
        });
    });
    document.getElementById('editBook').addEventListener('click', e => {
        e.preventDefault();
        validity();
        let bookId = document.getElementById('bId').value;
        let username = document.getElementById('uname').value;
    
        // Get userId from user name
        fetch('http://localhost:9000/api/users/name/' + username,
        {headers: {'Authorization': `Bearer ${token}`}})
        .then( res => res.json() )
        .then( data => {
            const input = {
                name: document.getElementById('bName').value,
                author: document.getElementById('bAuthor').value,
                description: document.getElementById('bDescription').value,
                userId: data.id
            };
    
            fetch('http://localhost:9000/api/books/' + bookId,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(input)
            })
            .then( res => res.json() )
            .then( data => {
                showBooks();
            });
        });
        

    });
    
    document.getElementById('addBook').addEventListener('click', e => {
        e.preventDefault();
        validity();
        let username = document.getElementById('uname').value;
        if(username != ""){
            fetch('http://localhost:9000/api/users/name/' + username,
            {headers: {'Authorization': `Bearer ${token}`}})
            .then( res => res.json() )
            .then( data => {
                const input = {
                    name: document.getElementById('bName').value,
                    author: document.getElementById('bAuthor').value,
                    description: document.getElementById('bDescription').value,
                    userId: data.id
                };
                fetch('http://localhost:9000/api/books', 
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify(input)
                })
                .then( res => res.json() )
                .then( data => {
                    showBooks();
                });
            });
        }
        else{
            const input = {
                name: document.getElementById('bName').value,
                author: document.getElementById('bAuthor').value,
                description: document.getElementById('bDescription').value,
                userId: 0
            };
            fetch('http://localhost:9000/api/books', 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(input)
            })
            .then( res => res.json() )
            .then( data => {
                showBooks();
            });
        }
        
    });
    document.getElementById('deleteBook').addEventListener('click', e => {
        e.preventDefault();

        bookId = document.getElementById('bId').value;
        if(bookId.length == 0){
            document.getElementById('bId').style.borderColor = "red";
        }
        else{
            document.getElementById('bId').style.removeProperty('border');
        }
        fetch('http://localhost:9000/api/books/' + bookId, 
        {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}` },
        })
        .then( res => res.json() )
        .then( data => {
            showBooks();
        });
    });

    
    showBooks();
}

function showBooks(){
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    fetch('http://localhost:9000/api/books',
    {headers: {'Authorization': `Bearer ${token}`}})
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('bookList');
            lst.innerHTML = "";
            lst.innerHTML += `<tr><th> ID </th> <th> Name </th> <th> Author </th> <th> Description </th> <th> Belongs to </th></tr>`;
            data.forEach( el => { 
                fetch('http://localhost:9000/api/users/' + el.userId,
                {headers: {'Authorization': `Bearer ${token}`}})
                .then( res => res.json() )
                .then( user => {
                    if(user != null)
                        lst.innerHTML += `<tr> <td> ${el.id} </td> <td> ${el.name} </td> <td> ${el.author} </td> <td> ${el.description} </td> <td> ${user.name} </td></tr>`;
                    else if(el.userId == 0)
                        lst.innerHTML += `<tr> <td> ${el.id} </td> <td> ${el.name} </td> <td> ${el.author} </td> <td> ${el.description} </td> <td> Noone </td></tr>`;
                    else
                        lst.innerHTML += `<tr> <td> ${el.id} </td> <td> ${el.name} </td> <td> ${el.author} </td> <td> ${el.description} </td> <td> User not found / deleted </td></tr>`; 
                });
            });
        });
}