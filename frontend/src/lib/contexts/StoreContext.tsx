'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface StoreContextType {
  storeId: string;
  setStoreId: (id: string) => void;
  isLoading: boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [storeId, setStoreIdState] = useState<string>('store_001');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedStore = localStorage.getItem('eCom_store_id');
    if (savedStore) {
      setStoreIdState(savedStore);
    }
    setIsLoading(false);
  }, []);

  const setStoreId = (id: string) => {
    setStoreIdState(id);
    localStorage.setItem('eCom_store_id', id);
  };

  return (
    <StoreContext.Provider value={{ storeId, setStoreId, isLoading }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
