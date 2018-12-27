import React from 'react';


const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>The info is: { props.info }</p>
  </div>
);

const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <dir>
      { props.isAdmin && <p>This is private info. Please don't share!</p> }
      <WrappedComponent { ...props }/>
    </dir>
  );
};

const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <dir>
      { props.isAuthenticated ? <WrappedComponent { ...props }/> : <p>Sorry, you're not authorized to access this info.</p> } 
    </dir>
  );
}

// const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

export default AuthInfo;