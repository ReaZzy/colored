import React, { ChangeEvent, useState } from 'react';
import s from './whatsNew.module.css';
import { IoIosArrowDropright } from '@react-icons/all-files/io/IoIosArrowDropright';
import TextareaAutosize from 'react-textarea-autosize';
import { BiImageAdd } from '@react-icons/all-files/bi/BiImageAdd';
import { AiOutlineGif } from '@react-icons/all-files/ai/AiOutlineGif';
import { HiOutlineEmojiHappy } from '@react-icons/all-files/hi/HiOutlineEmojiHappy';
import { BiColorFill } from '@react-icons/all-files/bi/BiColorFill';
import ColoredButton from '../coloredButton/ColoredButton';
import { DebounceInput } from 'react-debounce-input';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setPost } from '../../store/reducers/post/actions';

interface IProps {}
const WhatsNew: React.FC<IProps> = () => {
  const [text, setText] = useState('');
  const [color, setColor] = useState('#ffffff');
  const dispatch = useDispatch();
  const handleChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };
  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const handlePost = async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4NGIzMDRiLTgwODAtNGYwYi1iYWQ1LWUwNzBhNmIwOWM0NiIsImxvZ2luIjoiUmVhWnp5RkFLRTEiLCJpYXQiOjE2MjkzMTQ4MTgsImV4cCI6MTYyOTQwMTIxOH0.xF_hiTuJdy9qI5OHO8FfFwt9Dz0C0_3k5ELKkPvTapU';
    const res = await axios.post(
      'http://localhost:4000/posts',
      { content: text, color },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    await dispatch(setPost(res.data));
    setText('');
  };
  return (
    <div className={s.whatsNew} style={{ backgroundColor: color }}>
      <div>
        <div className={s.whatsNew__row}>
          <img
            src={
              'https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHBob3RvfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'
            }
            className={s.whatsNew__img}
            alt={''}
          />
          <div className={s.whatsNew__text}>
            <TextareaAutosize
              autoFocus
              className={s.whatsNew__textarea}
              placeholder={"What's new, Emma"}
              value={text}
              onChange={(e) => handleChangeText(e)}
            />
            <ColoredButton
              className={s.whatsNew__button}
              height={'40px'}
              width={'40px'}
              onClick={() => handlePost()}
            >
              <IoIosArrowDropright />
            </ColoredButton>
          </div>
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
            <>
              <BiColorFill />
              <DebounceInput
                type={'color'}
                debounceTimeout={50}
                value={color}
                onChange={(e) => handleChangeColor(e)}
              />
            </>
          </ColoredButton>
        </div>
      </div>
    </div>
  );
};

export default WhatsNew;
