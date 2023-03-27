function logout() {
    fetch('/api/users/logout', {
        method: 'post',
        credentials: 'include',
    }).then((response) => {
        swal({
            title: '😊 로그아웃 성공!',
            text: '로그아웃 되었습니다',
            icon: 'success',
        }).then(() => {
            location.href = '/';
        });
    });
}
