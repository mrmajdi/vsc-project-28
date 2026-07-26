import { randomInt } from 'crypto';

/**
 * Generates a secure 6-digit OTP.
 * @returns A string representing the OTP, padded with leading zeros if necessary.
 */
export function generateOTP(): string {
  // randomInt generates a number in [0, 1000000)
  const otp = randomInt(0, 1_000_000);
  return otp.toString().padStart(6, '0');
}

/**
 * Verifies a candidate OTP against the actual OTP using constant-time comparison.
 * @param candidate - The OTP provided by the user.
 * @param actual - The OTP that was generated.
 * @returns true if the OTPs match, false otherwise.
 */
export function verifyOTP(candidate: string, actual: string): boolean {
  if (candidate.length !== actual.length) {
    return false;
  }
  let result = 0;
  for (let i = 0; i < candidate.length; i++) {
    // XOR the char codes; any mismatch will set a bit in result
    result |= candidate.charCodeAt(i) ^ actual.charCodeAt(i);
  }
  // If result is 0, all characters matched
  return result === 0;
}