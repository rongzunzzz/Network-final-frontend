import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provide } from "../../config/firebase";
import SignIn from "../SignIn.js";
import axios from "../../api.js";
const useGoogle = () => {
  const handleLoginGoogle = async () => {
    const provider = provide;
    const Auth = auth
    signInWithPopup(Auth, provider)
      .then(async result => {
        const user = result.user;
        console.log(user);
        console.log(user.displayName)
      })
      .catch(error => {
        console.log(error);
      });
  };

  return { handleLoginGoogle };
};
export default useGoogle;