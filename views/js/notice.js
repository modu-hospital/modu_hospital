function notice() {
    // 현재 시간 저장
    const currentTime = new Date().getTime();

    // 이전 시간이 저장되어 있지 않은 경우 또는 일정 시간이 지난 경우에만 함수 실행
    const previousTime = localStorage.getItem('previousTime');
    if (!previousTime || currentTime - previousTime >= 100000) {
        // 10초 (5000ms) 경과 후 실행
        // 함수 실행

        localStorage.removeItem('previousTime');
        // 현재 시간 저장
        localStorage.setItem('previousTime', currentTime);
    } else {
        return;
    }
}
