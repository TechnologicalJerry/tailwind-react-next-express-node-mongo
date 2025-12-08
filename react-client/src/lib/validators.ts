export const validators = {
  email: (value: string): string | undefined => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return "Email is required";
    if (!emailRegex.test(value)) return "Invalid email format";
    return undefined;
  },

  password: (value: string, minLength: number = 8): string | undefined => {
    if (!value) return "Password is required";
    if (value.length < minLength) {
      return `Password must be at least ${minLength} characters`;
    }
    return undefined;
  },

  required: (value: string | number | undefined): string | undefined => {
    if (value === undefined || value === null || value === "") {
      return "This field is required";
    }
    return undefined;
  },

  minLength: (
    value: string,
    minLength: number
  ): string | undefined => {
    if (value.length < minLength) {
      return `Must be at least ${minLength} characters`;
    }
    return undefined;
  },

  maxLength: (
    value: string,
    maxLength: number
  ): string | undefined => {
    if (value.length > maxLength) {
      return `Must be no more than ${maxLength} characters`;
    }
    return undefined;
  },

  match: (
    value: string,
    matchValue: string,
    fieldName: string = "Fields"
  ): string | undefined => {
    if (value !== matchValue) {
      return `${fieldName} do not match`;
    }
    return undefined;
  },
};

export function validateForm<T extends Record<string, any>>(
  values: T,
  rules: Partial<Record<keyof T, (value: any) => string | undefined>>
): Partial<Record<keyof T, string>> {
  const errors: Partial<Record<keyof T, string>> = {};

  Object.keys(rules).forEach((key) => {
    const rule = rules[key as keyof T];
    if (rule) {
      const error = rule(values[key as keyof T]);
      if (error) {
        errors[key as keyof T] = error;
      }
    }
  });

  return errors;
}

