import ProfileComponent from "@/Components/ProfileComponent";
import UserPreviewCard from "@/Components/UserPreviewCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DevConnectPage({ auth }) {
      const [users, setUsers] = useState([]);
      const [hasMore, setHasMore] = useState(true);
      const [pageNumber, setPageNumber] = useState(1);
      const [isViewingProfile, setIsViewingProfile] = useState(false);
      const [userForProfile, setUserForProfile] = useState([]);

      const toggleSetIsViewingProfile = () => {
        isViewingProfile ? setIsViewingProfile(false) : setIsViewingProfile(true);
      }

      const handleShowProfile = (user) => {
        if (userForProfile.length == 0) toggleSetIsViewingProfile();

        setUserForProfile(user);
      }

      const handleCloseProfile = () => {
        setIsViewingProfile(false);

        setUserForProfile([]);
      }

      const loadUsers = () => {
        axios.get(`${route('load-users')}?page=${pageNumber}`)
        .then(res => {
            setUsers(users => [...users, ...res.data.data.users.data]);
            if (pageNumber === res.data.data.users.last_page) setHasMore(false);
            setPageNumber(pageNumber + 1)
        })
        .catch(error => console.log(error));
      }

      useEffect(() => {
        loadUsers()
      }, [])

      const handleScroll = (e) => {
        if ((e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) && hasMore) {
            loadUsers()
        }
      }

    return(
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">DevConnect</h2>}
        >

        <Head title="Dev Connect" />

        <div className="flex">
            <div className={`w-[60%] h-screen ${isViewingProfile ? '' : 'mx-auto'}`}>
                <div className="h-screen overflow-y-scroll no-scrollbar" onScroll={handleScroll}>
                    {users.map(user => {
                        return <UserPreviewCard key={user.id} user={user} auth={auth} handleShowProfile={handleShowProfile} highlight={userForProfile.id == user.id} />
                    })}
                </div>
            </div>

            {isViewingProfile &&
                <ProfileComponent handleCloseProfile={handleCloseProfile} user={userForProfile} className={'text-black w-[40%] h-screen p-4'} />
            }
        </div>

        </AuthenticatedLayout>
    );
}
