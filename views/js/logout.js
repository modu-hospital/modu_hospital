document.getElementById('logout').addEventListener('click', (event) => {
    event.preventDefault();
    fetch('/api/users/logout', {
        method: 'post',
        credentials: 'include',
    }).then((response) => {
        alert('로그아웃 되었습니다');
        location.href = '/';
    });
});
