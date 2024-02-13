export const followUser = (user) => {
    axios.post(route('follow-user'), {
        user_id: user.id,
    })
    .then(res => console.log(res))
    .catch(error => console.log(err))
}

// export const unFollowUser = (user) => {
//     axios.post(route(), {
//         user_id:
//     })
// }
