import React from "react";
import {GraphQLClient} from 'graphql-request'
import {GoogleLogin} from 'react-google-login'
import { withStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";

const ME_QUERY=`
{
  me{
    _id
    name
    picture
    email
  }
}
`

const Login = ({ classes }) => {
  const onSuccess= async googleUser=>{
    const idToken =  googleUser.getAuthResponse().id_token
    console.log({idToken})
    const client = new GraphQLClient('http://localhost:4000/graphql',
    {
      headers:{authorization:idToken}
    })
    const data = await client.request(ME_QUERY)
    console.log({data})
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
