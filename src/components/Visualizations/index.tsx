import { FunctionComponent, useState, useEffect } from 'react';
import { api } from '../../utils/api'
import Image from 'next/image';
import Link from "next/link"
import DeleteVisualization from "src/components/DeleteVisualization"

const Visualizations: FunctionComponent = (mode) => { 

  const visualizationQuery = api.visualization.getUserVisualizations.useQuery("");

  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteVisId, setDeleteVisId] = useState("");
  const [delIcon, setDelIcon] = useState([]); 

  useEffect(() => {
    if (visualizationQuery.data) {
      const newDelIcon = Array(visualizationQuery.data.length).fill("/delete.svg");
      setDelIcon(newDelIcon);
    }
  }, [visualizationQuery.data]);

  if (visualizationQuery.isLoading) {
    return <Image src="/loading.gif" width={30} height={30} alt="Loading..."/>;
  }

  
  return (
    <>
    {deletePopup ? <DeleteVisualization popupOpen={deletePopup} setPopupOpen={setDeletePopup} visId={deleteVisId}/> : null}
    <div className={visualizationQuery.data?.length > 1 ? `grid grid-cols-2 gap-8` : ""}>
      {visualizationQuery.data?.length > 1 ? visualizationQuery.data?.map((visualization, index) => {
        const svgDataUri = `data:image/svg+xml;base64,${Buffer.from(visualization.data).toString('base64')}`;
        return (
          <article key={visualization.id} className="">
            <Image src={svgDataUri} alt="My SVG" width={400} height={400} />
            <button 
                    className="float-right flex flex-row mt-5 mb-2 hover:text-red-600" 
                    onMouseOver={() => { const newDelIcon = [...delIcon]; newDelIcon[index] = "/delete_red.svg"; setDelIcon(newDelIcon);}} 
                    onMouseOut={() => { const newDelIcon = [...delIcon]; newDelIcon[index] = "/delete.svg"; setDelIcon(newDelIcon);} }
                    onClick={() => { {setDeletePopup(true); setDeleteVisId(visualization.id)}}}>
                    <Image
                      src={delIcon[index]}
                      width={25}
                      height={25}
                      alt="Delete image"
                      className="h-[25px]  w-[25px]"
                    />
                    Delete Visualization
            </button>
          </article>
        )
      })
    :
    <div className="flex flex-col items-center">
      No visualizations yet, create one now or view our documentation:
      <Link
        href="/tool"
        className="mx-3 mt-4 w-1/2 text-center rounded-md bg-[#ff8200] p-2 font-semibold text-white shadow-md duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#ff8200]/[0.9]"
      >
        Create Visualization
      </Link>
      <Link
        href="/dashboard/documentation"
        className="mx-3 mt-4 w-1/2 text-center rounded-md bg-[#ff8200] p-2 font-semibold text-white shadow-md duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#ff8200]/[0.9]"
      >
        Documentation
      </Link>
     </div>}
    </div>
    </>
  )
}

export default Visualizations;