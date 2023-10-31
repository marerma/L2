import { AddForm, Modal } from 'components';
import { useState } from 'react';
import { createPortal } from 'react-dom';

import styles from './AddItem.module.css';

const portalEl = document.getElementById('modal');

export default function AddItem({ handleAdd }) {
  const [open, setOpen] = useState(false);

  const handleCloseOpen = (value) => {
    setOpen(value);
  }
 

  return (
    <>
    <div className={styles.btn_container}>
     <button type='button' className='button_main' onClick={(e) => {
          e.stopPropagation(); 
          handleCloseOpen(true);
          }}>Добавить задачу</button>
     </div>
    {open && createPortal(
      <Modal handleClose={handleCloseOpen}>
        <h3>Добавить новую задачу</h3>
        <AddForm handleForm={handleAdd} handleClose={handleCloseOpen}/>
      </Modal>, portalEl)
    }
  </>)}
