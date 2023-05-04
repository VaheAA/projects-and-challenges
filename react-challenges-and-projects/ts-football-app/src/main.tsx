import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import './assets/css/index.css';


const store = setupStore();


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ChakraProvider>,
);
