import { useHistory } from 'react-router-dom'

const useNavigate = cb => {
  const history = useHistory()

  return (to, data) => {
    if (to === -1) {
      history.goBack()
    } else {
      history.push(to)
      cb(data)
    }
  }
}

export default useNavigate
