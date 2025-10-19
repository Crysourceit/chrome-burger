/**
 * Registration Form Validation Module
 * Provides comprehensive regex validation for Chrome & Burger registration form
 */

class FormValidator {
    constructor() {
        // Regex patterns for validation
        this.patterns = {
            // Full Name: 2-50 characters, letters, spaces, hyphens, apostrophes, international support
            fullName: /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/,

            // Email: Standard email format with common TLDs
            email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

            // Phone: Thai phone numbers (mobile and landline)
            phone: /^(0[689]\d{8}|\+66[689]\d{8}|02\d{7}|\+662\d{7})$/,

            // Password: At least 8 characters, mixed case, number, special character
            password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,

            // Address: 10-200 characters, letters, numbers, common address characters
            address: /^[a-zA-Z0-9\s,'#.-]{10,200}$/
        };

        // Error messages for each validation type
        this.messages = {
            fullName: {
                error: 'Please enter a valid name (2-50 characters, letters only)',
                success: '✓ Valid name format'
            },
            email: {
                error: 'Please enter a valid email address (e.g., user@example.com)',
                success: '✓ Valid email format'
            },
            phone: {
                error: 'Please enter a valid Thai phone number (e.g., 0812345678 or +66812345678)',
                success: '✓ Valid phone number format'
            },
            password: {
                error: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character',
                success: '✓ Strong password'
            },
            confirmPassword: {
                error: 'Passwords do not match',
                success: '✓ Passwords match'
            },
            address: {
                error: 'Address must be 10-200 characters long',
                success: '✓ Valid address format'
            },
            terms: {
                error: 'You must agree to the terms and conditions',
                success: ''
            }
        };

        this.initializeValidation();
    }

    /**
     * Initialize validation event listeners and DOM elements
     */
    initializeValidation() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupValidation());
        } else {
            this.setupValidation();
        }
    }

    /**
     * Set up validation event listeners
     */
    setupValidation() {
        const form = document.getElementById('registrationForm');
        if (!form) return;

        // Get form fields
        const fields = {
            fullName: document.getElementById('fullName'),
            email: document.getElementById('email'),
            phone: document.getElementById('phone'),
            password: document.getElementById('password'),
            confirmPassword: document.getElementById('confirmPassword'),
            address: document.getElementById('address'),
            terms: document.getElementById('terms')
        };

        // Add real-time validation listeners
        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];
            if (!field) return;

            if (fieldName === 'terms') {
                field.addEventListener('change', () => this.validateField(fieldName, field));
            } else {
                // Validate on input (real-time)
                field.addEventListener('input', () => this.validateField(fieldName, field));
                // Validate on blur (when field loses focus)
                field.addEventListener('blur', () => this.validateField(fieldName, field));
            }
        });

        // Password strength monitoring
        if (fields.password) {
            fields.password.addEventListener('input', () => this.updatePasswordStrength(fields.password));
        }

        // Confirm password validation
        if (fields.password && fields.confirmPassword) {
            fields.confirmPassword.addEventListener('input', () => this.validatePasswordMatch(fields.password, fields.confirmPassword));
        }

        // Form submission
        form.addEventListener('submit', (e) => this.handleFormSubmit(e));

        // Password visibility toggles
        this.setupPasswordToggles();
    }

    /**
     * Validate a single field
     */
    validateField(fieldName, field) {
        const value = field.value.trim();
        let isValid = false;
        let message = '';

        switch (fieldName) {
            case 'fullName':
                isValid = this.validateFullName(value);
                message = isValid ? this.messages.fullName.success : this.messages.fullName.error;
                break;

            case 'email':
                isValid = this.validateEmail(value);
                message = isValid ? this.messages.email.success : this.messages.email.error;
                break;

            case 'phone':
                isValid = this.validatePhone(value);
                message = isValid ? this.messages.phone.success : this.messages.phone.error;
                break;

            case 'password':
                isValid = this.validatePassword(value);
                message = isValid ? this.messages.password.success : this.messages.password.error;
                break;

            case 'confirmPassword':
                const password = document.getElementById('password').value;
                isValid = this.validateConfirmPassword(value, password);
                message = isValid ? this.messages.confirmPassword.success : this.messages.confirmPassword.error;
                break;

            case 'address':
                // Address is optional, only validate if not empty
                if (value === '') {
                    isValid = true;
                    message = '';
                } else {
                    isValid = this.validateAddress(value);
                    message = isValid ? this.messages.address.success : this.messages.address.error;
                }
                break;

            case 'terms':
                isValid = field.checked;
                message = isValid ? '' : this.messages.terms.error;
                break;
        }

        // Update field UI
        this.updateFieldUI(field, isValid, message);
        return isValid;
    }

    /**
     * Validation methods for each field type
     */
    validateFullName(name) {
        return this.patterns.fullName.test(name);
    }

    validateEmail(email) {
        return this.patterns.email.test(email);
    }

    validatePhone(phone) {
        return this.patterns.phone.test(phone);
    }

    validatePassword(password) {
        return this.patterns.password.test(password);
    }

    validateConfirmPassword(confirmPassword, password) {
        return confirmPassword === password && confirmPassword.length > 0;
    }

    validateAddress(address) {
        return this.patterns.address.test(address);
    }

    /**
     * Update field UI based on validation state
     */
    updateFieldUI(field, isValid, message) {
        const formGroup = field.closest('.form-group');
        const validationIcon = formGroup.querySelector('.validation-icon');
        const validationMessage = formGroup.querySelector('.validation-message');

        // Remove existing classes
        field.classList.remove('valid', 'invalid');
        if (validationIcon) {
            validationIcon.classList.remove('success', 'error');
            validationIcon.textContent = '';
        }
        if (validationMessage) {
            validationMessage.classList.remove('success', 'error');
            validationMessage.textContent = '';
        }

        if (field.value.trim() === '') {
            // Empty field - no validation state
            return;
        }

        if (isValid) {
            field.classList.add('valid');
            if (validationIcon) {
                validationIcon.classList.add('success');
                validationIcon.textContent = '✓';
            }
            if (validationMessage && message) {
                validationMessage.classList.add('success');
                validationMessage.textContent = message;
            }
        } else {
            field.classList.add('invalid');
            if (validationIcon) {
                validationIcon.classList.add('error');
                validationIcon.textContent = '✗';
            }
            if (validationMessage) {
                validationMessage.classList.add('error');
                validationMessage.textContent = message;
            }
        }
    }

    /**
     * Update password strength indicator
     */
    updatePasswordStrength(passwordField) {
        const password = passwordField.value;
        const formGroup = passwordField.closest('.form-group');
        const strengthBar = formGroup.querySelector('.password-strength-bar');
        const strengthText = formGroup.querySelector('.password-strength-text');

        if (!strengthBar || !strengthText) return;

        let strength = 0;
        let strengthLabel = '';
        let strengthClass = '';

        if (password.length === 0) {
            strengthBar.className = 'password-strength-bar';
            strengthText.textContent = '';
            return;
        }

        // Check various criteria
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

        // Determine strength level
        if (strength <= 2) {
            strengthClass = 'weak';
            strengthLabel = 'Weak password';
        } else if (strength <= 4) {
            strengthClass = 'medium';
            strengthLabel = 'Medium strength';
        } else {
            strengthClass = 'strong';
            strengthLabel = 'Strong password';
        }

        strengthBar.className = `password-strength-bar ${strengthClass}`;
        strengthText.textContent = strengthLabel;
    }

    /**
     * Validate password match
     */
    validatePasswordMatch(passwordField, confirmPasswordField) {
        const password = passwordField.value;
        const confirmPassword = confirmPasswordField.value;

        if (confirmPassword === '') {
            return; // Don't validate empty confirm field
        }

        const isValid = password === confirmPassword;
        const message = isValid ? this.messages.confirmPassword.success : this.messages.confirmPassword.error;
        this.updateFieldUI(confirmPasswordField, isValid, message);
    }

    /**
     * Set up password visibility toggles
     */
    setupPasswordToggles() {
        const togglePassword = document.getElementById('togglePassword');
        const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
        const passwordField = document.getElementById('password');
        const confirmPasswordField = document.getElementById('confirmPassword');

        if (togglePassword && passwordField) {
            togglePassword.addEventListener('click', () => {
                this.togglePasswordVisibility(passwordField, togglePassword);
            });
        }

        if (toggleConfirmPassword && confirmPasswordField) {
            toggleConfirmPassword.addEventListener('click', () => {
                this.togglePasswordVisibility(confirmPasswordField, toggleConfirmPassword);
            });
        }
    }

    /**
     * Toggle password visibility
     */
    togglePasswordVisibility(passwordField, toggleButton) {
        const type = passwordField.type === 'password' ? 'text' : 'password';
        passwordField.type = type;
        toggleButton.textContent = type === 'password' ? '👁️' : '🙈';
    }

    /**
     * Handle form submission
     */
    handleFormSubmit(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        let isFormValid = true;

        // Validate all fields
        const fields = ['fullName', 'email', 'phone', 'password', 'confirmPassword', 'address', 'terms'];
        fields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field) {
                const isValid = this.validateField(fieldName, field);
                if (!isValid) {
                    isFormValid = false;
                }
            }
        });

        const feedbackElement = document.getElementById('formFeedback');
        const submitButton = form.querySelector('.submit-btn');

        if (isFormValid) {
            // Simulate form submission
            submitButton.disabled = true;
            submitButton.textContent = 'Creating Account...';

            // Show loading feedback
            this.showFeedback(feedbackElement, 'Creating your account...', 'info');

            // Simulate API call
            setTimeout(() => {
                this.showFeedback(feedbackElement, '✓ Account created successfully! Welcome to Chrome & Burger!', 'success');
                submitButton.disabled = false;
                submitButton.textContent = 'Create Account';

                // Reset form after successful submission
                setTimeout(() => {
                    form.reset();
                    this.clearValidationStates();
                    this.hideFeedback(feedbackElement);
                }, 3000);
            }, 2000);
        } else {
            this.showFeedback(feedbackElement, 'Please correct the errors above and try again.', 'error');
        }
    }

    /**
     * Show form feedback message
     */
    showFeedback(element, message, type) {
        if (!element) return;

        element.textContent = message;
        element.className = `form-feedback ${type}`;
        element.style.display = 'block';
    }

    /**
     * Hide form feedback message
     */
    hideFeedback(element) {
        if (!element) return;
        element.style.display = 'none';
    }

    /**
     * Clear all validation states
     */
    clearValidationStates() {
        const fields = document.querySelectorAll('.form-group input, .form-group textarea');
        fields.forEach(field => {
            field.classList.remove('valid', 'invalid');
            const formGroup = field.closest('.form-group');
            const validationIcon = formGroup.querySelector('.validation-icon');
            const validationMessage = formGroup.querySelector('.validation-message');

            if (validationIcon) {
                validationIcon.className = 'validation-icon';
                validationIcon.textContent = '';
            }
            if (validationMessage) {
                validationMessage.className = 'validation-message';
                validationMessage.textContent = '';
            }
        });

        // Clear password strength
        const strengthBars = document.querySelectorAll('.password-strength-bar');
        const strengthTexts = document.querySelectorAll('.password-strength-text');
        strengthBars.forEach(bar => bar.className = 'password-strength-bar');
        strengthTexts.forEach(text => text.textContent = '');
    }
}

// Initialize the form validator when the script loads
const validator = new FormValidator();

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormValidator;
} else if (typeof define === 'function' && define.amd) {
    define([], function() { return FormValidator; });
}