import { MdOutlineSettings } from "react-icons/md";
import { FcFilledFilter } from "react-icons/fc";
import { IoMdContact } from "react-icons/io";
import { RiAiGenerate } from "react-icons/ri";

export default function Sidebar() {
    return (
        <div className="flex items-start ml-1 h-screen  border-r border-yellow-600  max-h-full ">
            <div className="flex flex-col p-2 ">
                <div className="text-4xl mb-8">
                    <FcFilledFilter />
                </div>
                <div className="flex flex-col p-2 space-y-6 text-xl">
                    <MdOutlineSettings />
                    <IoMdContact />
                    <RiAiGenerate />
                </div>
            </div>
            
        </div>
    );
}
