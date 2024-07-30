import { useState } from 'react';
import AddEvent from './AddEvent';
import Calendar from './Calendar';
import Events from './Events';
import styles from './Sidebar.module.scss'; 

const Sidebar = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleAddEventClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleEventSave = (event) => {
    console.log('Event saved:', event);
  };

  return (
    <div className={styles.sidebar}>
      <AddEvent onClick={handleAddEventClick} />
      <Calendar />
      <Events isOpen={isModalOpen} onClose={handleModalClose} onSave={handleEventSave} />
    </div>
  );
};

export default Sidebar;
