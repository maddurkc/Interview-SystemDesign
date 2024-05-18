import React, { useState } from 'react';

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';
    return (
      <div className='header'>
        <div className='icon' onClick={prevMonth}>
          &laquo;
        </div>
        <div>
          <span>
            {new Date(currentYear, currentMonth).toLocaleDateString('en-us', {
              year: 'numeric',
              month: 'long',
            })}
          </span>
        </div>
        <div className='icon' onClick={nextMonth}>
          &raquo;
        </div>
      </div>
    );
  };

  const renderDaysOfWeek = () => {
    return (
      <div className='days row'>
        {daysOfWeek.map((day) => (
          <div className='col col-center' key={day}>
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = new Date(currentYear, currentMonth);
    const monthEnd = new Date(currentYear, currentMonth + 1, 0);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = 'd';
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = day.getDate();
        const cloneDay = new Date(day);
        days.push(
          <div
            className={`col cell ${
              day.getMonth() !== currentMonth
                ? 'disabled'
                : selectedDate && isSameDay(day, selectedDate)
                ? 'selected'
                : ''
            }`}
            key={day}
            onClick={() => onDateClick(cloneDay)}
          >
            <span className='number'>{formattedDate}</span>
          </div>
        );
        day.setDate(day.getDate() + 1);
      }
      rows.push(
        <div className='row' key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className='body'>{rows}</div>;
  };

  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  const nextMonth = () => {
    setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1);
    setCurrentYear(currentMonth === 11 ? currentYear + 1 : currentYear);
  };

  const prevMonth = () => {
    setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1);
    setCurrentYear(currentMonth === 0 ? currentYear - 1 : currentYear);
  };

  const startOfWeek = (date) => {
    const diff = date.getDate() - date.getDay();
    return new Date(date.setDate(diff));
  };

  const endOfWeek = (date) => {
    const diff = date.getDate() - date.getDay() + 6;
    return new Date(date.setDate(diff));
  };

  const isSameDay = (a, b) => {
    return (
      a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear()
    );
  };

  return (
    <div className='calendar'>
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderCells()}
      <div className='footer'>
        {selectedDate
          ? `Selected Date: ${selectedDate.toDateString()}`
          : 'Select a date'}
      </div>
    </div>
  );
}

export default Calendar;
