function init() {
/*
    document.getElementById('users').addEventListener('click', e => {
        e.preventDefault();
        window.location.href = './admin/users/panel';
    });*/

    showBooks();
    showMyBooks();
}

function showBooks(){
    fetch('http://localhost:9000/api/books')
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('bookList');
            lst.innerHTML = "";
            lst.innerHTML += `<tr><th> ID </th> <th> Name </th> <th> Author </th> <th> Description </th> <th> Belongs to </th></tr>`;
            data.forEach( el => { 
                if(el.userId == 0){
                    lst.innerHTML += `<tr> <td> ${el.id} </td> <td> ${el.name} </td> <td> ${el.author} </td>
                    <td> ${el.description} </td> <td> ${el.userId} </td><td>
                    <button data-id="${el.id}" class="btn btn-secondary btn-dark delete" onclick="buyBook(this)">
                   Buy
                    </button> </td></tr> `;
                }             
            });
        });
}
function showMyBooks(){
    fetch('http://localhost:9000/api/books')
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('myBookList');
            lst.innerHTML = "";
            lst.innerHTML += `<tr><th> ID </th> <th> Name </th> <th> Author </th> <th> Description </th> <th> Belongs to </th></tr>`;
            // TODO: preko cookiea izmeniti
            let myUserId = 1;
            data.forEach( el => { 
                if(el.userId == myUserId){
                    lst.innerHTML += `<tr> <td> ${el.id} </td> <td> ${el.name} </td> <td> ${el.author} </td>
                    <td> ${el.description} </td> <td> ${el.userId} </td><td>
                    <button data-id="${el.id}" class="btn btn-secondary btn-dark delete" onclick="removeBook(this)">
                   Remove
                    </button> </td></tr> `;
                }             
            });
        });
}
function removeBook(obj){

    let id = obj.getAttribute('data-id');

    const input = {
        userId: 0
    };

    fetch('http://localhost:9000/api/books/take/' + id,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        })
        .then( res => res.json() )
        .then( data => {
            alert("Successfully removed book!");
            showMyBooks();
            showBooks();
        });
}

function buyBook(obj){

    let id = obj.getAttribute('data-id');
    // TODO: from token
    let userId = 1;
    const input = {
        userId: userId
    };

    fetch('http://localhost:9000/api/books/take/' + id,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        })
        .then( res => res.json() )
        .then( data => {
            alert("Successfully bought book!");
            showBooks();
            showMyBooks();
        });
}

