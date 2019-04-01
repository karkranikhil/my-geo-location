import React, {useContext} from "react";
import {GraphQLClient} from 'graphql-request'
import {GoogleLogin} from 'react-google-login'
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Context from '../../context'
import { dark } from "@material-ui/core/styles/createPalette";
import {ME_QUERY} from '../../graphql/queries'
import { BASE_URL } from "../../client";

const Login = ({ classes }) => {
  const {dispatch} = useContext(Context)
  const onSuccess= async googleUser=>{
    try{
      const idToken =  googleUser.getAuthResponse().id_token
      const client = new GraphQLClient(BASE_URL,
      {
        headers:{authorization:idToken}
      })
      const {me} = await client.request(ME_QUERY)
      dispatch ({type:'LOGIN_USER', payload:me})
      dispatch({type:"IS_LOGGED_IN",payload:googleUser.isSignedIn()})
    } catch(err){
      onFailure(err)
    }
    
  }
  const onFailure=err=>{
    console.error("Error logging in ", err)
  }
  return (
    <div className={classes.root}>
    <Typography
      component="h1"
      variant="h3"
      gutterbutton ="true"
      noWrap
      style={{color:"rgb(66, 133, 244)"}}>Welcome</Typography>
        <GoogleLogin
      clientId="665865701772-h38bchhr4lefc1mjnt10c3qtn8g29obv.apps.googleusercontent.com"
      onSuccess={onSuccess}
      onFailure ={onFailure}
      isSignedIn={true}
      theme="dark"
      buttonText="Login with Google"
      />
    </div>
  )
  
  
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
