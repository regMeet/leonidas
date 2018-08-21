import storage from 'redux-persist/es/storage';

const config = {
  key: 'root',
  storage,
  blacklist: ['users'],
};

export default config;
