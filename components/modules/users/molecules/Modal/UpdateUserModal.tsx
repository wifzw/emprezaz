'use client';

import IconButton from '@/components/atoms/buttons/IconButton/IconButton';
import { MdAccountCircle, MdOutlineClose } from 'react-icons/md';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import MediumButton from '@/components/atoms/buttons/Medium/MediumButton';
import Switch from '@/components/atoms/inputs/Switch/Switch';

import classes from './general-user-modal.module.css';
import TextField from '@/components/atoms/inputs/TextField/TextField';
import { updateUser } from '@/server/users/actions';
import { useForm } from 'react-hook-form';
import { IUpdateUserPayload, IUserResponse } from '@/server/users/types';
import AvatarFile from '@/components/atoms/avatar/AvatarFile';
import { Avatar } from '@mui/material';

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
  const [status, setStatus] = useState<boolean>(true);
  const [customErrors, setErrors] = useState<
    Array<{
      name: string;
      message: string;
    }>
  >([]);

  useEffect(() => {
    setStatus(user.status);
  }, [user.status]);

  const handleOnClose = (event?: MouseEvent<HTMLButtonElement>) => {
    if (!onClose) return;

    event?.preventDefault();

    onClose(event);
  };

  const handleUpdateStatus = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setStatus(newValue);
  };

  const getErrorsEmail = () => {
    if (errors.email) {
      return <span className={classes.errors}>O email é obrigatório.</span>;
    }

    const error = customErrors.find(
      (currentError) => currentError.name === 'email'
    );

    if (error) {
      return <span className={classes.errors}>{error.message}</span>;
    }
  };

  const getErrorsCPF = () => {
    if (errors.cpf) {
      return <span className={classes.errors}>O CPF é obrigatório.</span>;
    }

    const error = customErrors.find(
      (currentError) => currentError.name === 'cpf'
    );

    if (error) {
      return <span className={classes.errors}>{error.message}</span>;
    }
  };

  const getErrorsPhone = () => {
    if (errors.phone) {
      return <span className={classes.errors}>O celular é obrigatório.</span>;
    }

    const error = customErrors.find(
      (currentError) => currentError.name === 'phone'
    );

    if (error) {
      return <span className={classes.errors}>{error.message}</span>;
    }
  };

  const getErrorsBirthDate = () => {
    if (errors.birth_date) {
      return <span className={classes.errors}>O celular é obrigatório.</span>;
    }

    const error = customErrors.find(
      (currentError) => currentError.name === 'birth_date'
    );

    if (error) {
      return <span className={classes.errors}>{error.message}</span>;
    }
  };

  const onSubmit = async (data: IUpdateUserPayload) => {
    setIsLoading(true);

    if (data.email) {
      const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
      if (!emailRegex.test(data.email)) {
        setErrors([
          {
            name: 'email',
            message: 'O email é inválido',
          },
        ]);

        setIsLoading(false);
        return;
      }
    }

    if (data.cpf) {
      const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

      if (!cpfRegex.test(data.cpf)) {
        setErrors([
          {
            name: 'cpf',
            message: 'O CPF é inválido. ex: (000.000.000-00)',
          },
        ]);

        setIsLoading(false);
        return;
      }
    }

    if (data.phone) {
      const phoneRegex =
        /^(?:(?:\+|00)?(55)\s?)?(?:(?:\(?[1-9][0-9]\)?)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/;

      if (!phoneRegex.test(data.phone)) {
        setErrors([
          {
            name: 'phone',
            message: 'O celular é inválido. ex: ((##) ####-####)',
          },
        ]);

        setIsLoading(false);
        return;
      }
    }

    if (data.birth_date) {
      const birthDateRegex = /^\d{4}-\d{2}-\d{2}$/;

      if (!birthDateRegex.test(data.birth_date)) {
        setErrors([
          {
            name: 'birth_date',
            message: 'A data de nascimento é inválida',
          },
        ]);

        setIsLoading(false);
        return;
      }

      const birthDate = new Date(data.birth_date);
      const currentDate = new Date();

      if (birthDate > currentDate) {
        setErrors([
          {
            name: 'birth_date',
            message:
              'A data de nascimento não pode ser maior que a data de hoje',
          },
        ]);

        setIsLoading(false);
        return;
      }
    }

    setErrors([]);

    const avatarFile = new FormData();

    if (file) {
      avatarFile.append('avatar', file);
    }

    data.status = status;

    try {
      const response = await updateUser(data, avatarFile);

      if (typeof response === 'object' && Object.keys(response).length === 1) {
        setErrors([
          {
            name: 'email',
            message: 'O email já está sendo usado, por favor utilize outro',
          },
        ]);

        setIsLoading(false);
        return;
      }

      setIsLoading(false);

      handleOnClose();
    } catch (err) {
      console.log(err);

      setIsLoading(false);
      console.error('Error update user');
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
            {process.env.NODE_ENV === 'production' && (
              <div className={classes['wrapper-avatar-prod']}>
                <Avatar alt="avatar" sizes="140px" className={classes.avatar}>
                  <MdAccountCircle size={140} />
                </Avatar>

                <p>Obs: A imagem só pode ser alterada em desenvolvimento</p>
              </div>
            )}

            {process.env.NODE_ENV === 'development' && (
              <AvatarFile
                avatar={watch('avatar') as string | null}
                onChangeFile={(file) => setFile(file)}
              />
            )}
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
            {getErrorsEmail()}
          </div>

          <div className={classes.input}>
            <TextField
              id="cpf"
              type="text"
              placeholder="CPF"
              maxLength="14"
              isCpfMask
              register={{
                ...register('cpf', { required: true }),
              }}
            />
            {getErrorsCPF()}
          </div>

          <div className={classes.input}>
            <TextField
              id="phone"
              type="tel"
              placeholder="Celular"
              maxLength="15"
              register={{
                ...register('phone', { required: true }),
              }}
            />
            {getErrorsPhone()}
          </div>

          <div className={classes.input}>
            <TextField
              id="birthDate"
              type="date"
              placeholder="Data de Nascimento"
              maxLength="10"
              register={{
                ...register('birth_date', { required: true }),
              }}
            />
            {getErrorsBirthDate()}
          </div>

          <div className={`${classes.input} ${classes.status}`}>
            <Switch value={status} onChange={handleUpdateStatus} />
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
