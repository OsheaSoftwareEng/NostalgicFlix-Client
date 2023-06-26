import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view.jsx';
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
