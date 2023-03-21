document.getElementById('logout').addEventListener('click', (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/api/users/logout', {
        credentials: 'include',
    }).then((response) => {
        location.href = '/';
    });
});
