import Navigation from './navigation/Navigation';

//redux
import { Provider } from 'react-redux';
import { store } from './app/store';

export default function App() {
  return (

    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
