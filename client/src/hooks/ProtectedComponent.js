import React from "react";
import useAuth from './useAuth'
const ProtectedComponent = () => {
  const isAuthenticated = useAuth();

  if(!isAuthenticated){
      return <div>Loading...</div>
  }

  return {
      <div>
          <h1>Protected Content</h1>
          <p>This content is only available to authenticated users.</p>
      </div>
  }
}

export default ProtectedComponent;
