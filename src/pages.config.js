import Home from './pages/Home';
import SavedConversations from './pages/SavedConversations';
import Simulator from './pages/Simulator';
import DesktopPreview from './pages/DesktopPreview';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "SavedConversations": SavedConversations,
    "Simulator": Simulator,
    "DesktopPreview": DesktopPreview,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};