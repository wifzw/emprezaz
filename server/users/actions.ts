"use server";

import * as fsExtra from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from "next/cache";
import db from "../db";
import { ICreateUserPayload, IUpdateUserPayload, IUserResponse } from "./types";

async function saveImage(
  image: File, isUpdateImage: { filename: string } | null = null
): Promise<void | string> {
  const uuidGenerate = uuidv4();
  const extension = image.name.split('.').pop();
  let filename = isUpdateImage ? isUpdateImage.filename : `${uuidGenerate}.${extension}`;
  const directoryPath = 'public/uploads';

  await fsExtra.ensureDir(directoryPath);

  let filePath = `${directoryPath}/${filename}`;
  const exists = await fsExtra.pathExists(filePath);
  if (exists) {
    await fsExtra.remove(filePath);

    filename = `${uuidGenerate}.${extension}`
    filePath = `${directoryPath}/${filename}`;
  }

  const stream = fsExtra.createWriteStream(filePath);
  const bufferedImage = await image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error: unknown) => {
    if (error) {
      throw new Error('Falha ao salvar a imagem!');
    }
    stream.end();
  });

  return filename;
}


export async function createUser(
  data: ICreateUserPayload,
  formDataFile: FormData
): Promise<IUserResponse | boolean | { error: string }> {
  const file = formDataFile.get('avatar') as File;

  const phone = data.phone.replace(/\D/g, '')

  const payload: ICreateUserPayload = {
    name: data.name,
    cpf: data.cpf,
    phone: phone,
    birth_date: data.birth_date,
    avatar: null,
    email: data.email,
    status: data.status,
  }

  if (data.email) {
    try {
      const isEmailExist = await db.user.findFirst({ where: { email: data.email } })

      if (isEmailExist) {
        return { error: 'Email already exists' };
      }

    } catch (err) {
      throw new Error('Could not find');
    }
  }

  if (file) {
    try {
      const filename = await saveImage(file)
      payload.avatar = `${process.env.NEXT_PUBLIC_URL}/uploads/${filename}`
    } catch (e) {
      return false;
    }
  }

  try {
    const response = await db.user.create({ data: payload });

    await db.$disconnect();

    revalidatePath("/", "layout");

    return response;
  } catch (e) {
    throw new Error('Error creating user')
  }
}

export async function updateUser(
  data: IUpdateUserPayload,
  formDataFile: FormData
): Promise<IUserResponse | boolean | { error: string }> {
  const file = formDataFile.get('avatar') as File;

  const payload: IUpdateUserPayload = data

  if (payload.phone) {
    const phone = payload.phone.replace(/\D/g, '')
    payload.phone = phone;
  }

  if (data.email) {
    try {
      const isEmailExist = await db.user.findFirst({ where: { email: data.email } })

      if (isEmailExist && isEmailExist.id !== data.id) {
        return { error: 'Email already exists' };
      }

    } catch (err) {
      throw new Error('Could not find');
    }
  }

  if (file) {
    try {
      let filename = null

      if (data.avatar) {
        filename = data.avatar.split('/').pop();
      }

      filename = await saveImage(file, filename ? { filename } : undefined);
      payload.avatar = `${process.env.NEXT_PUBLIC_URL}/uploads/${filename}`
    } catch (e) {
      return false;
    }
  }

  try {
    const response = await db.user.update({
      where: {
        id: data.id,
      },
      data: {
        ...payload,
      }
    });

    await db.$disconnect();

    revalidatePath("/", "layout");

    return response;
  } catch (e) {
    throw new Error('Error updating user')
  }
}

export async function removeUser(data: IUpdateUserPayload) {
  try {
    await db.user.delete({
      where: {
        id: data.id,
      },
    });

    await db.$disconnect();
  } catch (e) {
    throw new Error('Error removing user')
  }

  if (data.avatar) {
    const filename = data.avatar.split('/').pop();
    const directoryPath = 'public/uploads';
    const filePath = `${directoryPath}/${filename}`;

    const exists = await fsExtra.pathExists(filePath);
    if (exists) {
      await fsExtra.remove(filePath);
    }
  }

  revalidatePath("/", "layout");
}

export async function updateStatusUser(data: { id: string, status: boolean }) {
  try {
    await db.user.update({
      where: {
        id: data.id,
      },
      data: {
        status: data.status,
      }
    });

    await db.$disconnect();

    revalidatePath("/", "layout");
  } catch (err) {
    throw new Error('Error updating status')
  }
}