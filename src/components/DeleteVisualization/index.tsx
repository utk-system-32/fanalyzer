import { api } from '../../utils/api'
import { FunctionComponent, useState, useEffect } from 'react';
import { useRouter } from "next/router";
import Image from "next/image";

interface Props {
  popupOpen: boolean;
  setPopupOpen: (popupOpen: boolean) => void;
  visId: string;
}

const DeleteVisualization: FunctionComponent<Props> = ({ popupOpen, setPopupOpen, visId }) => {

  const router = useRouter();

  const deleteVisMutation = api.visualization.deleteVisualization.useMutation();

  const handleDeleteVis = async () => {
    await deleteVisMutation.mutateAsync(visId);
    setPopupOpen(false);
    router.reload();
  }

  return (
    <div>
      {popupOpen && (
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
            <div className="flex min-h-[100px] w-full min-w-[100px] flex-col rounded-md bg-white p-5 shadow-lg">
              <div className="flex flex-col">
                <h1 className="text-2xl mb-5">Are you sure you want to delete this visualization?</h1>
                <div className="flex flex-row space-x-2">
                    <button
                    onClick={() => setPopupOpen(false)}
                    className="text-bold mt-auto mb-1 w-1/2 self-center rounded-md bg-gray-600 p-5 text-lg text-white shadow-md duration-300 ease-in-out hover:-translate-y-1 hover:bg-gray-600/[0.9]"
                    >
                    Cancel
                    </button>
                    <button
                    onClick={handleDeleteVis}
                    className="text-bold mt-auto mb-1 w-1/2 self-center rounded-md bg-red-600 p-5 text-lg text-white shadow-md duration-300 ease-in-out hover:-translate-y-1 hover:bg-red-600/[0.9]"
                    >
                    Delete Visualization
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );  
}

export default DeleteVisualization;