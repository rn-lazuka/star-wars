import { Unity, useUnityContext } from 'react-unity-webgl';
import { useCallback, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { API } from './utils';
import { AuthResponse } from './types';
import spacer from './assets/images/spacer.png';
import { channelLink, shareMessage } from './constants';

function App() {
  const [devicePixelRatio, setDevicePixelRatio] = useState<number>(
    window.devicePixelRatio,
  );
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [user, setUser] = useState<null | {
    firstName: string | undefined;
    username: string | undefined;
    id: number;
    isPremium: boolean;
  }>(null);

  const {
    unityProvider,
    loadingProgression,
    isLoaded,
    sendMessage,
    addEventListener,
    removeEventListener,
  } = useUnityContext({
    loaderUrl: `${process.env.REACT_APP_GAME_STORAGE_URL}/Build.loader.js?v=1`,
    dataUrl: `${process.env.REACT_APP_GAME_STORAGE_URL}/Build.data.unityweb?v=1`,
    frameworkUrl: `${process.env.REACT_APP_GAME_STORAGE_URL}/Build.framework.js.unityweb?v=1`,
    codeUrl: `${process.env.REACT_APP_GAME_STORAGE_URL}/Build.wasm.unityweb?v=1`,
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
          username: userData?.username,
          id: userData.id,
          isPremium: !!userData?.is_premium,
        };
        setUser(userInfo);
        const urlParams = new URLSearchParams(window.location.search);
        const startAppParam = urlParams.get('tgWebAppStartParam');
        const {
          data: { token },
        }: AxiosResponse<AuthResponse> = await API.post('/auth', {
          playerId: userInfo.id,
          userName: userInfo.username,
          referralId: startAppParam,
          premium: userInfo.isPremium,
        });
        setAuthToken(token);
      }
    }
  };

  const sendUserId = useCallback(() => {
    if (isLoaded && user) {
      sendMessage(
        'HexacoreAppKit',
        'InitializeApp',
        JSON.stringify({
          userId: user.id,
          userName: user.username,
          token: authToken,
        }),
      );
    }
  }, [isLoaded, user]);

  const handleJoinChannel = () => {
    window.Telegram.WebApp.openTelegramLink(channelLink);
  };

  const handleInviteFriend = () => {
    if (user) {
      const url = `https://t.me/${process.env.REACT_APP_BOT_USERNAME}/wallet?startapp=${user.id}`;
      const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&parse_mode=Markdown&text=${encodeURIComponent(shareMessage)}`;
      window.Telegram.WebApp.openTelegramLink(shareUrl);
    }
  };

  const handleCopyRefLink = () => {
    const referralLink = `https://t.me/${process.env.REACT_APP_BOT_USERNAME}/game?startapp=${
      user ? user.id : 'defaultUser'
    }`;

    navigator.clipboard.writeText(referralLink);
    window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
    alert('Copied! ' + '\n\nShare with the friend!');
  };

  useEffect(() => {
    if (isLoaded && user) {
      sendUserId();
    }
  }, [user, isLoaded]);

  useEffect(() => {
    initUser();
    addEventListener('JoinChannel', handleJoinChannel);
    addEventListener('InviteFren', handleInviteFriend);
    addEventListener('CopyRefLink', handleCopyRefLink);

    return () => {
      removeEventListener('JoinChannel', handleJoinChannel);
      removeEventListener('InviteFren', handleInviteFriend);
      removeEventListener('CopyRefLink', handleCopyRefLink);
    };
  }, [user]);

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
