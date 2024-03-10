import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateCulture from "./components/CreateCulture";
import DeleteCulture from "./components/DeleteCulture";
import UpdateCulture from "./components/UpdateCulture";
import DetailsCulture from "./components/DetailsCulture";
function App() {
  const [allCulture, setAllCulture] = useState(null);
  useEffect(() => {
    getCulture();
  }, []);

 

  

  const getCulture = async () => {
    try {
      const result = await axios.get("http://localhost:3001/api/culture");
      console.log(result);
      setAllCulture(result.data.data);
    } catch (error) {
      console.error("Error fetching Culture:", error);
    }
  };

  return (
    <div>
        <h2 className="text-center">Culture List</h2>
        <CreateCulture/>
        <table className="table table-hover table-bordered text-center mt-4 ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nom Culture</th>
            <th scope="col">Remarques</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
        {allCulture == null
        ? ""
        :  allCulture.map((data, index) => (
          <tr key={data._id}>
            <th scope="row">{index + 1}</th>
            <td>{data.nom_culture}</td>
            <td>{data.remarques}</td>
            <td>
              <DetailsCulture cultureId={data._id} />
            <UpdateCulture cultureId={data._id} onUpdate={getCulture}/>
            <DeleteCulture cultureId={data._id} onDelete={getCulture} />
              
            </td>
          </tr>
        ))}

        </tbody>
      </table>
      
      
    </div>
  );
}
export default App;