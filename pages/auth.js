import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppContext } from '/utils/Context.jsx'
import Cookies from 'js-cookie';

export default function Auth() {
    const router = useRouter()
    const context = useAppContext();
    const { clientId, stateKey, redirectUri } = context

    useEffect(() => {
     const hash = router.asPath.split('#')[1];
     const access_token = hash.split('&')[0].split('=')[1];
     const state = hash.split('&')[3].split('=')[1];
     const storedState = localStorage.getItem(stateKey);
     Cookies.set('token', access_token)
     Cookies.set('state', state)
     //NOT USED - const token_type = hash.split('&')[1].split('=')[1];
     //NOT USED - const expires_in = hash.split('&')[2].split('=')[1];

    if (access_token && (state == null || state !== storedState)) {
        alert('Authentication error, please retry');
        router.push("/")
    } else {
        localStorage.removeItem(stateKey);
        if (access_token) {
           request()
        }
    }
    async function request() {
      const response = await fetch("https://api.spotify.com/v1/me", {
          method: 'GET',
          headers: {
              "Authorization": "Bearer " + access_token
          }
      })
      const data = await response.json()
      const user = data.display_name
      Cookies.set('user', user)
      router.push('/dashboard')
      //document.getElementById("user").value = user;
      //document.querySelector("#login").style.display = "none"
      //document.querySelector("#loggedin").style.display = "block"
      //displayPlaylists()
  }
    }),[];

  return null
}