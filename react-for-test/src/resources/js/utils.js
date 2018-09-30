import {toast} from "react-toastify";

export const messages = (data, isOne=false) => {

    if (!data) return null;
    if (!data.msg) return null;
    if (!Array.isArray(data.msg)) return null;

    if (!isOne) {
        let msgs = data.msg.map(item => item.text).join(', ');
        if (msgs.trim().length > 0) toast.warn(msgs);
    } else {
        data.msg.forEach(
            item => {
                toast[item.type](item.text);
            }
        )
    }

}