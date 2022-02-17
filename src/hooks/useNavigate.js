import { useHistory, useLocation } from 'react-router-dom'

const useNavigate = cb => {
  const history = useHistory()
  const location = useLocation()

  return (to, data) => {
    if (to === -1) {
      history.goBack()
    } else {
      cb(data, location)
      history.push(to)
    }
  }
}

export default useNavigate
