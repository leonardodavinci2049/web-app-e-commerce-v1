"use client";

import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

type SearchHandler = (query: string) => void;

interface TableSearchContextValue {
  inputValue: string;
  setInputValue: (value: string) => void;
  submitSearch: () => void;
  resetInput: () => void;
  clearSearch: () => void;
  registerSearchHandler: (handler: SearchHandler) => () => void;
}

const noop: SearchHandler = () => {};

const TableSearchContext = createContext<TableSearchContextValue | undefined>(
  undefined,
);

export function TableSearchProvider({ children }: { children: ReactNode }) {
  const [inputValue, setInputValue] = useState("");
  const handlerRef = useRef<SearchHandler>(noop);

  const registerSearchHandler = useCallback((handler: SearchHandler) => {
    handlerRef.current = handler;
    return () => {
      handlerRef.current = noop;
    };
  }, []);

  const submitSearch = useCallback(() => {
    const normalizedValue = inputValue.trim();
    handlerRef.current(normalizedValue);
  }, [inputValue]);

  const resetInput = useCallback(() => {
    setInputValue("");
  }, []);

  const clearSearch = useCallback(() => {
    setInputValue("");
    handlerRef.current("");
  }, []);

  const value = useMemo(
    () => ({
      inputValue,
      setInputValue,
      submitSearch,
      resetInput,
      clearSearch,
      registerSearchHandler,
    }),
    [inputValue, registerSearchHandler, resetInput, submitSearch, clearSearch],
  );

  return (
    <TableSearchContext.Provider value={value}>
      {children}
    </TableSearchContext.Provider>
  );
}

export function useTableSearch() {
  const context = useContext(TableSearchContext);

  if (!context) {
    throw new Error("useTableSearch must be used within a TableSearchProvider");
  }

  return context;
}
