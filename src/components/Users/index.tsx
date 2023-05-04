import { FunctionComponent } from 'react';
import { api } from '../../utils/api'
import Link from "next/link"
import Image from "next/image"

const Users: FunctionComponent = (search) => { 
    const userQuery = api.user.getSearchUsers.useQuery(search.search);
    
    if (userQuery.isLoading) {
      return <div></div>
    }
  return (
    <div>
      {userQuery.data?.length < 1 ? <div>No Users Found.</div>
      : userQuery.data?.map((user) => {
        return (
          <article key={user.id}>
            <div className='flex h-[40px] py-2 px-2'>
              <Link href={`/explore/${user.username}`} className="flex flex-row">
                <Image
                  src={user.image.startsWith("https") ? user.image : `data:image/png;base64,${user.image}`}
                  width={30}
                  height={30}
                  className="h-[30px]  w-[30px] rounded-full"
                  alt={`${user.username}'s profile picture`}
                />
                <div className="px-2 font-semibold text-xl">{user.username}
                </div>
              </Link>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default Users;