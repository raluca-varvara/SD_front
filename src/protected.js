import { Navigate } from "react-router-dom";
const Protected = ({role, children }) => {
  const data = window.localStorage.getItem('MY_APP_STATE');

  let user = null;
  if ( data !== null ) user = JSON.parse(data);
  console.log(user)
  console.log(role)
  
  if(user === null){
    console.log("de ce mama ta nu de modifici")
    return <Navigate to="/" replace />;
  }
  else if (user.role === role) {
    console.log("e bine")
    return children;
  }
  else{
    console.log("nu e bine")
    return <Navigate to="/" replace />;
  }
  
};
export default Protected;