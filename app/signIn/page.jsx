"use client"
import React from 'react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

const SignInPage = () => {
  return (
    <div className="flex min-h-[calc(100vh-160px)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="card">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-gradient-to-tr from-fuchsia-500 via-violet-500 to-cyan-400 p-[2px]">
              <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white dark:bg-neutral-950">
                <Image src="/globe.svg" alt="Logo" width={24} height={24} />
              </div>
            </div>
            <h1 className="text-2xl font-semibold">Welcome back</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Sign in to continue to Darshak</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="btn-primary w-full gap-2"
            >
              <GoogleIcon />
              <span>Continue with Google</span>
            </button>

            <button
              onClick={() => signIn('github', { callbackUrl: '/' })}
              className="btn-primary w-full gap-2 dark:!bg-white dark:!text-black dark:hover:!bg-gray-100 !bg-black !text-white hover:!bg-neutral-800"
            >
              <GitHubIcon />
              <span>Continue with GitHub</span>
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
            By signing in, you agree to our Terms and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  )
}

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C33.64 6.03 29.079 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"/>
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.817C14.655 16.108 18.961 13 24 13c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C33.64 6.03 29.079 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.197l-6.19-5.238C29.171 35.48 26.715 36.5 24 36.5c-5.202 0-9.62-3.317-11.283-7.96l-6.522 5.02C9.5 39.556 16.227 44 24 44z"/>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.793 2.239-2.231 4.206-4.093 5.565l.003-.002 6.19 5.238C39.088 36.321 42 30.73 42 24c0-1.341-.138-2.651-.389-3.917z"/>
  </svg>
)

const GitHubIcon = () => (
  <svg viewBox="0 0 16 16" version="1.1" aria-hidden="true" className="h-5 w-5 fill-current">
    <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
  </svg>
)

export default SignInPage
