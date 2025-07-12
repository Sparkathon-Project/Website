"use client";
import Image from "next/image";
import React from "react";

export default function Navbar() {
    return (
        <nav className="bg-brand h-[64px]">
            <div className="flex justify-between items-center mx-auto p-4 max-w-screen-xl">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image width={200} height={200} src="/logo.png" className="w-full h-8 object-center object-cover" alt="Logo" />
                    <span className="self-center font-semibold text-yellow-300 text-2xl whitespace-nowrap">Snap Cart</span>
                </div>
            </div>
        </nav>
    );
}