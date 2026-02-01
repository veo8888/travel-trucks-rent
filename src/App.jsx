import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Landing from "./views/Landing/Landing";
import Browse from "./views/Browse/Browse";
import VehicleInfo from "./views/VehicleInfo/VehicleInfo";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/catalog" element={<Browse />} />
        <Route path="/catalog/:id" element={<VehicleInfo />} />
      </Routes>
    </>
  );
};

export default App;
