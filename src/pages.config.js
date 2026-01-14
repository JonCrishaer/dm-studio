import Home from './pages/Home';
import Simulator from './pages/Simulator';
import SavedConversations from './pages/SavedConversations';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Simulator": Simulator,
    "SavedConversations": SavedConversations,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};