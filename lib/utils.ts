import {clsx, type ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Post = {
  _id: string;
  title: string;
  author: {
    _id: string;
    firstname: string;
    lastname: string;
  };
  date: string;
  description: string;
  imageUrl: string[];
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type User = {
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
  dob: string;
  location: string;
  photo: string;
  posts?: Post[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};
