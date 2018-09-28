import {toast} from "react-toastify";

export const messages = (data) => {

    // if (!data) return null;
    // if (!data.alerts) return null;
    // if (!Array.isArray(data.alerts)) return null;
    //
    // let msgs = data.alerts.map( item => item.msg ).join(', ');
    // if (msgs.trim().length > 0) toast.warn(msgs);

    toast.warn('msgs');

}