import { Navigate } from "react-router-dom";
import useMe from "../hooks/useMe";
import { useStatusModalStore } from "../store/modal-store";
import StatusModal from "../components/StatusModal";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useMe();
  const { showLoading, closeModal } = useStatusModalStore();

  useEffect(() => {
    if (loading) {
      showLoading("Validando sessão...");
    } else {
      closeModal();
    }
  }, [loading, showLoading, closeModal]);

  if (loading) {
    return <StatusModal />;
  }

  return user ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
