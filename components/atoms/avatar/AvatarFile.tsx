import { MdAccountCircle } from 'react-icons/md';

import Avatar from '@mui/material/Avatar';

import classes from './avatar-file.module.css';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

export interface IAvatarFileProps {
  avatar: string | null;
  onChangeFile: (file: File) => void;
}

export default function AvatarFile(props: IAvatarFileProps) {
  const { avatar, onChangeFile } = props;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (avatar) {
      setPreviewImage(avatar);
    }
  }, [avatar, previewImage]);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpdateAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    if (!fileInputRef.current || !fileInputRef.current.files) return;

    event.preventDefault();

    const file = fileInputRef?.current?.files[0];

    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        setPreviewImage(reader.result as string);
        onChangeFile(file);
      };
    }
  };

  return (
    <>
      <Avatar
        src={previewImage ?? undefined}
        alt="avatar"
        sizes="140px"
        className={classes.avatar}
        onClick={handleClick}
      >
        {!previewImage && <MdAccountCircle size={140} />}
      </Avatar>

      <input
        type="file"
        ref={fileInputRef}
        name="avatar"
        className={classes.file}
        onChange={handleUpdateAvatar}
      />
    </>
  );
}
