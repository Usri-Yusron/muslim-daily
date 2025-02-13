'use client'
import Layout from '@/components/Layout';
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export default function Home() {
  return (
    <Layout>
      <BackgroundBeamsWithCollision>
      <div className="mx-auto max-w-2xl py-32 lg:py-20">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Announcing our next round of funding. 
            <a href="#" className="font-semibold text-indigo-600">
              <span aria-hidden="true" className="absolute inset-0" />
               Read more <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <div className="text-center px-6 lg:px-8">
          <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            Manage your money and time
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Money can be earned, lost, and regained, but time only moves forward. Every second wasted is a moment you can never get back.
            Use your time wisely to build something meaningful.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </a>
          </div>
        </div>
      </div>
      </BackgroundBeamsWithCollision>
    </Layout>
  )
}
