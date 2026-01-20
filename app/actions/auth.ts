'use server';

import db from '@/lib/db';
import bcrypt from 'bcryptjs';
import { createSession, deleteSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function register(prevState: any, formData: FormData) {
  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!username || !email || !password) {
    return { error: 'All fields are required' };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Check if user exists
    const existingUser = db.prepare('SELECT * FROM users WHERE username = ? OR email = ?').get(username, email);
    if (existingUser) {
      return { error: 'Username or email already exists' };
    }

    const stmt = db.prepare('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)');
    const info = stmt.run(username, email, hashedPassword);
    const userId = info.lastInsertRowid as number;

    await createSession(userId, username);
  } catch (error) {
    console.error('Registration error:', error);
    return { error: 'Registration failed' };
  }
  
  redirect('/dashboard');
}

export async function login(prevState: any, formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { error: 'Username and password are required' };
  }

  try {
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username) as any;

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return { error: 'Invalid credentials' };
    }

    await createSession(user.id, user.username);
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'Login failed' };
  }

  redirect('/dashboard');
}

export async function logout() {
  await deleteSession();
  redirect('/login');
}
