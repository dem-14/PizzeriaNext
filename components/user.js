import { get, del } from 'idb-keyval';
import Router from 'next/router'
import { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
export default function User() {

    const [user, setUser] = useState(null);
    useEffect(() => {
        async function fethUser(){
            setUser(await get('user'));
        }
        fethUser();
    },[user])

    function handleSigin(ev) {
        ev.preventDefault();
        Router.push('/login')

    }
    async function handleLogout(ev) {
        ev.preventDefault();
        await fetch(`/api/logout`, {
            method: 'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({refreshToken:user.refreshToken})
        })
        await del('user');
        setUser(null);
    }
    if (user)
        return (
            <>
                <div>{user.name}</div>
                <form onSubmit={handleLogout}>
                    <Button type="submit" color="inherit">Sign off</Button>
                </form>
            </>
        )
    return (
        <>
            <form onSubmit={handleSigin}>
                <Button type="submit" color="inherit">Sign in</Button>
            </form>
        </>
    )
}