// import { ThemeContext } from 'components/Context/Context';
// import React, { useContext } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { LoaderWrapper, MainLoader } from './Loader.styled';

export const Loader = () => {
  // const { isChristmas } = useContext(ThemeContext);

  return (
    <MainLoader>
      <LoaderWrapper>
        {
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#D6001C"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />

          /* <ThreeCircles
          color={isChristmas ? '#D6001C' : '#FC842D'}
          arialLabel="loading-indicator"
          height="120"
          width="120"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        /> */
        }
      </LoaderWrapper>
    </MainLoader>
  );
};
