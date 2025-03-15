import Header from "@/components/lead/header/header.tsx";
import Sidebar from "@/components/lead/sidebar/sidebar.tsx";
import Posts from "@/components/lead/posts/posts.tsx";
import Ad from "@/components/lead/ad.tsx";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { decodeAccessToken, isTokenExpired } from "@/jwt-route";
import api from "@/api";

const Main = () => {
    const navigate = useNavigate();
    const refreshTokenRequest = useRef<Promise<any> | null>(null);
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    const handleAuthFlow = async () => {
        try {
            if (!accessToken) {
                throw new Error("Access token missing");
            }

            if (isTokenExpired(accessToken)) {
                if (!refreshToken) {
                    throw new Error("Refresh token missing");
                }

                refreshTokenRequest.current ||= api.auth.refreshToken(refreshToken)
                    .then(response => {
                        if (!response.data?.accessToken || !response.data?.refreshToken) {
                            throw new Error("Invalid token response");
                        }
                        return response;
                    });

                const response = await refreshTokenRequest.current;
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("refreshToken", response.data.refreshToken);
            }

            const tokenData = decodeAccessToken(localStorage.getItem("accessToken")!);
            navigate(tokenData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "Author" 
                ? "/main/writer" 
                : "/main/reader");

        } catch (error) {
            console.error("Auth error:", error);
            localStorage.clear();
            navigate("/auth/login");
        }
    };

    const loadPosts = async () => {
        try {
            const response = await api.post.getPosts();
            if (response.status === 200) {
                console.log("Posts loaded:", response.data);
            }
        } catch (error) {
            console.error("Posts loading failed:", error);
        }
    };

    useEffect(() => {
        let isActive = true;

        const initialize = async () => {
            await handleAuthFlow();
            if (isActive) await loadPosts();
        };

        initialize();
        return () => { isActive = false; };
    }, []);

    return (
        <div className="h-full">
            <Header />
            <div className="w-[1248px] h-full flex items-start m-auto gap-8 mt-12">
                <Sidebar />
                <Posts />
                <Ad />
            </div>
        </div>
    );
};

export default Main;