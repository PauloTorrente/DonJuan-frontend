export function evaluatePasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 9) strength += 1; // Minimum length
    if (/[A-Z]/.test(password)) strength += 1; // Uppercase letter
    if (/[a-z]/.test(password)) strength += 1; // Lowercase letter
    if (/\d/.test(password)) strength += 1; // Number
    if (/[@$!%*?&]/.test(password)) strength += 1; // Special character
    
    if (strength === 5) return 'strong'; // 5 out of 5 criteria met
    if (strength >= 3) return 'medium'; // 3 or 4 criteria met
    return 'weak'; // Less than 3 criteria met
  }
  