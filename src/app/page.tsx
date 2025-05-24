import Link from 'next/link';
import {useRouter} from 'next/router';

export default function HomePage() {
  const router = useRouter();
  router.push('/color');
  return (
    <div>
      <p>Home Page</p>
      {/* <Link href='color'>Color</Link> */}
    </div>
  )
}
