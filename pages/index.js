import { useSession, signIn, signOut } from "next-auth/react"
import LoadingPage from '/components/LoadingPage';

export default function Component() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  //console.log(session)

  return (
    <>
      {loading && <LoadingPage />}
      {session &&
        <>
          <button onClick={() => signOut()}>Sign out</button>
          <p style={{ marginBottom: '10px' }}> Welcome, {session.user.fname ?? session.user.email}</p> <br />
        </>
      }
      {!session &&
        <>
          <button onClick={() => signIn()}>Sign in</button>
        </>
      }

    </>
  )
}