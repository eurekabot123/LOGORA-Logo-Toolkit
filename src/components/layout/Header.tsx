"use client";

import { UserButton, useSignIn, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import dynamic from "next/dynamic";

const SignIn = dynamic(() => import("./../singIn/index"), {
  ssr: false,
})

export default function Header() {


  const { isSignedIn, user } = useUser();
  // const { isLoaded, signIn } = useSignIn();
  // const router = useRouter() 

  // 默认 -1 未登录
  const [credits, setCredits] = useState(-1);
  const fetchUserInfo = async (signal: AbortSignal) => {
    // 帮我加上请求头 token
    // 可以自定义请求头吗
    const token = localStorage.getItem("_authing_token")

    try {
      const response = await fetch("/api/get-user-info", {
        method: "POST", headers: {
          "Authing-Token": `${token}`
        },
        signal
      });

      const { message, data } = await response.json();
      if (data && data.id) {
        setCredits(data.credits);
        localStorage.setItem("credits", data.credits);
      } else {
        localStorage.removeItem("credits");
        if (localStorage.getItem("_authing_token")) {
          const GuardFactory = (window as any).GuardFactory! || {}
          if (GuardFactory.Guard) {
            const guard = new GuardFactory!.Guard({
              appId: '65ed829556b7674c16b88e31'
            })
            guard.logout()
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  };


  useEffect(() => {
    (window as any).fetchUserInfo = fetchUserInfo
    const controller = new AbortController();
    const { signal } = controller;
    fetchUserInfo(signal);

    return () => {
      console.log('Aborting controller');
      controller.abort();
    }
  }, [isSignedIn]);


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-lg">
      <div className="max-w-[1200px] mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">AI Logo</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
          >
            Templates
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <SignIn credits={credits} />
          <a
            href="https://github.com/yourusername/ai-logo-generator"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-black transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </header>
  );
}