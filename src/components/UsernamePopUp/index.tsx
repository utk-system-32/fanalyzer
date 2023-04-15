import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { api } from '../../utils/api'

const MyPage = () => {
  const { data: sessionData } = useSession();
  const userQuery = api.user.getUserByID.useQuery(sessionData?.user?.id);


  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [username, setUsername] = useState();
  const [error, setError] = useState("");

  

  useEffect(() => {
    setIsPopupOpen(userQuery.data?.username === null);
  }, [userQuery.data?.username]);

  const createUsernameMutation = api.user.updateUsername.useMutation();

  const handleCreateUsername = async () => {
    try {
          await createUsernameMutation.mutateAsync(username, {
            onSuccess: () => {
                setIsPopupOpen(false);
            },
          });
        }
    catch (error) {
        setError("Username is already taken.")
    }    
  }

  return (
    <div>
      {isPopupOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="flex min-h-[300px] w-full max-w-[600px] flex-col rounded-md bg-white p-5 shadow-lg">
                <h1 className="text-center text-3xl font-bold">
                Create Username for Fanalyzer
                </h1>
                <label className="mt-5" htmlFor="username">
                Username
                </label>
                <input
                type="text"
                className={error ? "mt-2 rounded-md border border-red-600 p-2" : "mt-2 rounded-md border p-2"}
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                {error && <div className="text-red-600">{error}</div>}
                <button
                onClick={handleCreateUsername}
                className="text-bold mt-auto mb-1 w-full rounded-md bg-[#ff8200] p-5 text-lg text-white shadow-md duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#ff8200]/[0.9]"
                >
                Register
                </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;
