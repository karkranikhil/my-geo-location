import React, {useContext} from "react";
import {GraphQLClient} from 'graphql-request'
import {GoogleLogin} from 'react-google-login'
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Context from '../../context'
import {ME_QUERY} from '../../graphql/queries'
import { BASE_URL } from "../../client";
import {unstable_useMediaQuery as useMediaQuery} from '@material-ui/core/useMediaQuery' 
const Login = ({ classes }) => {
  const {dispatch} = useContext(Context)
  const mobileSize = useMediaQuery('(max-width:650px)')
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
    dispatch({type:"IS_LOGGED_IN",payload:false})
  }
  return (
    <div className={classes.root}>
      <div className={classes.loginbox}>
        <div className={classes.welcomeMsg}>
        <Typography
          component={mobileSize ? "body1":"h1"}
          variant={mobileSize ? "subtitle2":"h3"}
          gutterbutton ="true"
          noWrap
          style={{color:"#fff",marginBottom: "10%"}}>Welcome to Pin my visit</Typography>
            <GoogleLogin
          clientId="665865701772-h38bchhr4lefc1mjnt10c3qtn8g29obv.apps.googleusercontent.com"
          onSuccess={onSuccess}
          onFailure ={onFailure}
          isSignedIn={true}
          theme="dark"
          buttonText="Login with Google"
          />
          </div>
        </div>
    </div>
  )
  
  
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    backgroundImage: "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/slider-2.jpg')",
    backgroundSize: "cover",
  },
  loginbox:{
    background: "linear-gradient(to bottom, rgba(146, 135, 187, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%)",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "200px",
    padding: "2%",
    boxShadow: "0px 0px 20px #f7f7f7"
  },
  welcomeMsg:{
    color: "rgb(255, 255, 255)",
    textAlign:"center"
  }
};

export default withStyles(styles)(Login);
