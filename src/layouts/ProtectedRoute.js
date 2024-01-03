import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { showAlert } from "../actions/alert";
import { authLogout } from "../actions/auth";

const ProtectedRoute = ({ type, auth, showAlert, authLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set session variable
    sessionStorage.setItem("user", JSON.stringify(auth.user));

    // Set session timeout
    const timeoutID = setTimeout(() => {
      sessionStorage.removeItem("user");
      authLogout();
      showAlert({ text: "Session Time-Out", color: "error" });
      navigate("/login"); // Redirect to login page
    }, 30 * 60 * 1000); // 30 minutes timeout

    return () => {
      clearTimeout(timeoutID);
    };
  }, [auth.user, navigate]);

  // return <Outlet />;
  return auth.isAuthenticated && type?.includes(auth.user?.desgination_name) ? <Outlet /> : <Navigate to="/404" replace />;
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { showAlert, authLogout })(ProtectedRoute);
