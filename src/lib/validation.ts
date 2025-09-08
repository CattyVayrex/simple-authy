/**
 * Validates phone numbers. like, yo, do I like this phone number format?
 * Yes if it's like one of these: 09xxxxxxxxx, +989xxxxxxxxx, 00989xxxxxxxxx
 */
export function validateIranianPhone(phone: string): boolean {
  // Remove all spaces and dashes
  const cleanPhone = phone.replace(/[\s-]/g, '');
  
  // Just some regex patterns to validate the phone number. trust me it works :)
  const patterns = [
    /^09\d{9}$/,
    /^\+989\d{9}$/,
    /^00989\d{9}$/,
  ];
  
  return patterns.some(pattern => pattern.test(cleanPhone));
}

/**
 * Formats Iranian phone number to a consistent format
 * like... we use it to turn those 3 formats to just one official format (+98).
 */
export function formatIranianPhone(phone: string): string {
  const cleanPhone = phone.replace(/[\s-]/g, '');
  
  if (cleanPhone.startsWith('+989')) {
    return cleanPhone;
  } else if (cleanPhone.startsWith('00989')) {
    return `+989${cleanPhone.slice(5)}`;
  } else if (cleanPhone.startsWith('09')) {
    return `+989${cleanPhone.slice(2)}`;
  }
  
  return phone;
}