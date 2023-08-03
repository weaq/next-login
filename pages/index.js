import { useSession, signIn, signOut } from "next-auth/react"
import LoadingPage from '/components/LoadingPage';

// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import the icons you need
import {
  faCalendarDays,
  faTemperatureLow,
} from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';

export default function Component() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  console.log(session)

  return (
    <>
      {loading && <LoadingPage />}
      {session &&
        <>
          <button type="button" className="btn btn-warning" onClick={() => signOut()}>Sign out</button>
          <p style={{ marginBottom: '10px' }}> Welcome, {session.user.fname ?? session.user.email}</p> <br />
          <p>{session.accessToken}</p>
        </>
      }
      {!session &&
        <>
          <button type="button" className="btn btn-primary" onClick={() => signIn()}>Sign in</button>
        </>
      }

    </>
  )
}