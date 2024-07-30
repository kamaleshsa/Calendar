import { useState } from 'react';
import styles from './Events.module.scss';

const Events = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('Personal');

  const handleSave = () => {
    onSave({ title, date, category });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <div className={styles.modal_header}>
          <h2>Add Event</h2>
          <button className={styles.close_button} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.modal_body}>
          <label>
            Title:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label>
            Date:
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          <label>
            Category:
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Personal">Personal</option>
              <option value="Business">Business</option>
              <option value="Family">Family</option>
              <option value="Holiday">Holiday</option>
              <option value="ETC">ETC</option>
            </select>
          </label>
        </div>
        <div className={styles.modal_footer}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default Events;
