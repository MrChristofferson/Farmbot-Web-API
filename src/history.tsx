import { BrowserRouter } from "react-router-dom";
export let history: any = {};
export let push = (url: string) => history.push(url);
