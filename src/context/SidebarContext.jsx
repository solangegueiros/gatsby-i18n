import React, { createContext, useContext, useState, useEffect } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [openFolders, setOpenFolders] = useState({});

  // Load from localStorage (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("openFolders");
      if (saved) {
        setOpenFolders(JSON.parse(saved));
      }
    }
  }, []);

  // Save to localStorage when openFolders changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("openFolders", JSON.stringify(openFolders));
    }
  }, [openFolders]);

  const toggleFolder = (folder) => {
    setOpenFolders(prev => ({
      ...prev,
      [folder]: !prev[folder]
    }));
  };

  return (
    <SidebarContext.Provider value={{ openFolders, toggleFolder }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
