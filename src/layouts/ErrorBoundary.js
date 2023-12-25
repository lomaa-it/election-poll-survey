import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  async componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service or perform other actions
    console.error("Error caught by error boundary:", error, errorInfo);

    // Set the state to trigger a re-render with the error UI
    await this.setState({ hasError: true });

    // Perform any other actions needed after catching the error
    // e.g., navigate to an error page
    // this.props.history.push("/error");
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
