import { createContext, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [project, setProject] = useState(0);

  return <AuthContext.Provider value={{ user, setUser, project, setProject }}>{children}</AuthContext.Provider>;
};

// Add PropTypes validation for children
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};
