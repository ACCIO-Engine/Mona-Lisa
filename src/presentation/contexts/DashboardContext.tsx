import { useState, useContext, createContext, useEffect, useCallback, ReactNode } from "react";
import DashboardEntry from "../../application/types/DashboardEntry.enum";

interface DashboardEntryProps {
    logs: string;
    isStarted: boolean;
    expanded: boolean;
    // setLogs: (logs: string) => void | undefined;
    // setIsStarted: (isStarted: boolean) => void | undefined;
    // setExpanded: (expanded: boolean) => void | undefined;
}
interface DashboardState{
    [key: string]: DashboardEntryProps;
}

interface DashboardContextProps {
    state: DashboardState;
    ipcRenderer: any;
    appendLogs: (entry: DashboardEntry, logs: string) => void;
    clearLogs: (entry: DashboardEntry) => void;
    setIsStarted: (entry: DashboardEntry, isStarted: boolean) => void;
    setExpanded: (entry: DashboardEntry, expanded: boolean) => void;
}



export const DashboardContext = createContext<DashboardContextProps>(
    {} as DashboardContextProps
    );

export const useDashboardContext = () => useContext(DashboardContext);

const initialState = () : DashboardState => {
    const dashboardState: DashboardState = {};
    Object.values(DashboardEntry).forEach((entry) => {
        dashboardState[entry] = {
            logs: "",
            isStarted: false,
            expanded: false,
        };
    });

    return dashboardState;
}


interface DashboardProviderProps {
    children: ReactNode;
  }

const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
    const [dashboardState, setDashboardState] = useState<DashboardState>(initialState())

    const ipcRenderer = (window as any).ipcRenderer

    console.log(dashboardState)

    const appendLogs = useCallback((entry: DashboardEntry, logs: string) => {
        setDashboardState((prev) => ({
            ...prev,
            [entry]: {
                ...prev[entry],
                logs: prev[entry].logs.length > 1000 ? logs : `${prev[entry].logs}${logs}`,
            },
        }));
    }, []);

    const clearLogs = useCallback((entry: DashboardEntry) => {
        setDashboardState((prev) => ({
            ...prev,
            [entry]: {
                ...prev[entry],
                logs: "",
            },
        }));
    }, [setDashboardState]);

    const setIsStarted = useCallback((entry: DashboardEntry, isStarted: boolean) => {
        setDashboardState((prev) => ({
            ...prev,
            [entry]: {
                ...prev[entry],
                isStarted,
            },
        }));
    }, [setDashboardState]);

    const setExpanded = useCallback((entry: DashboardEntry, expanded: boolean) => {
        setDashboardState((prev) => ({
            ...prev,
            [entry]: {
                ...prev[entry],
                expanded,
            },
        }));
    }, [setDashboardState]);

    useEffect(() => {
        Object.values(DashboardEntry).forEach((entry) => {
            const dataChannel = `${entry}-data`;
            
            ipcRenderer.on(dataChannel, (event: any, arg: any) => {
                console.log("from listener")
                console.log(arg)
                appendLogs(entry, arg);
            });

            return () => {
                ipcRenderer.removeAllListeners(dataChannel);
            };
        });
        
    }, []);

    return (
        <DashboardContext.Provider value={{
            state: dashboardState,
            ipcRenderer,
            appendLogs,
            clearLogs,
            setIsStarted,
            setExpanded,
        }}>
            {children}
        </DashboardContext.Provider>
    );
};

export default DashboardProvider;