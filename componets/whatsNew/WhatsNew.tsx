import React from 'react';
import s from './whatsNew.module.css';
import { IoIosArrowDropright } from '@react-icons/all-files/io/IoIosArrowDropright';

interface IProps {}
const WhatsNew: React.FC<IProps> = () => {
  return (
    <div className={s.whatsNew}>
      <div className={s.whatsNew__row}>
        <img
          src={
            'https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHBob3RvfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'
          }
          className={s.whatsNew__img}
        />
        <textarea
          className={s.whatsNew__textarea}
          placeholder={"What's new, Emma"}
        />
        <button>
          <IoIosArrowDropright />
        </button>
      </div>
    </div>
  );
};

export default WhatsNew;
