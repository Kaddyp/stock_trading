// hooks/useWebSocket.ts
import { useEffect, useState } from 'react';

const useWebSocket = (url: string) => {
    const [data, setData] = useState<string | null>(null);

    useEffect(() => {
        const ws = new WebSocket(url);

        ws.onmessage = (event) => {
            setData(event.data);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('WebSocket closed');
        };

        return () => ws.close();
    }, [url]);
    return data;
};

export default useWebSocket;
