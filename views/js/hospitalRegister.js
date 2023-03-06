const form = document.getElementById('hospitalForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('addressInput').value;
    const phone = document.getElementById('phone').value;

    // const { location } = await findHospitalLocation(address);

    // const { latitude, longitude } = location;

    const data = {
        // userId: 123, // 사용자 ID
        name,
        address,
        phone,
        // latitude,
        // longitude
    };

    const response = await fetch('/api/hospitals/location', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const result = await response.json();
        alert('병원 등록이 완료되었습니다');
        window.location.href = 'http://localhost:3000/hospital';
    } else {
        console.error('HTTP error:', response.status);
    }
});
