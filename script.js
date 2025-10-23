document.addEventListener('DOMContentLoaded', () => {

    // --- カレンダー機能 ---
    const monthYearElement = document.getElementById('month-year');
    const calendarDaysElement = document.getElementById('calendar-days');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');

    let currentDate = new Date();

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        monthYearElement.textContent = `${year}年 ${month + 1}月`;

        calendarDaysElement.innerHTML = '';

        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const lastDayOfPrevMonth = new Date(year, month, 0);

        const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 (日) - 6 (土)
        const lastDateOfMonth = lastDayOfMonth.getDate();
        const prevMonthLastDate = lastDayOfPrevMonth.getDate();
        
        const today = new Date();

        // 前月の日付を表示
        for (let i = firstDayOfWeek; i > 0; i--) {
            const dayElement = document.createElement('div');
            dayElement.textContent = prevMonthLastDate - i + 1;
            dayElement.classList.add('other-month');
            calendarDaysElement.appendChild(dayElement);
        }

        // 今月の日付を表示
        for (let i = 1; i <= lastDateOfMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = i;
            
            // ▼▼▼ ここから追加 ▼▼▼
            const dayOfWeek = new Date(year, month, i).getDay();
            if (dayOfWeek === 0) { // 日曜日
                dayElement.classList.add('sunday');
            } else if (dayOfWeek === 6) { // 土曜日
                dayElement.classList.add('saturday');
            }
            // ▲▲▲ ここまで追加 ▲▲▲

            if (
                i === today.getDate() &&
                year === today.getFullYear() &&
                month === today.getMonth()
            ) {
                dayElement.classList.add('today');
            }
            calendarDaysElement.appendChild(dayElement);
        }
        
        // 来月の日付をグリッドの残りに表示
        const remainingDays = 42 - calendarDaysElement.children.length; // 6行 * 7列 = 42
        for (let i = 1; i <= remainingDays; i++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = i;
            dayElement.classList.add('other-month');
            calendarDaysElement.appendChild(dayElement);
        }

    }

    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();


    // --- アナログ時計機能 ---
    const hourHand = document.getElementById('hour-hand');
    const minuteHand = document.getElementById('minute-hand');
    const secondHand = document.getElementById('second-hand');

    function updateClock() {
        const now = new Date();
        const seconds = now.getSeconds();
        const minutes = now.getMinutes();
        const hours = now.getHours();

        const secondsDegrees = (seconds / 60) * 360;
        const minutesDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
        const hoursDegrees = (hours / 12) * 360 + (minutes / 60) * 30;

        secondHand.style.transform = `translateX(-50%) rotate(${secondsDegrees}deg)`;
        minuteHand.style.transform = `translateX(-50%) rotate(${minutesDegrees}deg)`;
        hourHand.style.transform = `translateX(-50%) rotate(${hoursDegrees}deg)`;
    }
    
    setInterval(updateClock, 1000);
    updateClock();
});