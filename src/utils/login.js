export default ({ data }, email) => {
  if (data) localStorage.setItem('user', email);
};
