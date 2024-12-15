import Header from "@/components/lead/Header";
import Sidebar from "@/components/lead/sidebar/sidebar";

export default function Lead(){
    return (
        <div className={"h-full"}>
            <Header />
            <div className="bg-[#F8FAFC]">
                <div className={"w-[1248px] h-full flex items-start m-auto gap-8 mt-12"}>
                    <Sidebar/>
                </div>
            </div>
        </div>

    );
};
