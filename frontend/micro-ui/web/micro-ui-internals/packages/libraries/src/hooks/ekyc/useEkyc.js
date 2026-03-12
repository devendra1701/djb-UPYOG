import { useQuery, useQueryClient, useMutation } from "react-query";


// ekyc count
export const useEkycCount = (tenantId, config = {}) => {
    return useQuery(["EKYC_COUNT", tenantId], () => Digit.EkycService.count(tenantId), config);
};

// ekyc search
export const useEkycSearch = ({ tenantId, filters }, config = {}) => {
    const client = useQueryClient();
    const args = tenantId ? { tenantId, filters } : { filters };

    const { isLoading, error, data } = useQuery(
        ["ekycSearchList", tenantId, filters],
        () => Digit.EkycService.search(args),
        config
    );

    return {
        isLoading,
        error,
        data,
        revalidate: () =>
            client.invalidateQueries(["ekycSearchList", tenantId, filters]),
    };
};

// get connection
export const useGetConnection = ({ tenantId, details }, config = {}) => {
    const client = useQueryClient();

    const { isLoading, error, data } = useQuery(
        ["ekycGetConnection", tenantId, details?.kno],
        () => Digit.EkycService.get_connection(details, tenantId),
        config
    );

    return {
        isLoading,
        error,
        data,
        revalidate: () =>
            client.invalidateQueries(["ekycGetConnection", tenantId, details?.kno]),
    };
};

// validate user
export const useValidateUser = (tenantId, config = {}) => {
    return useMutation((data) => Digit.EkycService.validate_user(data, tenantId), config);
};