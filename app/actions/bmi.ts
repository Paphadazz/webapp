'use server';

import db from '@/lib/db';
import { getSession } from '@/lib/auth';
import { calculateBmi, getBmiCategory } from '@/lib/bmi';
import { revalidatePath } from 'next/cache';

export async function addBmiRecord(prevState: any, formData: FormData) {
  const session: any = await getSession();
  if (!session) return { error: 'Unauthorized' };

  const height = parseFloat(formData.get('height') as string);
  const weight = parseFloat(formData.get('weight') as string);

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    return { error: 'Invalid height or weight' };
  }

  const bmi = calculateBmi(height, weight);
  const category = getBmiCategory(bmi);

  const stmt = db.prepare(
    'INSERT INTO bmi_records (user_id, height, weight, bmi, category) VALUES (?, ?, ?, ?, ?)'
  );
  stmt.run(session.sub, height, weight, bmi, category);

  revalidatePath('/dashboard');
  return { success: true };
}

export async function getBmiHistory(range: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'monthly') {
  const session: any = await getSession();
  if (!session) return [];

  // Simple limit for now, ideally strictly filter by date range
  const stmt = db.prepare(
    'SELECT * FROM bmi_records WHERE user_id = ? ORDER BY created_at ASC'
  );
  return stmt.all(session.sub);
}

export async function getMisReport() {
  const session: any = await getSession();
  if (!session) return null;

  const stmt = db.prepare(`
    SELECT 
      AVG(bmi) as avgBmi,
      MIN(bmi) as minBmi,
      MAX(bmi) as maxBmi,
      COUNT(*) as totalRecords
    FROM bmi_records WHERE user_id = ?
  `);
  
  return stmt.get(session.sub);
}
