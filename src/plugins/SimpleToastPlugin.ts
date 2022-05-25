import { ConfigArgs, toastConfig } from 'react-simple-toasts';

/*
 * eg:
 *   import toast from 'react-simple-toasts';
 *   toast('hello world');
 * */
const Config: ConfigArgs = {
  time: 1e3,
  className: 'toast-config',
  position: 'center',
  clickClosable: false,
  render: null,
};

toastConfig(Config);
