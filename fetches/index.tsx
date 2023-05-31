import Axios from "axios";

const headers = () => {
    return {
        "Content-Type": "application/json"
    }
}

export const FetchGetHeader = (url: string, params: any, result: (data: any) => void) => {
    if (params) {
        Axios.get(url, {"headers": headers(), params})
            .then(res => {
                result(res);
            }).catch(error => {
            result(error.response);
        });
    } else {
        Axios.get(url, {"headers": headers()})
            .then(res => {
                result(res);
            }).catch(error => {
            result(error.response);
        });
    }
}
