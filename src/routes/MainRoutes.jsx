import { Route, Routes } from "react-router-dom";
import { Layouts } from "../layouts";
import { Views } from "../views";

export function MainRoutes() {
    return (
        <Layouts.MainLayout>
            <Routes>
                <Route path='' element={<Views.MemberListView />} />
                <Route path='members/:id' element={<Views.MemberEditView />} />
                <Route path='events' element={<Views.EventListView />} />
                <Route path='mon-profil' element={<Views.MemberEditView />} />
                <Route path='galleries/:id' element={<Views.GalleryListView />} />
                <Route path='forums' element={<Views.ForumCategoryListView />} />
                <Route path='forums/:id/messages' element={<Views.MessageListView />} />
                <Route path='forums/create' element={<Views.ForumCreateView />} />
            </Routes>
        </Layouts.MainLayout>
    )
}