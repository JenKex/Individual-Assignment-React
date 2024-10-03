import './LoginPage.css'

const LoginPage = () =>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)
    const [nameTouched, setNameTouched] = useState(false)
    const [passwordTouched, setPasswordTouched] = useState(false)
    let navigate = useNavigate()

    function handleLogin(){
        if (username === 'admin' && password === 'password'){
            setLoggedIn(true)
            navigate('/Administration', { replace: true })
        }
    }

    return <section className="login-section">
        <div className="login-card">
        {/* <label> Användarnamn: */}
            <input type="text"
            placeholder="Användarnamn..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={() => setNameTouched(true)}/>
        {/* </label> */}
        {/* <label> Lösenord: */}
            <input type="password"
            placeholder="Lösenord..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setPasswordTouched(true)}/>
        {/* </label> */}
        <button onClick={handleLogin}>Logga in</button>
    </div>
    </section>
}

export default LoginPage