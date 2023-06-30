import Spinner from 'react-bootstrap/Spinner';

export const Spinner = () => {
  return (
    <>
      <Spinner animation='border' role='status' variant='danger'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    </>
  );
};
