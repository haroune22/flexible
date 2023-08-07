import { getUserProjects } from '@/lib/actions'
import { UserProfile } from '@/Common.types';
import ProfilePage from '@/Components/ProfilePage';


type Props = {
    params: {
        id: string,
    },
}
const Profile =  async ({ params }: Props) => {
    const result = await getUserProjects(params.id, 100) as { user: UserProfile }
    if (!result?.user) return (
        <p className="no-result-text">Failed to fetch user info</p>
    )

    return <ProfilePage user={result?.user}  />
}


export default Profile