// Import required dependencies:

// React
import React from "react";

export interface ImyModalProps {
  show: boolean;
  handleShowModal: () => void;
  title: string;
  children: React.ReactNode;
}
