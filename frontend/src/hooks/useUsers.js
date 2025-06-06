import { useUserContext } from '../context/UserContext';

const useUsers = () => {
  const { users, loading } = useUserContext();
  return { users, loading };
};

export default useUsers;
