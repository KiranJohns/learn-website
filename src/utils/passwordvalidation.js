export function validatePassword(password) {
  return new Promise((resolve, reject) => {
    const errors = [];

    if (password.length < 8) {
      errors.push("Password should be at least 8 characters long.");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password should contain at least one lowercase letter.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password should contain at least one uppercase letter.");
    }
    if (!/\d/.test(password)) {
      errors.push("Password should contain at least one digit.");
    }
    if (!/[!@#$%^&*()-_+=]/.test(password)) {
      errors.push("Password should contain at least one special character.");
    }

    if (errors.length === 0) {
      resolve([]);
    } else {
      resolve(errors);
    }
  });
}
