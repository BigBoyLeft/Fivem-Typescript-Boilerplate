import { MutableRefObject, useEffect, useRef } from "react";

type NuiHandler<T> = (data: T) => void;
export const useAppEvent = <T = any>(app: string, appEvent: string, handler: (data: T) => void) => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const savedHandler: MutableRefObject<NuiHandler<T>> = useRef(() => {});

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const eventListener = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if (savedHandler.current) {
                if (data.type === "appEvent" && app === data.app && data.event === appEvent) {
                    savedHandler.current(data.data);
                }
            }
        };

        window.addEventListener("message", eventListener);
        return () => window.removeEventListener("message", eventListener);
    }, [app]);
};

export default useAppEvent;
