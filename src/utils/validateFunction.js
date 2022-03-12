export const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const validateEmail = (email, setEmailError) => {
    if (email === "") {
        setEmailError("");
    }
    else if (isValidEmail(email)) {
        setEmailError("");
    }
    else {
        setEmailError("Invalid Email!");
    }
}

export const validatePassword = (password, setPasswordError) => {
    if (password.trim().length < 6) {
        setPasswordError("Password must be 6 characters!");
    } else {
        setPasswordError("");
    }
}

export const validateConfirmPassword = (password, confirmPassword, setConfirmPasswordError) => {
    if(password !== confirmPassword) {
        setConfirmPasswordError("Confirm password isn't match to password!");
    } else {
        setConfirmPasswordError("");
    }
}