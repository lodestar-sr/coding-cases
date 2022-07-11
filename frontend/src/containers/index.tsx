import React from 'react';
import { useSelector } from 'react-redux';
import { Audio } from 'react-loader-spinner';

import Board from './board';
import { selectRequestIsLoading } from '../store/global-request';
import { GET_IMAGES } from '../store/image';

const App: React.FC = (): React.ReactElement => {
  const isLoading = useSelector(selectRequestIsLoading(GET_IMAGES));

  return (
    <>
      {isLoading && (
        <Audio
          wrapperClass="fixed top-0 left-0 z-[100] w-screen h-screen flex items-center justify-center bg-black-loadBack"
          color="gray"
          ariaLabel="loading"
        />
      )}
      <div className="app-container">
        <Board />
      </div>
    </>
  );
};

export default App;
