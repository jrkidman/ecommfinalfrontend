const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;

export const registerUser = async (email, password) => {
    const response = await fetch(`${urlEndpoint}/auth/registration`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });
    const responseJSON = await response.json();
    return responseJSON.success;
};

export const loginUser = async (email, password) => {
    const response = await fetch(`${urlEndpoint}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });
    const responseJSON = await response.json();
    if (responseJSON.success) {
        localStorage.setItem(
            process.env.REACT_APP_TOKEN_HEADER_KEY,
            JSON.stringify(responseJSON.token)
        );
    }
    return responseJSON.success;
    //redirect to login page
};

export const logoutUser = () => {
    localStorage.removeItem(process.env.REACT_APP_TOKEN_HEADER_KEY);
};

export const getUserToken = () => {
    return JSON.parse(
        localStorage.getItem(process.env.REACT_APP_TOKEN_HEADER_KEY)
    );
};

// export default Auth
