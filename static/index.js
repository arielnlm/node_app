function init() {

    document.getElementById('users').addEventListener('click', e => {
        e.preventDefault();
        window.location.href = 'http://127.0.0.1:8000/admin/users/panel';
    });
    document.getElementById('mssg').addEventListener('click', e => {
        e.preventDefault();
        window.location.href = 'http://127.0.0.1:8000/admin/messages/panel';
    });
    document.getElementById('events').addEventListener('click', e => {
        e.preventDefault();
        window.location.href = 'http://127.0.0.1:8000/admin/events/panel';
    });
    document.getElementById('books').addEventListener('click', e => {
        e.preventDefault();
        window.location.href = 'http://127.0.0.1:8000/admin/books/panel';
    });
    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'http://127.0.0.1:8000/admin/login';
        
    });
    
}