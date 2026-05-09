import { useState } from 'react'
import API from '../api/api'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleLogin = async (e: any) => {
    e.preventDefault()

    try {
      const res = await API.post('/auth/login', {
        email,
        password,
      })

      localStorage.setItem('token', res.data.token)
      localStorage.setItem(
  'user',
  JSON.stringify(res.data.user)
)

      alert('Login Successful')

      navigate('/dashboard')
    } catch (err) {
      alert('Login Failed')
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h1 className="text-3xl font-bold mb-5 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          className="border p-2 w-full mb-4 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="border p-2 w-full mb-4 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-black text-white w-full py-2 rounded">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login