import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
const root = document.getElementById('root')!;
if (root.childElementCount) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
