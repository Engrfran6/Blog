'use client';

import {cn, User} from '@/lib/utils';
import {clearUser} from '@/redux/features/userSlice';
import {RootState} from '@/redux/store';
import {Moon, Sun} from 'lucide-react';
import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SettingsTab} from './settings/Settings';
import {Button} from './ui/button';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.user.user) as User;
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearUser());
    router.push('/');
  };

  return (
    <header className="border-b w-full  px-4 py-3 fixed z-10 bg-white">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-sm md:text-xl font-semibold">
          {user && `Welcome! ${user?.firstname}`}
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium">
            Blog
          </Link>
          <Link href="/projects" className="text-sm font-medium">
            Projects
          </Link>
          <Link href="/about" className="text-sm font-medium">
            About
          </Link>
          <Link href="/newsletter" className="text-sm font-medium">
            Newsletter
          </Link>
          {user && (
            <Link href="/mypost" className="text-sm font-medium">
              My post
            </Link>
          )}
        </nav>
        <div className="flex items-center">
          <div>
            {user ? (
              <div className="flex gap-4">
                <Link
                  className={cn(
                    'px-4 py-1.5 border rounded-md bg-purple-500 hover:bg-purple-600 text-white',
                    pathname === '/mypost/create' ? 'hidden' : ''
                  )}
                  href="/mypost/create">
                  Create post
                </Link>
                <button
                  onClick={() => handleLogout()}
                  className="px-4 py-1.5 border rounded-md text-purple-600">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <a
                  className={cn(
                    'px-4 py-1.5 border rounded-md bg-purple-500 hover:bg-purple-600 text-white',
                    pathname === '/login' ? 'hidden' : 'block'
                  )}
                  href="/login">
                  Login
                </a>
                <a
                  className={cn(
                    'px-4 py-1.5 border rounded-md text-purple-600',
                    pathname === '/register' ? 'hidden' : 'block'
                  )}
                  href="/register">
                  Register
                </a>
              </div>
            )}
          </div>

          <Button variant="ghost" size="icon" className="ml-4">
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <SettingsTab user={user} />
        </div>

        <div onClick={() => setOpen(!open)} className="flex md:hidden flex-col gap-1.5 relative">
          <div
            className={cn(
              'w-5 h-0.5 bg-slate-900 transition-transform duration-300',
              open ? 'rotate-45 translate-y-2' : ''
            )}
          />
          <div
            className={cn(
              'w-5 h-0.5 bg-slate-900 transition-opacity duration-300',
              open ? 'translate-x-1/2 invisible' : ''
            )}
          />
          <div
            className={cn(
              'w-5 h-0.5 bg-slate-900 transition-transform duration-300',
              open ? '-rotate-45 -translate-y-2' : ''
            )}
          />
        </div>
      </div>
    </header>
  );
};
export default Navbar;
