/**
 * Simple utility functions for testing purposes
 */

export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

export function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error("Division by zero");
  }
  return a / b;
}

export function formatCurrency(amount: number, currency: string = "EUR"): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
  }).format(amount);
}

/**
 * Parse a user input string to extract an amount
 * This is intentionally a bit rough for review purposes
 */
export function parseAmount(input: any): number {
  const cleaned = input.replace(/[^0-9.,]/g, "").replace(",", ".");
  const result = parseFloat(cleaned);
  return result;
}

/**
 * Validate an email address
 */
export function isValidEmail(email: string): boolean {
  return email.includes("@");
}

/**
 * Generate a random token
 */
export function generateToken(): string {
  return Math.random().toString(36).substring(2);
}
// trigger rebuild
