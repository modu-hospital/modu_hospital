// 1. 초진 or 재진 둘 중 하나만 선택할 수 있게 하기 => 클리어
// 2. 증상 기록에 placeholder 로 증상 예시 나오게 하기 => 클리어
// 3. 환자와의 관계를 본인으로 할시 대리신청인에 입력하지 못하도록 하기 => 클리어
// 4. 환자와의 관계를 기타로 설정할시 추가로 입력할 수 있는 공간이 생기도록 하기 => 클리어
// 5. 환자와의 관계에서 본인을 선택할시 유저 DB에서 전화번호를 자동적으로 넣어지도록 하기
// 6. 예약날짜 찾기 및 예약시간 고르기 api 찾아보기
// 7. 예약시간 찾기는 30분단위

document.addEventListener('DOMContentLoaded', () => {
    const category = document.querySelector('#relationCategory');
    const proxyname = document.querySelector('#proxyName');
    const divselfwrite = document.querySelector('#divSelfWrite');

    category.addEventListener('change', (event) => {
        const options = event.currentTarget.options;
        const index = event.currentTarget.options.selectedIndex;
        const value = options[index].value;

        if (value === '본인' || value === '미선택') {
            selfCheck();
            proxyname.setAttribute('disabled', 'disabled');
        } else if (value === '기타') {
            const textareaSpace = document.createElement('textarea');
            divselfwrite.appendChild(textareaSpace);
            proxyname.removeAttribute('disabled');
            textareaSpace.setAttribute('name', 'selfWrite');
            textareaSpace.setAttribute('id', 'selfWrite');
            textareaSpace.setAttribute('placeholder', '환자와의 관계(직접입력)');
            textareaSpace.setAttribute('rows', '1');

            category.addEventListener('change', () => {
                if (textareaSpace) {
                    divselfwrite.removeChild(textareaSpace);
                }
            });
        } else {
            proxyname.removeAttribute('disabled');
        }
    });
});
