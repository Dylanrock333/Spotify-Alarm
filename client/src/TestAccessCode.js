import React, { useContext } from 'react';
import TokenContext from './TokenContext';

function AnotherComponent() {
  const { tokens } = useContext(TokenContext);

  return (
    <div>
      Access Token: {tokens.access_token}
    </div>
  );
}

export default AnotherComponent;