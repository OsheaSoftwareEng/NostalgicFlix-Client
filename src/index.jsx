import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view.jsx';
import Container from 'react-bootstrap/Container';
import './index.scss';

//Main component (will eventually use all the others)
const App = () => {
  return (
    <>
      <h1 className='heading'>NostalgicFlix</h1>
      <Container>
        <MainView />
      </Container>
    </>
  );
};

//finds the root of your app
const container = document.querySelector('#root');
const root = createRoot(container);

//Tells react to render your app in the root DOM element
root.render(<App />);
