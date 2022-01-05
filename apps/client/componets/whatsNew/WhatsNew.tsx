import React, { ChangeEvent, useState } from 'react';
import s from './whatsNew.module.css';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { IoIosArrowDropright } from '@react-icons/all-files/io/IoIosArrowDropright';
import TextareaAutosize from 'react-textarea-autosize';
import { BiImageAdd } from '@react-icons/all-files/bi/BiImageAdd';
import { AiOutlineGif } from '@react-icons/all-files/ai/AiOutlineGif';
import { HiOutlineEmojiHappy } from '@react-icons/all-files/hi/HiOutlineEmojiHappy';
import { BiColorFill } from '@react-icons/all-files/bi/BiColorFill';
import ColoredButton from '../coloredButton/ColoredButton';
import { DebounceInput } from 'react-debounce-input';
import { useAppSelector } from '../../hooks/redux';
import Avatar from '../avatar/Avatar';
import { useRandomColor } from '../../hooks/useRandomColor';
import { useMutation } from '@apollo/client';
import { CREATE_POST_MUTATION } from '../../apollo/mutations/createPost';

const WhatsNew: React.FC = React.memo(() => {
  const [text, setText] = useState('');
  const [color, setColor] = useState('#ffffff');
  const [showEmoji, setShowEmoji] = useState(false);
  const login = useAppSelector((state) => state.auth.user?.login);
  const avatar = useAppSelector((state) => state.auth.user?.avatar);
  const userId = useAppSelector((state) => state.auth.user?.id);
  const [createPostMutation] = useMutation(CREATE_POST_MUTATION);
  const [randomColor] = useRandomColor();
  const handleChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };
  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const handlePost = async () => {
    await createPostMutation({
      variables: { content: text, color },
    });

    setText('');
    setColor('#ffffff');
  };
  return (
    <div className={s.whatsNew} style={{ backgroundColor: color }}>
      <div>
        <div className={s.whatsNew__row}>
          <Avatar url={avatar} id={userId} className={s.whatsNew__img} />
          <div className={s.whatsNew__text}>
            <TextareaAutosize
              autoFocus
              className={s.whatsNew__textarea}
              placeholder={`What's new, ${login}`}
              value={text}
              onChange={(e) => handleChangeText(e)}
              maxRows={120}
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
          <ColoredButton
            height={'20px'}
            width={'20px'}
            onClick={() => setShowEmoji(!showEmoji)}
          >
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
        {showEmoji && (
          <Picker
            style={{ width: '100%', marginTop: '10px' }}
            color={randomColor}
            native
            emoji={'point_up_2'}
            onSelect={(emoji: any) => {
              setText(`${text}${emoji.native}`);
            }}
          />
        )}
      </div>
    </div>
  );
});
WhatsNew.displayName = 'WhatsNew';
export default WhatsNew;
