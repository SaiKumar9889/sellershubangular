import { TrackMenus } from "./menuForTrack"
import { pages } from "./pages";
import { subMenus } from "./subMenuTrack";

export interface usertrackInput{
    menu:TrackMenus;
    submenu:subMenus;
    page:pages;
    function?:any
    descrption?:any;
  }