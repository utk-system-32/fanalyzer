import { api } from '../../utils/api'
import { FunctionComponent, useState } from 'react';
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

interface User {
  username: string;
  image: any;
}

const EditProfile: FunctionComponent = () => {
  const { data: sessionData } = useSession();

  const res = api.user.getUserByID.useQuery(sessionData?.user?.id);

  const [user, setUser] = useState<User>({
    username: res.data?.username,
    image: null,
  });
  const router = useRouter();

  const updateUserMutation = api.user.updateUser.useMutation();
  

  const handleUpdateUser = () => {
    updateUserMutation.mutate(user);
    //router.reload();
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl mb-5">Edit Profile</h1>
      <input
        className="mb-5"
        type="text"
        placeholder="username"
        value={user.username}
        onChange={(e) => setUser({...user, username: e.target.value})}
      />
      <input
        className="mb-5"
        type="file"
        onChange={(e) => { 
          setUser({...user, image: e.target.files[0]})
        }}
      />
      <button 
      onClick={handleUpdateUser}
      className="text-bold mt-auto mb-1 self-center w-100 rounded-md bg-[#ff8200] p-5 text-lg text-white shadow-md duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#ff8200]/[0.9]"
      >
        Save Changes</button>
    </div>
  )
}

export default EditProfile;



