import { FunctionComponent } from 'react';
import { api } from '../../utils/api'
import Link from "next/link"

const Users: FunctionComponent = (search) => { 
    const userQuery = api.user.getSearchUsers.useQuery(search.search);
    
    if (userQuery.isLoading) {
      return <p>Loading...</p>
    }
  return (
    <div>
      {userQuery.data?.length < 1 ? <div>No results found.</div>
      : userQuery.data?.map((user) => {
        return (
          <article key={user.id}>
            <Link href={`/explore/${user.username}`}className="font-bold">{user.username}</Link>
          </article>
        )
      })}
    </div>
  )
}

export default Users;