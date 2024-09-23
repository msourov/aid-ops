const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user
    ? { isAuthenticated: true, role: user.role }
    : { isAuthenticated: false };
};

export default isAuthenticated;
