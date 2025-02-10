import { LuSearch } from "react-icons/lu";

export default function SearchField() {
    return (
        <search className="mb-14">
            <form className="relative">
                <input name="search" id="search" placeholder="" className="bg-searchBackground w-full px-2 py-2 text-white" />
                <LuSearch size={25} className="absolute bottom-0 right-0 mb-2 mr-2" />
            </form>
        </search>
    )
}