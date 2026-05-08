import { TokenPayload } from '@/types/user';
import { clsx, type ClassValue } from 'clsx';
import { jwtDecode } from 'jwt-decode';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function decodeToken(token: string): TokenPayload {
  return jwtDecode<TokenPayload>(token);
}
