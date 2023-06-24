import { useState, useEffect } from 'react';
import { testPrivateAPI } from 'api/api';

type UserDataType = {
  email: string;
  id: number;
  username: string;
};

function Shawarma(): JSX.Element {
  const [countAction, setCountAction] = useState(0);
  const [action, setAction] = useState(false);
  const [users, setUsers] = useState<UserDataType[]>([]);
  useEffect(() => {
    const idInterval = setInterval(() => {
      setAction((prevState) => !prevState);
      setCountAction((prevState) => prevState + 1);
    }, 10000);
    return () => {
      clearInterval(idInterval);
    };
  }, []);
  useEffect(() => {
    async function asyncCall() {
      const result = await testPrivateAPI.test();
      setUsers(result.data);
    }
    asyncCall().catch((error) => console.log(error));
  }, [action]);
  console.log(action);
  const refresh = localStorage.getItem('refresh');
  return (
    <div>
      <h2>Это страница журнала!</h2>
      {users.map((item) => (
        <div key={item.id}>
          user. email={item.email} id={item.id} username={item.username}
        </div>
      ))}
      <span>refresh = {refresh}</span>
      <br />
      <span>countAction = {countAction}</span>
    </div>
  );
}

export default Shawarma;
