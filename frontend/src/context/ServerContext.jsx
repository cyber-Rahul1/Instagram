

import { ServerContext } from '../context/ContextProvider'

export const ServerProvider = ({ children }) => {
    const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:3000"; 

    return (
        <ServerContext.Provider value={serverUrl}>
            {children}
        </ServerContext.Provider>
    );
};




