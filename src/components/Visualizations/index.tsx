import { FunctionComponent } from 'react';
import { api } from '../../utils/api'
import Image from 'next/image';

const Posts: FunctionComponent = (mode) => { 

  const visualizationQuery = api.visualization.getUserVisualizations.useQuery("");

  if (visualizationQuery.isLoading) {
    return <p>Loading...</p>;
  }

  
  return (
    <div>
      {visualizationQuery.data?.map((visualization) => {
        const svgDataUri = `data:image/svg+xml;base64,${Buffer.from(visualization.data).toString('base64')}`;
        return (
          <article key={visualization.id}>
            <Image src={svgDataUri} alt="My SVG" width={400} height={400} />
          </article>
        )
      })}
    </div>
  )
}

export default Posts;