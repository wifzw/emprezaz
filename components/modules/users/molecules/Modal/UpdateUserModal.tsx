'use client';

import IconButton from '@/components/atoms/buttons/IconButton/IconButton';
import { MdOutlineClose } from 'react-icons/md';
import { MouseEvent, useState } from 'react';
import MediumButton from '@/components/atoms/buttons/Medium/MediumButton';
import Switch from '@/components/atoms/inputs/Switch/Switch';

import classes from './general-user-modal.module.css';
import TextField from '@/components/atoms/inputs/TextField/TextField';
import { updateUser } from '@/server/users/actions';
import { useForm } from 'react-hook-form';
import { IUpdateUserPayload, IUserResponse } from '@/server/users/types';
import AvatarFile from '@/components/atoms/avatar/AvatarFile';

export interface IUpdateUserModalProps {
  user: IUserResponse;
  onClose?: (event?: MouseEvent<HTMLButtonElement>) => void;
}

export default function UpdateUserModal(props: IUpdateUserModalProps) {
  const { user, onClose } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IUpdateUserPayload>({
    defaultValues: user,
  });

  const [file, setFile] = useState<null | File>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnClose = (event?: MouseEvent<HTMLButtonElement>) => {
    if (!onClose) return;

    event?.preventDefault();

    onClose(event);
  };

  const onSubmit = async (data: IUpdateUserPayload) => {
    setIsLoading(true);

    const avatarFile = new FormData();

    if (file) {
      avatarFile.append('avatar', file);
    }

    try {
      await updateUser(data, avatarFile);

      setIsLoading(false);

      handleOnClose();
    } catch (err) {
      setIsLoading(false);
      console.error('Error creating user');
    }
  };

  const isFormInvalid = !!Object.keys(errors).length;

  return (
    <div className={classes.backdrop}>
      <form
        className={classes['wrapper-modal']}
        onSubmit={handleSubmit(onSubmit)}
      >
        <header className={classes.header}>
          <h3>Editar Usuário</h3>
          <IconButton onClick={handleOnClose}>
            <MdOutlineClose size={24} />
          </IconButton>
        </header>

        <div className={classes.content}>
          <div className={classes['wrapper-avatar']}>
            <AvatarFile
              avatar={watch('avatar') as string | null}
              onChangeFile={(file) => setFile(file)}
            />
          </div>

          <div className={classes.input}>
            <TextField
              type="text"
              id="name"
              placeholder="Nome"
              register={{
                ...register('name', { required: true, minLength: 3 }),
              }}
            />
            {errors.name && (
              <span className={classes.errors}>
                {errors.name.type === 'minLength'
                  ? 'O nome precisa ter no mínimo 3 caracteres.'
                  : 'O nome é obrigatório.'}
              </span>
            )}
          </div>

          <div className={classes.input}>
            <TextField
              id="email"
              type="email"
              placeholder="Email"
              register={{
                ...register('email', { required: true }),
              }}
            />
            {errors.email && (
              <span className={classes.errors}>O email é obrigatório.</span>
            )}
          </div>

          <div className={classes.input}>
            <TextField
              id="cpf"
              type="text"
              placeholder="CPF"
              register={{
                ...register('cpf', { required: true }),
              }}
            />
            {errors.cpf && (
              <span className={classes.errors}>O CPF é obrigatório.</span>
            )}
          </div>

          <div className={classes.input}>
            <TextField
              id="phone"
              type="tel"
              placeholder="Celular"
              register={{
                ...register('phone', { required: true }),
              }}
            />
            {errors.phone && (
              <span className={classes.errors}>O Celular é obrigatório.</span>
            )}
          </div>

          <div className={classes.input}>
            <TextField
              id="birthDate"
              type="date"
              placeholder="Data de Nascimento"
              register={{
                ...register('birth_date', { required: true }),
              }}
            />
            {errors.birth_date && (
              <span className={classes.errors}>
                A Data de Nascimento é obrigatória.
              </span>
            )}
          </div>

          <div className={`${classes.input} ${classes.status}`}>
            <Switch
              value={watch('status') as boolean}
              register={{ ...register('status', { required: true }) }}
            />
          </div>
        </div>

        <footer className={classes.actions}>
          <MediumButton text onClick={handleOnClose}>
            Cancelar
          </MediumButton>
          <MediumButton type="submit" disabled={isLoading || isFormInvalid}>
            {isLoading ? 'Carregando...' : 'Salvar'}
          </MediumButton>
        </footer>
      </form>
    </div>
  );
}
