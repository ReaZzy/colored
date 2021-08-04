import React from 'react';
import s from './whatsNew.module.css';
import { IoIosArrowDropright } from '@react-icons/all-files/io/IoIosArrowDropright';
import TextareaAutosize from 'react-textarea-autosize';
import { BiImageAdd } from '@react-icons/all-files/bi/BiImageAdd';
import { AiOutlineGif } from '@react-icons/all-files/ai/AiOutlineGif';
import { HiOutlineEmojiHappy } from '@react-icons/all-files/hi/HiOutlineEmojiHappy';
import { BiColorFill } from '@react-icons/all-files/bi/BiColorFill';
import ColoredButton from '../coloredButton/ColoredButton';

interface IProps {}
const WhatsNew: React.FC<IProps> = () => {
  return (
    <div className={s.whatsNew}>
      <div>
        <div className={s.whatsNew__row}>
          <img
            src={
              'https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHBob3RvfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'
            }
            className={s.whatsNew__img}
          />
          <TextareaAutosize
            autoFocus
            className={s.whatsNew__textarea}
            placeholder={"What's new, Emma"}
          />
          <ColoredButton
            className={s.whatsNew__button}
            height={'40px'}
            width={'40px'}
          >
            <IoIosArrowDropright />
          </ColoredButton>
        </div>
        <div className={`${s.whatsNew_addContent} shadow`}>
          <ColoredButton height={'20px'} width={'20px'}>
            <AiOutlineGif />
          </ColoredButton>
          <ColoredButton height={'20px'} width={'20px'}>
            <BiImageAdd />
          </ColoredButton>
          <ColoredButton height={'20px'} width={'20px'}>
            <HiOutlineEmojiHappy />
          </ColoredButton>
          <ColoredButton height={'20px'} width={'20px'}>
            <BiColorFill />
          </ColoredButton>
        </div>
      </div>
    </div>
  );
};

export default WhatsNew;
