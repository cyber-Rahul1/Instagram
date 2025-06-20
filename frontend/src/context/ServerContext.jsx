

import { useState } from 'react';
import { ServerContext } from '../context/ContextProvider'

export const ServerProvider = ({ children }) => {
    const [page, setPage] = useState(''); 

    return (
        <ServerContext.Provider value={{page, setPage}}>
            {children}
        </ServerContext.Provider>
    );
};




