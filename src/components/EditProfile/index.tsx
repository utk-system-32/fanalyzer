import { api } from '../../utils/api'
import { FunctionComponent, useState } from 'react';
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Image from "next/image"
import { encode as base64Encode } from "base64-arraybuffer";

interface User {
  username: string;
  image: string;
}

const EditProfile: FunctionComponent = () => {
  const { data: sessionData } = useSession();

  const res = api.user.getUserByID.useQuery(sessionData?.user?.id);

  const [user, setUser] = useState<User>({
    username: res.data?.username,
    image: res.data?.image,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const updateUserMutation = api.user.updateUser.useMutation();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSuccess("")
    setError("")
    const file = e.target.files[0];
    if (file) {
      const buffer = await file.arrayBuffer();
      const base64 = base64Encode(buffer);
      setUser({ ...user, image: base64 });
    }
  };

  const handleUpdateUser = async () => {
    updateUserMutation.mutate(user);
    //router.reload();
    try {
      await updateUserMutation.mutateAsync(user, {
        onSuccess: () => {
            setSuccess("Changes successfully saved.");
        },
      });
    }
    catch (error) { // TODO: Custom error messages for error on username vs image upload
      setError("Error saving changes.")
}   
  }

  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-2xl mb-5">Edit Profile</h1>
      <label htmlFor="file" className="hover:cursor-pointer">
        <Image
          src={user.image?.startsWith("https") ? user.image : `data:image/png;base64,${user.image}`}
          width={100}
          height={100}
          className="h-[100px]  w-[100px]"
          alt="Upload profile picture"
        />
        Choose image (cannot exceed 1 MB)
      </label>
      <input
        id="file"
        type="file"
        accept=".jpg,.jpeg,.png"
        hidden
        onChange={handleFileChange}
      />
      <label htmlFor="username" className="font-bold mt-2">Username</label>
      <input
        id="username"
        className={error ? "mt-2 rounded-md border border-red-600 p-2" : "mt-2 rounded-md border p-2"}
        type="text"
        placeholder="username"
        value={user.username}
        onChange={(e) => setUser({...user, username: e.target.value})}
      />
      {error && <div className="text-red-600">{error}</div>}
      {success && <div className="mt-2 text-green-600">{success}</div>}
      <button 
      onClick={handleUpdateUser}
      className="text-bold mt-5 mb-1 self-center w-full rounded-md bg-[#ff8200] p-5 text-lg text-white shadow-md duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#ff8200]/[0.9]"
      >
        Save Changes</button>
    </div>
  )
}

export default EditProfile;
