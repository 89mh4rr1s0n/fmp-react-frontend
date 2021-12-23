import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [showPassword, setShowPassword] = useState(false)
  const [pwordVal, setPwordVal] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/profile")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  //console.log(pwordVal.length)

  return (
    <>
      <Card style={{marginTop: "90px"}}>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" style={{paddingBottom: "30px"}}>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password" style={{paddingBottom: "30px", borderRightWidth: "0px"}}>
              <Form.Label>Password</Form.Label>
              <div 
              className="d-flex" 
              style={{width: "100%", height: "38px", border: "1px solid #ced4da", borderRadius: "0.25rem"}}>
                <input 
                style={{padding: "6px 12px 6px 12px", border: "none", width: "100%"}} 
                type={showPassword ? "text" : "password"} 
                ref={passwordRef} 
                required 
                onChange={(e) => setPwordVal(e.target.value)}/>
                {pwordVal.length > 0 ? 
                <button type="button"
                className=" btn btn-light" onClick={() => setShowPassword((prevState) => !prevState)}>
                  {showPassword === false ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </button>
                : <div></div>}
                
              </div>
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  )
}