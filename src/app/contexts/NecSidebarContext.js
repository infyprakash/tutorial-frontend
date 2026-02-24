"use client";

import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export function NecSidebarProvider({ children }) {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    return (
        <SidebarContext.Provider value={{ mobileSidebarOpen, setMobileSidebarOpen }}>
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
}