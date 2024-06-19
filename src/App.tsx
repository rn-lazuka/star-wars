import { Unity, useUnityContext } from 'react-unity-webgl';
import { useCallback, useEffect, useState } from 'react';
import hexacoreLogo from './assets/images/hexacore.png';

function App() {
  const [devicePixelRatio, setDevicePixelRatio] = useState<number>(
    window.devicePixelRatio,
  );
  const [userData, setUserData] = useState<null | {
    firstName: string | undefined;
    username: string;
    id: number;
  }>(null);

  const { unityProvider, loadingProgression, isLoaded, sendMessage } =
    useUnityContext({
      loaderUrl: `${process.env.REACT_APP_GAME_STORAGE_URL}/Build.loader.js`,
      dataUrl: `${process.env.REACT_APP_GAME_STORAGE_URL}/Build.data.unityweb`,
      frameworkUrl: `${process.env.REACT_APP_GAME_STORAGE_URL}/Build.framework.js.unityweb`,
      codeUrl: `${process.env.REACT_APP_GAME_STORAGE_URL}/Build.wasm.unityweb`,
      companyName: 'Hexacore',
      productName: 'Space Slime',
      productVersion: '1.0',
    });

  const initUser = () => {
    const telegramWebApp = window.Telegram && window.Telegram.WebApp;
    if (telegramWebApp) {
      const userData = telegramWebApp.initDataUnsafe.user;
      if (userData) {
        const userInfo = {
          firstName: userData.first_name,
          username: userData.username,
          id: userData.id,
        };
        setUserData(userInfo);
        telegramWebApp.expand();
      }
    }
  };

  const sendUserId = useCallback(() => {
    if (isLoaded && userData) {
      sendMessage(
        'HexacoreAppKit',
        'InitializeApp',
        JSON.stringify({
          userId: userData.id,
        }),
      );
    }
  }, [isLoaded, userData]);

  useEffect(() => {
    if (isLoaded && userData) {
      sendUserId();
    }
  }, [userData, isLoaded]);

  useEffect(() => {
    initUser();
  }, []);

  useEffect(
    function () {
      const updateDevicePixelRatio = function () {
        setDevicePixelRatio(window.devicePixelRatio);
      };
      const mediaMatcher = window.matchMedia(
        `screen and (resolution: ${devicePixelRatio.toString()}dppx)`,
      );
      mediaMatcher.addEventListener('change', updateDevicePixelRatio);
      return function () {
        mediaMatcher.removeEventListener('change', updateDevicePixelRatio);
      };
    },
    [devicePixelRatio],
  );

  return (
    <>
      {!isLoaded && (
        <div className="loaderContainer">
          <img src={hexacoreLogo} alt="logo" className="logo" />
          <div className="progressBar">
            <div
              className="progress"
              style={{ width: Math.round(loadingProgression * 100) }}
            />
          </div>
        </div>
      )}
      <Unity
        unityProvider={unityProvider}
        devicePixelRatio={devicePixelRatio}
        style={{
          width: '100%',
          height: '100dvh',
          visibility: isLoaded ? 'visible' : 'hidden',
        }}
      />
    </>
  );
}

export default App;
