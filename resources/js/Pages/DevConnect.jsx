import UserPreviewCard from "@/Components/UserPreviewCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function DevConnectPage({ auth }) {
      const [users, setUsers] = useState([]);
      const [hasMore, setHasMore] = useState(true);
      const [pageNumber, setPageNumber] = useState(1);

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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >

        <Head title="Dev Connect" />

        <div className="w-[60%] mx-auto h-screen">
            <div className="h-screen overflow-scroll" onScroll={handleScroll}>
                {users.map(user => {
                    return <UserPreviewCard user={user} auth={auth} />
                })}
            </div>
        </div>

        </AuthenticatedLayout>
    );
}
