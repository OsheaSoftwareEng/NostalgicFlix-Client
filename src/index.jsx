import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view.jsx';
import * as serviceWorkerRegistration from './serviceWorkerRegistration.js';
import reportWebVitals from './reportWebVitals';
import './index.scss';

//Main component (will eventually use all the others)
export const App = () => {
  return <MainView />;
};

//finds the root of your app
const container = document.querySelector('#root');
const root = createRoot(container);

//Tells react to render your app in the root DOM element
root.render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
