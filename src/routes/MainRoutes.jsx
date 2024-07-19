import { Route, Routes } from "react-router-dom";
import { Layouts } from "../layouts";
import { Views } from "../views";

export function MainRoutes() {
    return (
        <Layouts.MainLayout>
            <Routes>
                <Route path='' element={<Views.DashboardView />} />
                <Route path='events' element={<Views.EventListView />} />
                <Route path='members' element={<Views.MemberListView />} />
                <Route path='mon-profil' element={<Views.MemberEditView />} />
                <Route path='galleries/:id' element={<Views.GalleryListView />} />
            </Routes>
        </Layouts.MainLayout>
    )
}