import React, { createContext, useContext, useState, useEffect } from 'react';

const CompareContext = createContext();

export const useCompare = () => useContext(CompareContext);

export const CompareProvider = ({ children }) => {
  const [compareItems, setCompareItems] = useState(() => {
    const savedCompare = localStorage.getItem('compare');
    return savedCompare ? JSON.parse(savedCompare) : [];
  });

  useEffect(() => {
    localStorage.setItem('compare', JSON.stringify(compareItems));
  }, [compareItems]);

  const addToCompare = (product) => {
    if (compareItems.find((item) => item.id === product.id)) {
      removeFromCompare(product.id);
      return;
    }
    if (compareItems.length >= 4) {
      alert("You can only compare up to 4 items.");
      return;
    }
    setCompareItems((prev) => [...prev, product]);
  };

  const removeFromCompare = (id) => {
    setCompareItems((prev) => prev.filter((item) => item.id !== id));
  };

  const isInCompare = (id) => {
    return compareItems.some((item) => item.id === id);
  };

  const clearCompare = () => {
    setCompareItems([]);
  };

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};
