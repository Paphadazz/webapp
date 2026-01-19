export type BmiCategory = 'Underweight' | 'Normal' | 'Overweight' | 'Obese';

export function calculateBmi(heightCm: number, weightKg: number): number {
  if (heightCm <= 0 || weightKg <= 0) return 0;
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  return parseFloat(bmi.toFixed(2));
}

export function getBmiCategory(bmi: number): BmiCategory {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

export function getBmiColor(category: BmiCategory): string {
  switch (category) {
    case 'Underweight': return 'text-blue-500';
    case 'Normal': return 'text-green-500';
    case 'Overweight': return 'text-orange-500';
    case 'Obese': return 'text-red-500';
    default: return 'text-gray-500';
  }
}
