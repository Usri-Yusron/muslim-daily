"use client";

import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

const navigation = [
  { name: 'Sholat', href: '/sholat' },
  { name: 'Murattal', href: '/murattal' },
  { name: 'Asmaul Husna', href: '/asmaulHusna' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter();
  const { data: session } = useSession();
  const pathname = usePathname()

  return (
    <header className="sticky bg-white inset-x-0 top-0 z-50 border-b border-gray-200">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image
              alt=""
              src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
              width={32}
              height={32}
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {/* dropdown */}
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 px-9 py-2 text-sm font-semibold text-gray-900 ">
                Doa-Doa
                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <Link
                    href="/doa/pilihan"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Pilihan
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    href="/doa/harian"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Harian
                  </Link>
                </MenuItem>
              </div>
              <div className="py-1">
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Al-Quran
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Hadist
                  </a>
                </MenuItem>
              </div>
              <div className="py-1">
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Ibadah
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Haji
                  </a>
                </MenuItem>
              </div>
              <div className="py-1">
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Lain-lain
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
          {/* dropdown selesai */}
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-900">
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {/* Jika di halaman login, tombolnya jadi "Back" */}
          {pathname === "/" ? ( 
            <button onClick={() => router.push("/doa/harian")} className="text-sm font-semibold text-gray-900">
              Next <span aria-hidden="true">&rarr;</span>
            </button>
          // Jika user sudah login, tombolnya jadi "Logout"
          ) : ( 
            <button onClick={() => router.push("/")} className="text-sm font-semibold text-gray-900">
              Back <span aria-hidden="true">&rarr;</span>
            </button>
          // Jika user belum login & tidak di halaman login, tampilkan "Login"
          )}
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                alt=""
                src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
                width={32}
                height={32}
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">                
                {/* dropdown */}
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="inline-flex w-full justify-center gap-x-1.5 py-2 text-sm font-semibold text-gray-900 ">
                      Doa-Doa
                      <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute left-0 z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    <div className="py-1">
                      <MenuItem>
                        <Link
                          href="/doa/pilihan"
                          className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                        >
                          Pilihan
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          href="/doa/harian"
                          className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                        >
                          Harian
                        </Link>
                      </MenuItem>
                    </div>
                    <div className="py-1">
                      <MenuItem>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                        >
                          Al-Quran
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                        >
                          Hadist
                        </a>
                      </MenuItem>
                    </div>
                    <div className="py-1">
                      <MenuItem>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                        >
                          Ibadah
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                        >
                          Haji
                        </a>
                      </MenuItem>
                    </div>
                    <div className="py-1">
                      <MenuItem>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                        >
                          Lain-lain
                        </a>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Menu>
                {/* dropdown selesai */}
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {pathname === "/" ? (
                  <button
                    onClick={() => router.push("/doa/harian")}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Next  <span aria-hidden="true">&rarr;</span>
                  </button>
                ) : (
                  <button
                    onClick={() => router.push("/")}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Back
                  </button>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
