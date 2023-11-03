import React, { useContext, useEffect } from 'react';
import TokenContext from './TokenContext';

function TokenFetcher() {
    const { setTokens } = useContext(TokenContext);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000//'); 
            const result = await response.json();
            console.log(result.access_token);
            setTokens({
                access_token: result.access_token,
                refresh_token: result.refresh_token,
                expires_in: result.expires_in
              });
        };
        fetchData();
    }, [setTokens]);

    return null
}

export default TokenFetcher;
