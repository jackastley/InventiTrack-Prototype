

export default function Logout(){
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "http://" + process.env.REACT_APP_EXTERNAL_IP + ":3000/login";
}