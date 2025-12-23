import React from 'react';
import { useState } from 'react';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import SocialIcon, { type IconProps } from './SocialIcon';
import ThemeToggle from './ThemeToggle';
import { type SizeProp } from '@fortawesome/fontawesome-svg-core';

import {
  faGithub,
  faLinkedin,
  faCodepen,
} from '@fortawesome/free-brands-svg-icons';

const navigation = [
  {
    name: 'GitHub',
    href: 'https://github.com/jonathanjacka',
    icon: faGithub,
    size: '3x',
    component: (props: IconProps) => <SocialIcon {...props} />,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jonathanjacka/',
    icon: faLinkedin,
    size: '3x',
    component: (props: IconProps) => <SocialIcon {...props} />,
  },
  {
    name: 'CodePen',
    href: 'https://codepen.io/jonathanjacka',
    icon: faCodepen,
    size: '3x',
    component: (props: IconProps) => <SocialIcon {...props} />,
  },
];

interface HeaderProps {
  isChatActive?: boolean;
  onResetChat?: () => void;
}

const Header: React.FC<HeaderProps> = ({ isChatActive = false, onResetChat }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isChatActive && onResetChat) {
      setShowResetConfirm(true);
    }
  };

  const handleConfirmReset = () => {
    onResetChat?.();
    setShowResetConfirm(false);
  };

  return (
    <div className='bg-base-100'>
      {/* Reset Confirmation Modal */}
      <Transition show={showResetConfirm}>
        <Dialog as='div' className='relative z-60' onClose={() => setShowResetConfirm(false)}>
          <TransitionChild
            enter='ease-out duration-200'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-150'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-900/50 backdrop-blur-sm' />
          </TransitionChild>
          <div className='fixed inset-0 flex items-center justify-center p-4'>
            <TransitionChild
              enter='ease-out duration-200'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-150'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='bg-base-100 rounded-2xl p-6 shadow-xl max-w-sm w-full'>
                <h3 className='text-lg font-semibold text-base-content mb-2'>Start new conversation?</h3>
                <p className='text-sm text-base-content/70 mb-6'>
                  This will clear the current chat and return to the home screen.
                </p>
                <div className='flex gap-3 justify-end'>
                  <button
                    className='btn btn-ghost btn-sm'
                    onClick={() => setShowResetConfirm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className='btn btn-primary btn-sm'
                    onClick={handleConfirmReset}
                  >
                    Start fresh
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all ease-in delay-150`}
      >
        <nav
          className='flex items-center justify-between p-4 sm:p-6 lg:px-8'
          aria-label='Global'
        >
          <div className='flex lg:flex-1'>
            <button
              className='-m-1.5 p-1.5 cursor-pointer group relative'
              onClick={handleLogoClick}
              title={isChatActive ? 'Return to start' : undefined}
            >
              <span className='sr-only'>Jonathan Jacka - Return to start</span>
              <img
                className='h-10 sm:h-12 w-auto max-w-full transition-transform group-hover:scale-105'
                src='/iconJ.png'
                alt='logo'
              />
            </button>
          </div>
          <div className='flex lg:hidden'>
            <button
              type='button'
              className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-base-content'
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className='sr-only'>Open main menu</span>
              <Bars3Icon className='h-10 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='hidden lg:flex lg:gap-x-20'>
            {navigation.map((item) => (
              <div
                key={item.name}
                className='text-sm font-semibold leading-6 text-gray-900 cursor-pointer hover:text-gray-700'
              >
                {item.component({
                  href: item.href,
                  icon: item.icon,
                  size: item.size as SizeProp,
                  name: item.name,
                })}
              </div>
            ))}
          </div>
          <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
            <ThemeToggle />
          </div>
        </nav>
        <Transition show={mobileMenuOpen}>
          <Dialog as='div' className='lg:hidden' onClose={setMobileMenuOpen}>
            <TransitionChild
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 z-50 bg-gray-900/20' />
            </TransitionChild>
            <TransitionChild
              enter='ease-out duration-300'
              enterFrom='translate-x-full'
              enterTo='translate-x-0'
              leave='ease-in duration-200'
              leaveFrom='translate-x-0'
              leaveTo='translate-x-full'
            >
              <DialogPanel
                className={`fixed inset-y-0 right-0 z-50 w-full sm:max-w-sm overflow-y-auto bg-base-100 sm:ring-1 sm:ring-base-300`}
              >
                <div className='flex items-center justify-between p-4 sm:p-6'>
                  <a
                    className='-m-1.5 p-1.5'
                    href='#home'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className='sr-only'>Jonathan Jacka</span>
                    <img
                      className='h-10 sm:h-12 w-auto max-w-full'
                      src='/iconJ.png'
                      alt='mobile logo'
                    />
                  </a>
                  <button
                    type='button'
                    className='-m-2.5 rounded-md p-2.5 text-base-content'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className='sr-only'>Close menu</span>
                    <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                  </button>
                </div>
                <div className='mt-6 flow-root px-4 sm:px-6'>
                  <div className='-my-6 divide-y divide-base-300'>
                    <div className='space-y-2 py-6'>
                      {navigation.map((item) => (
                        <div
                          key={item.name}
                          className='block rounded-lg px-0 py-2 text-base font-semibold leading-7 text-base-content hover:bg-base-200'
                        >
                          <div className='flex items-center gap-2'>
                            {item.component({
                              href: item.href,
                              icon: item.icon,
                              size: item.size as SizeProp,
                              name: item.name,
                            })}
                            <span className='text-base-content/70'>{item.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className='flex justify-center py-6 border-t border-base-300'>
                      <ThemeToggle />
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </Dialog>
        </Transition>
      </header>
    </div>
  );
};

export default Header;
