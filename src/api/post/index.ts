import {axiosClient } from "@/api/axiosConfig";
import apiRoutes from "@/api/routes";

import {AxiosPromise} from "axios";

export const getPosts = (): AxiosPromise =>
    axiosClient .get(apiRoutes.POST.ALL);
