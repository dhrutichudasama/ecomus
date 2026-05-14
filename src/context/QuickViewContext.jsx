import React, { createContext, useContext, useState } from 'react';

const QuickViewContext = createContext();

export const useQuickView = () => useContext(QuickViewContext);

export const QuickViewProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const openQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setTimeout(() => setSelectedProduct(null), 300); // Wait for exit animation
  };

  return (
    <QuickViewContext.Provider
      value={{
        selectedProduct,
        isQuickViewOpen,
        openQuickView,
        closeQuickView,
      }}
    >
      {children}
    </QuickViewContext.Provider>
  );
};
