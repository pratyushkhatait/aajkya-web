import { renderToString } from 'react-dom/server';
import App from './App';
export const html = renderToString(<App />);
