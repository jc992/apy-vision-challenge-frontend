import paths from './paths';

export default ({ data }, email) => {
  if (data) {
    localStorage.setItem('user', email);
    window.location.href = paths.portfolio;
  }
};
