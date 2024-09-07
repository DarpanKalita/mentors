document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.getElementById('calendar');
    const timeSlots = document.getElementById('time-slots');
    const scheduleForm = document.getElementById('schedule-form');
    const eventTitleInput = document.getElementById('event-title');
    const eventDateInput = document.getElementById('event-date');
    const eventTimeInput = document.getElementById('event-time');
    const eventsList = document.getElementById('events-list');

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

    let bookings = {}; // Stores bookings with format { 'YYYY-MM-DD': [ 'HH:00', 'HH:00' ] }

    function generateCalendar() {
        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();

        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();

        calendar.innerHTML = '';

        // Add day headers
        daysOfWeek.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'font-bold text-center';
            dayHeader.textContent = day;
            calendar.appendChild(dayHeader);
        });

        // Add empty cells for days before the first day
        for (let i = 0; i < firstDay; i++) {
            calendar.appendChild(document.createElement('div'));
        }

        // Add day cells
        for (let day = 1; day <= lastDay; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'p-4 border border-gray-200 text-center calendar-day';
            dayCell.textContent = day;
            dayCell.dataset.date = `${year}-${month + 1}-${day}`;
            calendar.appendChild(dayCell);
        }
    }

    function generateTimeSlots() {
        timeSlots.innerHTML = '';

        hours.forEach(hour => {
            const slot = document.createElement('div');
            slot.className = 'p-2 border border-gray-300 text-center time-slot';
            slot.textContent = hour;
            timeSlots.appendChild(slot);
        });
    }

    function handleScheduleFormSubmit(event) {
        event.preventDefault();

        const title = eventTitleInput.value;
        const date = eventDateInput.value;
        const time = eventTimeInput.value;

        if (title && date && time) {
            if (!bookings[date]) bookings[date] = [];
            if (!bookings[date].includes(time)) {
                bookings[date].push(time);
                const listItem = document.createElement('li');
                listItem.textContent = `${date} ${time}: ${title}`;
                eventsList.appendChild(listItem);
                updateTimeSlots(date);
            }

            // Clear the form
            eventTitleInput.value = '';
            eventDateInput.value = '';
            eventTimeInput.value = '';
        }
    }

    function updateTimeSlots(date) {
        const slots = timeSlots.querySelectorAll('.time-slot');
        slots.forEach(slot => {
            const slotTime = slot.textContent;
            if (bookings[date] && bookings[date].includes(slotTime)) {
                slot.classList.add('blocked');
            } else {
                slot.classList.remove('blocked');
            }
        });
    }

    scheduleForm.addEventListener('submit', handleScheduleFormSubmit);

    generateCalendar();
    generateTimeSlots();
});
