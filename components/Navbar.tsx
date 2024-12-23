'use client';

import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {UploadButton} from '@/lib/uploadthing';
import {cn} from '@/lib/utils';
import {clearUser, updatePhoto} from '@/redux/features/userSlice';
import {RootState} from '@/redux/store';
import {Moon, SettingsIcon, Sun} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ClientUploadedFileData} from 'uploadthing/types';
import {Button} from './ui/button';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    router.push('/');
  };

  const handleProfileUpload = async (file: ClientUploadedFileData<{imageUrl: string}>) => {
    try {
      const response = await fetch('http://localhost:3000/api/settings/profilepics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: `${user?.firstname.toLowerCase()}.${user?.lastname.toLowerCase()}`,
          imageUrl: file.url, // Send the uploaded file's URL
        }),
      });

      if (!response.ok) {
        console.log(`Failed to upload profile photo: ${response.statusText}`);
      } else {
        const {photo} = await response.json();
        dispatch(updatePhoto(photo));
        console.log('Profile photo updated successfully!');
      }
    } catch (error) {
      console.log('Error: Failed to upload profile photo:', error);
    }
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

          {user && (
            <div className="ml-10 flex items-center gap-3">
              <Image
                src={user?.photo || '/assets/blog-images/m-avatar.jpeg'}
                alt={user?.firstname || 'profile photo'}
                width={500}
                height={500}
                className="w-10 h-10 rounded-full"
              />
              <Popover>
                <PopoverTrigger className="hover:text-slate-700">
                  <SettingsIcon />
                </PopoverTrigger>
                <PopoverContent className="w-max text-blue-600 text-sm mt-5">
                  <ul className="flex flex-col gap-2">
                    <li>
                      Profile photo
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          // Do something with the response
                          handleProfileUpload(res[0]);

                          alert('Upload Completed');
                        }}
                        onUploadError={(error: Error) => {
                          // Do something with the error.
                          alert(`ERROR! ${error.message}`);
                        }}
                        className="w-full p-2 border rounded-md bg-gray-100"
                      />
                    </li>

                    <li>change username</li>
                    <li>change password</li>
                    <li>Delete account</li>
                    <li></li>
                  </ul>
                </PopoverContent>
              </Popover>
            </div>
          )}
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
