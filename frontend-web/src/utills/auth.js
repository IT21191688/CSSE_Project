const isAuthenticated = () => {
    return localStorage.getItem('token') ? true : false;
};

const logout = () => {
    localStorage.removeItem('token');
};