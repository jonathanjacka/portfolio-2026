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
    size: '2x',
    component: (props: IconProps) => <SocialIcon {...props} />,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jonathanjacka/',
    icon: faLinkedin,
    size: '2x',
    component: (props: IconProps) => <SocialIcon {...props} />,
  },
  {
    name: 'CodePen',
    href: 'https://codepen.io/jonathanjacka',
    icon: faCodepen,
    size: '2x',
    component: (props: IconProps) => <SocialIcon {...props} />,
  },
];
const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className='bg-base-100'>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all ease-in delay-150`}
      >
        <nav
          className='flex items-center justify-between p-4 sm:p-6 lg:px-8'
          aria-label='Global'
        >
          <div className='flex lg:flex-1'>
            <a className='-m-1.5 p-1.5 cursor-pointer' href='#home'>
              <span className='sr-only'>Jonathan Jacka</span>
              <img
                className='h-10 sm:h-12 w-auto max-w-full'
                src='/iconJ.png'
                alt='logo'
              />
            </a>
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
