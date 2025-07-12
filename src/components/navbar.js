import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="bg-brand h-[64px]">
            <div className="flex justify-between items-center mx-auto p-4 max-w-screen-xl">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image
                        width={200}
                        height={200}
                        src="/logo.png"
                        className="w-full h-8 object-center object-cover"
                        alt="Logo"
                    />
                    <span className="self-center font-semibold text-yellow-300 text-2xl whitespace-nowrap">
                        SnapCart
                    </span>
                </div>

                <div className="relative size-10 rounded-full p-1 bg-yellow-500 cursor-pointer">
                    <div className="rounded-full overflow-hidden w-full h-full">
                        <Image
                            src="https://picsum.photos/id/447/200/300"
                            width={40}
                            height={40}
                            alt="User Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}
