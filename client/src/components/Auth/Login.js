import React from "react";
import {GoogleLogin} from 'react-google-login'
import { withStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";

const Login = ({ classes }) => {
  const onSuccess=googleUser=>{
    const idToken = googleUser.getAuthResponse().id_token
    console.log(idToken)
  }
  const onFailure=err=>{
    console.log({err})
  }
  return <GoogleLogin
  clientId="665865701772-h38bchhr4lefc1mjnt10c3qtn8g29obv.apps.googleusercontent.com"
  onSuccess={onSuccess}
  onFailure ={onFailure}
  isSignedIn={true}
  />
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default withStyles(styles)(Login);
