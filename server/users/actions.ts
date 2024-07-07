"use server";

import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from "next/cache";
import db from "../db";
import { ICreateUserPayload, IUserResponse } from "./types";

import fs from 'fs/promises'
import fsNode from 'node:fs'

async function saveImage(image: File): Promise<void | string> {
  const uuidGenerate = uuidv4();
  const extension = image.name.split('.').pop();
  const filename = `${uuidGenerate}.${extension}`;
  const directoryPath = 'public/uploads';

  try {
    await fs.mkdir(directoryPath, { recursive: true });
  } catch (err) {
    console.error('Erro ao criar o diretório:', err);
  }

  const stream = fsNode.createWriteStream(`${directoryPath}/${filename}`);
  const bufferedImage = await image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Falha ao salvar a imagem!');
    }
  });

  return filename;
}


export async function createUser(
  data: ICreateUserPayload,
  formDataFile: FormData
): Promise<IUserResponse | boolean> {
  const file = formDataFile.get('avatar') as File;

  const payload: ICreateUserPayload = {
    name: data.name,
    cpf: data.cpf,
    phone: data.phone,
    birth_date: data.birth_date,
    avatar: null,
    email: data.email,
    status: data.status,
  }

  if (file) {
    try {
      const filename = await saveImage(file)
      payload.avatar = `${process.env.NEXT_PUBLIC_URL}/uploads/${filename}`
    } catch (e) {
      return false;
    }
  }

  const response = await db.user.create({ data: payload });

  revalidatePath("/", "layout");

  return response;
}

export async function updateUser() {
  revalidatePath("/", "layout");
}

export async function removeUser() {
  revalidatePath("/", "layout");
}