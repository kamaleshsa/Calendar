import { useState } from 'react';
import styles from './CalendarHeader.module.scss';

const CalendarHeader = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const renderCalendar = () => {
    const days = [];
    const daysInCurrentMonth = daysInMonth(currentMonth, currentYear);
    const firstDay = firstDayOfMonth(currentMonth, currentYear);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div className={styles.calendar_day + ' ' + styles.empty} key={`empty-${i}`}></div>);
    }

    for (let day = 1; day <= daysInCurrentMonth; day++) {
      days.push(<div className={styles.calendar_day} key={day}>{day}</div>);
    }

    return days;
  };

  return (
    <div className={styles.calendar_container}>
      <div className={styles.calendar_header}>
        <button onClick={handlePrevMonth}>&lt;</button>
        <span>{new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className={styles.calendar_grid}>
        <div className={styles.calendar_day_name}>Su</div>
        <div className={styles.calendar_day_name}>Mo</div>
        <div className={styles.calendar_day_name}>Tu</div>
        <div className={styles.calendar_day_name}>We</div>
        <div className={styles.calendar_day_name}>Th</div>
        <div className={styles.calendar_day_name}>Fr</div>
        <div className={styles.calendar_day_name}>Sa</div>
        {renderCalendar()}
      </div>
    </div>
  );
};

export default CalendarHeader;
