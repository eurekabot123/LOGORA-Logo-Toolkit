"use client"

import { useAuth, UserButton, useSignIn, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SignIn } from "@clerk/nextjs";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button, DropdownMenu } from "@radix-ui/themes";

export default function com({ show, credits }: any) {
    const { isSignedIn, user } = useUser();
    const { isLoaded, signIn } = useSignIn();
    const [showLogin, setShowLogin] = useState(false);

    const token = localStorage.getItem("_authing_token")

    const { signOut } = useAuth()


    const path = usePathname()
    const params = useSearchParams()
    const router = useRouter()

    // console.log()
    useEffect(() => {

        setShowLogin(show)
        const login = params.get("login")
        const token = localStorage.getItem("_authing_token")
        if (login && !token) setShowLogin(true)
        // if (path === "/") {
        //     document.body.style.overflow = "auto";
        // }
    }, [show, params])

    const Show = () => {
        setShowLogin(true)
        document.body.style.overflow = "hidden";
    }
    const hidden = () => {
        router.push(path)
        setShowLogin(false)
        document.body.style.overflow = "auto";
    }

    const checked = (e: any) => {
        if (!isSignedIn && credits == -1) {
            router.replace("?login=" + Date.now())
            e.preventDefault()
            return
        }
    }

    // const guard = useGuard()
    const [guard, setGuard] = useState<any>()
    useEffect(() => {
        const GuardFactory = (window as any).GuardFactory! || {}
        if (GuardFactory.Guard == undefined) return
        const guard = new GuardFactory!.Guard({
            appId: '65ed829556b7674c16b88e31'
        })
        setGuard(guard)
        const date = Date.now()
        guard.start('#authing-guard-container').then(async (userInfo: any) => {
            if (Date.now() - date > 8000) {
                location.reload()
            }
            router.replace(path)
        })
    }, [])

    function HandleSignOut() {
        if (isSignedIn)
            signOut().then(res => {
                location.href = "/"
            })
        else {
            guard.logout()
            router.push("/")
        }
    }


    return (
        <>
            <div className="flex-row flex items-center h-8 justify-end">
                <Link href={"/pricing"} onClick={(e) => checked(e)} className="flex items-center justify-center pr-4 md:pr-4 gap-6">
                    {(isSignedIn || credits != -1 || token) ?
                        <>
                            <p className="text-base">credits: <span className="inline-block ml-2">{credits == -1 ? "..." : credits}</span></p>
                            <div className="hidden md:block cursor-pointer"><Button className="mr-4 hidden md:block cursor-pointer" color="gray" variant="solid" highContrast>Purchase</Button></div>
                        </>
                        : <div className="cursor-pointer"><Button color="gray" className="cursor-pointer" variant="solid" highContrast>Purchase</Button></div>
                    }  </Link>

                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        {
                            (!isSignedIn && credits == -1 && !token) ?
                                <div className="cursor-pointer">
                                    <Button color="gray" variant="outline" highContrast>Sign in</Button>
                                </div> :
                                <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center cursor-pointer bg-center bg-cover" style={{ backgroundImage: "url('/dca549ceac40af9a4f3813328546ba4.png')" }}>
                                    <UserButton afterMultiSessionSingleSignOutUrl={"/"} afterSignOutUrl={"/"} />
                                </div>
                        }
                        {/* <div className="h-8 w-8 bg-slate-200 rounded-full flex items-center justify-center cursor-pointer" >
                                {isLoaded && !isSignedIn ? <></> : <>
                                    <UserButton afterMultiSessionSingleSignOutUrl={"/"} afterSignOutUrl={"/"} />
                                </>}
                            </div> */}
                        {/* </> */}
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content color="gray" highContrast variant="soft" >
                        {(isLoaded && !isSignedIn && credits == -1) ? <></> : <>
                            <DropdownMenu.Item onClick={() => router.push("/profile")}>
                                <div className="cursor-pointer text-base flex items-center gap-2 h-4 w-4">
                                    <img src="/1280X1280.PNG" style={{ height: "1rem", width: "1rem" }} />
                                    <span>Profile</span>
                                </div>
                            </DropdownMenu.Item>
                        </>}
                        <DropdownMenu.Item onClick={() => router.push("/terms")} >
                            <div className="cursor-pointer text-base flex items-center gap-2 h-full w-full">
                                <img src="/7629116d-5b2a-4350-8f0a-cc9a46f0879d.png" style={{ height: "1rem", width: "1rem" }} />
                                <span>Terms of Use</span>
                            </div>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item onClick={() => router.push("/policy")}>
                            <div className="cursor-pointer text-base flex items-center gap-2 h-full w-full">
                                <img src="/b360d288-3504-46c9-bfb8-0a777e498a4d.png" style={{ height: "1rem", width: "1rem" }} />
                                <p>Privacy Policy</p>
                            </div>
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        {isLoaded && !isSignedIn && credits == -1 ? <>
                            <DropdownMenu.Item onClick={Show}>
                                <div className="cursor-pointer text-base flex items-center gap-2 h-full w-full">
                                    <img src="/1bf9d524-541c-4abc-a36b-2ce30cf4c85e.png" style={{ height: "1rem", width: "1rem" }} />
                                    <p>Sign in</p>
                                </div>
                            </DropdownMenu.Item>
                        </> :
                            <DropdownMenu.Item onClick={() => HandleSignOut()}>
                                <div className="cursor-pointer text-base flex items-center gap-2 h-full w-full">
                                    <img src="/7db56888-f779-4df6-99d3-85ba15bef588.png" style={{ height: "1rem", width: "1rem" }} />
                                    <p>Sign out</p>
                                </div>
                            </DropdownMenu.Item>
                        }
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </div>
            <div onClick={hidden} className="flex items-center h-[100vh] justify-center fixed bottom-0 left-0 right-0 top-0 z-50 overflow-y-auto overflow-x-hidden bg-black/15 transition-opacity duration-300" style={{ pointerEvents: showLogin ? "all" : "none", opacity: showLogin ? 1 : 0 }}>
                <div className="inline-block mx-auto mb-20" onClick={(e) => e.stopPropagation()}>
                    {showLogin && <>
                        <SignIn redirectUrl={path} /></>}
                </div>
            </div>

        </>

    );
}
