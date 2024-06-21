import { Unity, useUnityContext } from 'react-unity-webgl';
import { useCallback, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { API } from './utils';
import { AuthResponse } from './types';
import spacer from './assets/images/spacer.png';

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

  const initUser = async () => {
    const telegramWebApp = window.Telegram && window.Telegram.WebApp;
    if (telegramWebApp) {
      telegramWebApp.expand();
      const userData = telegramWebApp.initDataUnsafe.user;
      if (userData) {
        const userInfo = {
          firstName: userData.first_name,
          username: userData.username,
          id: userData.id,
        };
        const urlParams = new URLSearchParams(window.location.search);
        const startAppParam = urlParams.get('tgWebAppStartParam');
        const { data }: AxiosResponse<AuthResponse> = await API.post('/auth', {
          playerId: userInfo.id,
          userName: userInfo.username,
          referralId: startAppParam,
        });
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
    <div className="loaderContainer">
      {!isLoaded && (
        <div className="logoContainer">
          <img src={spacer} alt="spacer" className="logo" />
          <div className="progressBar">
            <div
              className="progress"
              style={{ width: `${Math.round(loadingProgression * 100)}%` }}
            />
          </div>
        </div>
      )}
      <Unity
        unityProvider={unityProvider}
        devicePixelRatio={devicePixelRatio}
        style={{
          width: '100%',
          height: '100%',
          display: isLoaded ? 'inline' : 'none',
        }}
      />
    </div>
  );
}

export default App;
