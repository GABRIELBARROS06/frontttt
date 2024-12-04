import React, { useEffect, useRef } from 'react';

const ZegoRoom = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    // Carregar os scripts da ZegoCloud
    const loadScripts = () => {
      const cryptoScript = document.createElement('script');
      cryptoScript.src = 'https://resource.zegocloud.com/prebuilt/crypto-js.js';
      document.body.appendChild(cryptoScript);

      const prebuiltTokenScript = document.createElement('script');
      prebuiltTokenScript.src = 'https://resource.zegocloud.com/prebuilt/prebuiltToken.js';
      document.body.appendChild(prebuiltTokenScript);

      const zegoScript = document.createElement('script');
      zegoScript.src = 'https://zegocloud.github.io/zegocloud_prebuilt_webrtc/ZegoPrebuilt/index.umd.js';
      document.body.appendChild(zegoScript);

      zegoScript.onload = () => {
        // Gerar o token de acesso
        const TOKEN = generatePrebuiltToken(
          1212991992, // App ID
          "144f9c43798ba6256011bed42ea64cec", // App Secret
          'room2', // Nome da sala
          'UserID-' + Math.random(), // ID do usuário
          'Aluno' + Math.random() // Nome do usuário
        );

        // Inicializar o ZegoUIKitPrebuilt
        const zp = ZegoUIKitPrebuilt.create(TOKEN);

        // Entrar na sala e montar no contêiner
        zp.joinRoom({
          container: rootRef.current,
        });

        // Gerar o link para compartilhar a sala
        const isProduction = window.location.hostname !== 'localhost';
        const baseURL = isProduction ? process.env.REACT_APP_BASE_URL : window.location.origin;

        const roomLink = `${baseURL}/video-chat?room=room2`; // Exemplo de link para compartilhar

        console.log('Link para compartilhar a sala:', roomLink);
      };
    };

    loadScripts();

    // Limpar os scripts após o componente ser desmontado
    return () => {
      document.body.querySelectorAll('script').forEach(script => script.remove());
    };
  }, []);

  return (
    <div>
      <div ref={rootRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default ZegoRoom;