"use client"

import { useRouter } from "next/navigation";

export default function moveToRoot(){
    const router = useRouter()
    router.push('/')
}