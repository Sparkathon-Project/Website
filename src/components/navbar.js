"use client";
import Image from "next/image";
import React from "react";

export default function Navbar() {
    return (
        <nav className="bg-brand h-[64px]">
            <div className="flex flex-wrap justify-between items-center mx-auto p-4 max-w-screen-xl">
                <a href="https://walmart.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image width={200} height={200} src="/logo.png" className="w-full h-8 object-center object-cover" alt="Logo" />
                    <span className="self-center font-semibold text-white text-2xl whitespace-nowrap">Walmart</span>
                </a>
                <button data-collapse-toggle="navbar-default" type="button" className="md:hidden inline-flex justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 w-10 h-10 text-gray-500 dark:text-gray-400 text-sm" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
            </div>
        </nav>
    );
}