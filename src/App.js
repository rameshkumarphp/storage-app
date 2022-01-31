import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Page404 from "./pages/Page404";
import BucketList from "./pages/BucketList";
import BucketDetail from "./pages/BucketDetail";
import Layout from './pages/Layout';

export default function App() {
  return (
    //Defining various routes for our application
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BucketList />} />
          <Route path="/bucketdetail/:id" element={<BucketDetail />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}