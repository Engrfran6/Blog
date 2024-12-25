'use client';

import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {toast} from '@/hooks/use-toast';
import {UploadButton} from '@/lib/uploadthing';
import {User} from '@/lib/utils';
import {ArrowRight, SettingsIcon} from 'lucide-react';
import Form from 'next/form';
import Image from 'next/image';
import {ClientUploadedFileData} from 'uploadthing/types';
import {Popover, PopoverContent, PopoverTrigger} from '../ui/popover';
import {ToastAction} from '../ui/toast';
import {profileUploadAction, updatePasswordAction, updateUserAction} from './actions';

export function SettingsTab({user}: {user: User}) {
  // Handles profile photo upload
  const handleProfileUpload = async (file: ClientUploadedFileData<{imageUrl: string}>) => {
    const formData = new FormData();
    formData.append('userId', user._id);
    formData.append('imageUrl', file.url);

    const result = await profileUploadAction(formData);
    if (result?.success) {
      toast({
        variant: 'success',
        title: 'Profile photo updated',
        description: 'Your profile photo has been updated successfully.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Update failed',
        description: `ERROR! ${result?.message}`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <div>
      {user && (
        <div className="ml-10 flex items-center gap-3">
          <Image
            src={user?.photo || '/assets/blog-images/m-avatar.jpeg'}
            alt={user?.firstname || 'profile photo'}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <Popover>
            <PopoverTrigger className="hover:text-slate-700">
              <SettingsIcon />
            </PopoverTrigger>
            <PopoverContent className="w-max mt-5 mr-4">
              <span className="flex flex-col gap-2 mb-4">
                <div className="flex items-center mt-6 gap-4">
                  <span className="text-[16px] text-black font-bold">Profile photo</span>
                  <ArrowRight className="text-blue-600" />
                  <span className="text-sm">{user.photo ? 'Change photo' : 'Upload Photo'}</span>
                </div>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    handleProfileUpload(res[0]);
                  }}
                  onUploadError={(error: Error) => {
                    toast({
                      variant: 'destructive',
                      title: 'Photo upload failed',
                      description: `ERROR! ${error.message}`,
                      action: <ToastAction altText="Try again">Try again</ToastAction>,
                    });
                  }}
                  className="w-full p-2 border rounded-md bg-gray-100"
                />
              </span>
              <Settings user={user} />
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
}

const Settings = ({user}: {user: User}) => {
  // Handles user information update
  const handleUserUpdate = async (formData: FormData) => {
    formData.append('userId', user._id);

    const result = await updateUserAction(formData);
    if (result.success) {
      toast({
        variant: 'success',
        title: 'User info updated',
        description: 'Your user information has been updated successfully.',
      });
    } else {
      toast({
        variant: 'destructive',
        description: `ERROR! Updating user details failed:${result.message}`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  // Handles password update
  const handleSavePassword = async (formData: FormData) => {
    formData.append('userId', user._id);

    const result = await updatePasswordAction(formData);
    if (result.success) {
      toast({
        variant: 'success',
        title: 'Password updated',
        description: 'Your password has been updated successfully. Please log in again.',
      });
    } else {
      toast({
        variant: 'destructive',
        description: `ERROR! Updating password failed: ${result.message}`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <Tabs defaultValue="account">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>

      <TabsContent value="account">
        <Form action={handleUserUpdate}>
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Update your account information here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <InputField id="firstname" label="Firstname" defaultValue={user?.firstname} />
              <InputField id="lastname" label="Lastname" defaultValue={user?.lastname} />
              <InputField id="username" label="Username" defaultValue={`@${user?.username}`} />
            </CardContent>
            <CardFooter>
              <Button type="submit">Save changes</Button>
            </CardFooter>
          </Card>
        </Form>
      </TabsContent>

      <TabsContent value="password">
        <Form action={handleSavePassword}>
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <InputField id="currentPassword" label="Current Password" type="password" />
              <InputField id="newPassword" label="New Password" type="password" />
            </CardContent>
            <CardFooter>
              <Button type="submit">Save password</Button>
            </CardFooter>
          </Card>
        </Form>
      </TabsContent>
    </Tabs>
  );
};

const InputField = ({
  id,
  label,
  defaultValue,
  type = 'text',
}: {
  id: string;
  label: string;
  defaultValue?: string;
  type?: string;
}) => (
  <div className="space-y-1">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} name={id} defaultValue={defaultValue} type={type} />
  </div>
);
