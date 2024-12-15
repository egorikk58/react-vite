import Header from "@/components/lead/header/header.tsx";
import Sidebar from "@/components/lead/sidebar/sidebar.tsx";
import Posts from "@/components/lead/posts/posts.tsx";
import Ad from "@/components/lead/ad.tsx";

const Main = () => {
    return (
        <div className={"h-full"}>
            <Header/>
            <div className={"w-[1248px] h-full flex items-start m-auto gap-8 mt-12"}>
                <Sidebar/>
                <Posts/>
                <Ad/>
            </div>
        </div>

    );
};

export default Main;