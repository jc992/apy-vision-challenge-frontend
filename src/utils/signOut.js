import paths from './paths';

export default () => {
  localStorage.removeItem('user');
  window.location.href = paths.home;
};
