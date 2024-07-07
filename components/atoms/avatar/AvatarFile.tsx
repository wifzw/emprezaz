import Image from 'next/image';
import { MdAccountCircle } from 'react-icons/md';

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
      <div className={classes.avatar} role="button" onClick={handleClick}>
        {previewImage ? (
          <Image
            width={120}
            height={120}
            alt="avatar"
            src={previewImage}
            quality={100}
            priority
          />
        ) : (
          <MdAccountCircle size={140} />
        )}
      </div>

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
