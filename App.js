import 'expo-dev-client';

//redux
import { Provider } from 'react-redux';
import { store } from './app/store';

//screen navigation
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './navigation/AppStack';
import Tabs from './navigation/Tabs';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </Provider>
  );
}
