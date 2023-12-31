
function updateCountdown() {
    // 현재 한국 시간을 얻어오기
    const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" }));

    //<br>test:<br>${now} <br>${t_year} ${n_month}, ${n_day}, <br>${targetDate}
    const n_year = now.getFullYear();
    const n_month = now.getMonth();
    const n_day = now.getDate();
    const targetDate = new Date(n_year, 11, 25);
    
    if (n_month>=11 && n_day>=25) {
        targetDate.setFullYear(targetDate.getFullYear() + 1)
    }

    // 남은 시간 계산
    const timeRemaining = targetDate - now;

    // 시간, 분, 초 계산
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // 결과를 HTML에 업데이트
    const countdownElement = document.getElementById('countdown');
		countdownElement.style.color = '#FF9EA9'
    countdownElement.innerHTML = `
      <span>D-${days} ${hours}시간${minutes}분${seconds}초</span>`;
}
// 페이지 로드 시에도 업데이트 수행
updateCountdown();

// 1초마다 업데이트
setInterval(updateCountdown, 1000);

// 날짜 기준 카드 오픈 기능
const doors = document.querySelectorAll('.door');
doors.forEach((door, index) => {
    door.addEventListener('click', () => {
        // 현재 한국 시간 얻어오기
        const now = new Date(new Date().toLocaleDateString("en-US", {timeZone: "Asia/Seoul"}));

        const n_year = now.getFullYear();
        const n_month = now.getMonth();
        const n_day = now.getDate();

        // 각 날짜에 해당하는 날짜 계산
        const openDate = new Date(n_year, 11, index + 1);

        if (n_month>=11 && n_day>=25) {
            openDate.setFullYear(openDate.getFullYear() + 1)
        }

        // 현재 날짜가 열 수 있는 날짜 이후인지 확인
        if (now.getTime() >= openDate.getTime()) {
            // 여기에 모달을 열거나 특정 동작을 수행하는 코드 추가

            // 상위 div의 class 번호를 찾아서 image url에 사용합니다.
            const imageUrl = `image/card/card-${index+1}.png`;

            // 'back' 클래스를 가진 요소를 찾아 스타일을 가져옵니다
            const doorDiv = document.querySelector(`.day-${index+1}`)
            const backDiv = doorDiv.querySelector(`.back`);

            const style = window.getComputedStyle(backDiv);
            const pTage = backDiv.querySelector(`p`);
            const text = modalMessageList[index]['message']

            // showModal 함수를 호출하여 모달을 표시합니다
            showModal(imageUrl, text);
        } else {
            // 현재 날짜가 열 수 있는 날짜보다 이전인 경우 몇 일 후에 열 수 있다는 메시지 표시
            const daysRemaining = Math.ceil((openDate- now) / (1000 * 60 * 60 * 24));
            console.log(openDate, now, daysRemaining)
            alert(`이 카드는 ${daysRemaining}일 후에 열 수 있어요!`);

            const doorDiv = document.querySelector(`.day-${index + 1}`)
            const checkCard = doorDiv.querySelector('input')

            checkCard.checked = true;
        }
    })
})
