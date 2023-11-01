import { useState } from 'react';
import { createPortal } from 'react-dom';
import { AddForm, Modal } from 'components';
import EditIcon from './assets/EditIcon';
import styles from './EditItem.module.css';

const portalEl = document.getElementById('modal');

export default function EditItem({ handleEdit, title, body, deadline }) {
  const [open, setOpen] = useState(false);

  const handleCloseOpen = (value) => {
    setOpen(value);
  };

  return (
    <>
      <EditIcon
        className={styles.icon}
        handleClick={(e) => {
          e.stopPropagation();
          handleCloseOpen(true);
        }}
      />
      {open &&
        createPortal(
          <Modal handleClose={handleCloseOpen}>
            <h3>Редактировать задачу</h3>
            <AddForm handleForm={handleEdit} handleClose={handleCloseOpen} initialValues={{ title, body, deadline }} />
          </Modal>,
          portalEl,
        )}
    </>
  );
}
