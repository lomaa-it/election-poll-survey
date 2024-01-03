import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { showAlert } from "../actions/alert";
import { authLogout } from "../actions/auth";

const ProtectedRoute = ({ type, auth, showAlert, authLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    var now = new Date();
    const timeDifference = Math.max(0, (auth.user?.expiry || 0) - now.getTime());

    const timeoutId = setTimeout(() => {
      authLogout();
      navigate("/logout", { replace: true });
    }, timeDifference);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return auth.isAuthenticated && type?.includes(auth.user?.desgination_name) ? <Outlet /> : <Navigate to="/logout" replace />;
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { showAlert, authLogout })(ProtectedRoute);
