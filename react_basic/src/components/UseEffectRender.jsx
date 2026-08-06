import { useEffect, useState } from "react";
function UseEffectRender() {
 const [models, setModels] = useState([]);
 const URL = "http://localhost:8000/models"
 useEffect(() => {
    fetch(URL)
    .then((response) => response.json())
    .then((data) => setModels(data.models||[]))
    .catch((error) => console.error(error));
 }, [])

 return (
 <main>
    <h1>모델 목록</h1>
    <ul>
        {models.map((model) => (
         <li key={model}>{model}</li>
        ))}
    </ul>
 </main>
 );
}

export default UseEffectRender;