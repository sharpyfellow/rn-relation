import { registerRootComponent } from 'expo';
import App from './App';
import { AuthProvider } from './context/AuthContext';  // Import AuthProvider

function Root() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

registerRootComponent(Root);