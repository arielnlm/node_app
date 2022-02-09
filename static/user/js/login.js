function init() {

    document.getElementById('reg').addEventListener('click', e => {
        e.preventDefault();
        window.location.href = 'http://127.0.0.1:8000/admin/register';
    });

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: document.getElementById('name').value,
            password: document.getElementById('password').value
        };
        // na auth service saljemo name i password
        fetch('http://127.0.0.1:7000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                // ako dobijem poruku znaci da login nije uspeo jer nisam dobio token
                if (el.msg) {
                    alert(el.msg);
                } else { // login je uspeo
                    // dodam token u cookie
                    document.cookie = `token=${el.token};SameSite=Lax`;
                    // odem na stranicu index.html
                    window.location.href = 'http://127.0.0.1:8000/admin/index'
                }
            });
    });
}