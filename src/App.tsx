import { useState } from "react";
import Modal from "react-modal";

import { TransactionsProvider } from "./hooks/useTransactions";

import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTrasactionModal } from "./components/NewTrasactionModal";

import { GlobalStyle } from "./styles/global";

Modal.setAppElement('#root');

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <TransactionsProvider>
      <GlobalStyle />
      <Header
        onOpenNewTrasactionModal={handleOpenNewTransactionModal}
      />
      <Dashboard />
      <NewTrasactionModal 
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </TransactionsProvider>
  );
}
