import Urls from "../atoms/urls";
import { Request } from "../atoms/Utils/Request";

export const EkycService = {
    search: ({ tenantId, filters }) =>
        Request({
            url: Urls.ekyc.search,
            useCache: false,
            method: "POST",
            auth: true,
            userService: true,
            params: { tenantId, ...filters },
        }),
    count: (tenantId) =>
        Request({
            url: Urls.ekyc.count,
            useCache: false,
            method: "POST",
            auth: true,
            userService: true,
            params: { tenantId },
        }),
    create: (details, tenantId) =>
        Request({
            url: Urls.ekyc.create,
            data: details,
            useCache: true,
            method: "POST",
            params: { tenantId },
            auth: true,
            userService: true,
        }),
    get_connection: (details, tenantId) =>
        Request({
            url: Urls.ekyc.get_connection,
            data: details,
            useCache: false,
            method: "POST",
            params: { tenantId },
            auth: true,
            userService: true,
        }),
    validate_user: (data, tenantId) =>
        Request({
            url: Urls.ekyc.validate_user,
            data: data,
            useCache: false,
            method: "POST",
            params: { tenantId },
            auth: true,
            userService: true,
        }),
};
