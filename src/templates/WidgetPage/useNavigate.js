import {
  useHistory,
  //useLocation,
} from 'react-router-dom'

const useNavigate = () => {
  const history = useHistory()
  //const location = useLocation()

  return (to, data) => {
    if (to === -1) {
      history.goBack()
    } else {
      history.push(to)
      // TODO: save data
    }
  }
}

export default useNavigate
