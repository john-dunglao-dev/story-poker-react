'use client';

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Ellipsis } from 'lucide-react';
import NavigationLinks from './NavigationLinks';
import { useEffect, useState } from 'react';
import { checkAuth } from '@/api/auth/check';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export default function WebsiteHeader() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function handleToggleMenu(open: boolean) {
    setIsOpen(open);
  }

  const handleLogout = (e: Event) => {
    e.preventDefault();

    deleteCookie('accessToken', { path: '/' });
    deleteCookie('refreshToken', { path: '/' });
    setIsAuthenticated(false);

    router.push('/auth/login');
    handleToggleMenu(false);
  };

  useEffect(() => {
    checkAuth()
      .then((res) => {
        if (res.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  return (
    <header className="bg-linear-to-r from-blue-500/90 to-blue-500/70 backdrop-blur-sm shadow-md border-b-2 border-blue-600/40">
      {/* Header content can go here */}
      <div className="container mx-auto py-4 flex justify-between items-center px-6 lg:px-0">
        <div>
          <a href="/" className="flex items-center gap-1">
            <img
              src="/logo-v2-mini.drawio.svg"
              alt="John Florentino Dunglao Logo"
              className="inline-block h-8 w-8"
            />
            <h4 className="text-xl lg:text-2xl font-bold text-white">
              Discussion
            </h4>
          </a>
        </div>

        <div className="hidden lg:block">
          <NavigationLinks
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
          />
        </div>

        <div className="lg:hidden flex items-center">
          <button onClick={() => handleToggleMenu(true)}>
            <Ellipsis size={28} className="text-white" />
          </button>
        </div>

        <Transition appear show={isOpen}>
          <Dialog
            as="div"
            className="absolute z-10"
            onClose={() => handleToggleMenu(false)}
          >
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-transparent backdrop-blur-xs"></div>
            </TransitionChild>

            <div className="fixed inset-y-0 right-0 flex">
              <TransitionChild
                enter="transform transition ease-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in duration-200"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="w-64 h-full bg-blue-400 backdrop-blur-xs px-3 border-l-2 border-blue-600/50">
                  <NavigationLinks
                    isAuthenticated={isAuthenticated}
                    onLogout={handleLogout}
                  />
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>
      </div>
    </header>
  );
}
