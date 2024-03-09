import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [nom_culture, setNomCulture] = useState("");
  const [date_plantation, setDatePlantation] = useState("");
  const [date_recolte, setDateRecolte] = useState("");
  const [methode_irrigation, setMethodeIrrigation] = useState("");
  const [quantite_eau_irrigation, setQuantiteEauIrrigation] = useState("");
  const [frequence_surveillance, setFrequenceSurveillance] = useState("");
  const [date_derniere_surveillance, setDateDerniereSurveillance] = useState("");
  const [image_culture, setImageCulture] = useState(null);
  const [remarques, setRemarques] = useState("");
  const [allCulture, setAllCulture] = useState(null);
  useEffect(() => {
    getCulture();
  }, []);

  const submitCulture = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nom_culture", nom_culture);
    formData.append("date_plantation", date_plantation);
    formData.append("date_recolte", date_recolte);
    formData.append("methode_irrigation", methode_irrigation);
    formData.append("quantite_eau_irrigation", quantite_eau_irrigation);
    formData.append("frequence_surveillance", frequence_surveillance);
    formData.append("date_derniere_surveillance", date_derniere_surveillance);
    formData.append("image_culture", image_culture);
    formData.append("remarques", remarques);

    try {
      const result = await axios.post(
        "http://localhost:3001/api/culture",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(result);
      // Refresh Culture after successful upload
      
      
    } catch (error) {
      console.error("Error uploading Culture:", error);
    }
  };

  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    setImageCulture(e.target.files[0]);
  };

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
        <table className="table table-hover table-bordered text-center mt-4 ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image Culture</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
        {allCulture == null
        ? ""
        :  allCulture.map((data, index) => (
          <tr key={data._id}>
            <th scope="row">{index + 1}</th>
            <td><img
                src={require(`./images/${data.image_culture}`)}
                height={100}
                width={100}
              /></td>
            <td>{data.date_plantation}</td>
            <td>
               
              
              
            </td>
          </tr>
        ))}

        </tbody>
      </table>
      <form onSubmit={submitCulture}>
        
        <label>Nom Culture:</label>
        <input
          type="text"
          placeholder="nom_culture"
          value={nom_culture}
          onChange={(e) => setNomCulture(e.target.value)}
        />
        <label>Date Plantation:</label>
        <input
          type="date"
          value={date_plantation}
          onChange={(e) => setDatePlantation(e.target.value)}
        />
        <label>Date Recolte:</label>
        <input
          type="date"
          value={date_recolte}
          onChange={(e) => setDateRecolte(e.target.value)}
        />
        <label>Methode Irrigation:</label>
         <input
          type="text"
          placeholder="methode_irrigation"
          value={methode_irrigation}
          onChange={(e) => setMethodeIrrigation(e.target.value)}
        />
        <label>Quantité Eau Irrigation :</label>
          <input
          type="Number"
          value={quantite_eau_irrigation}
          onChange={(e) => setQuantiteEauIrrigation(e.target.value)}
        />
        <label>Fréquence Surveillance:</label>
         <input
          type="text"
          placeholder="frequence_surveillance"
          value={frequence_surveillance}
          onChange={(e) => setFrequenceSurveillance(e.target.value)}
        />
        <label>Date Derniere Surveillance:</label>
         <input
          type="date"
          value={date_derniere_surveillance}
          onChange={(e) => setDateDerniereSurveillance(e.target.value)}
        />
        <label>Image Culture:</label>
        <input type="file" accept="image/*" onChange={onInputChange} alt="image"></input>
        <label>Remarques:</label>
        <input
          type="text"
          value={remarques}
          onChange={(e) => setRemarques(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      
    </div>
  );
}
export default App;