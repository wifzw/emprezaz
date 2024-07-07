'use client';

import { MdFullscreen } from 'react-icons/md';

import classes from './app-bar.module.css';
import { MouseEvent, useState } from 'react';
import IconButton from '@/components/atoms/buttons/IconButton/IconButton';

export default function AppBar() {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const handleEnterFullScreen = (event?: MouseEvent) => {
    event?.preventDefault();

    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    }
  };

  const handleExitFullScreen = (event?: MouseEvent) => {
    event?.preventDefault();

    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  return (
    <header className={classes.header}>
      <div className={classes.info}></div>

      <div className={classes.action}>
        <IconButton
          onClick={(event) =>
            isFullScreen
              ? handleExitFullScreen(event)
              : handleEnterFullScreen(event)
          }
        >
          <MdFullscreen size={24} />
        </IconButton>

        <div className={classes.avatar}></div>
      </div>
    </header>
  );
}
