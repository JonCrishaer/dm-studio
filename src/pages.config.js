import Home from './pages/Home';
import SavedConversations from './pages/SavedConversations';
import Simulator from './pages/Simulator';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "SavedConversations": SavedConversations,
    "Simulator": Simulator,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};