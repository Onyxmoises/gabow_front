import { useEffect , useState } from "react";
import axios from "axios";
const createSubgraph = () =>{

    const [graph , setGraph] = useState({})

    const addSubGraph = (evt) =>{

        const file = evt.target.files[0]
        console.log(file)
        if(file){

            const reader = new FileReader();
            reader.readAsBinaryString(file, "UTF-8");
            reader.onload = (e) =>{

                const list = extractIds(e.target.result);
                const new_list = list.filter(item => item != "").filter(item => item.length < 6 && item.length > 0).filter(item => item != 'LNT');
                const name = document.getElementById('subname').value;
                const graphCopy = {... graph}
                graphCopy[name] = new_list
                setGraph(graph => ({... graphCopy}))
                console.log(graph)

            }
            reader.onerror = (e) =>{

                console.log('pendejo')

            }

        }

    }

    const saveGraph = async() =>{
        
        const name = document.getElementById('name').value;
        const svgList = JSON.stringify({name : graph})
        const response = await axios.get(`https://emiliorifaschidopro.pythonanywhere.com/createGraph/text=${svgList}` , {});
        console.log(response.data)

    }

    const extractIds = (svgString) => {
        var pattern = /id="([^"]*)"/g;
        var matches = svgString.matchAll(pattern);
        
        var ids = [];
        for (var match of matches) {
          ids.push(match[1]);
        }
        
        return ids;
      }

    return (
    <>
    <p>SUBE LOS ARCHIVOS Y GUARDA EL SUB GRAFO<br/>CUANDO ESTES LISTO GUARDALO POR COMPLETO</p>
    <label>DALE NOMBRE A TU GRAFO</label>
    <input type="text" id="name"/>
    <br />
    <br />
    <label>DALE NOMBRE A TU SUB GRAFO</label>
    <input type="text" id="subname"/>
    <br />
    <br />
    <label>SUBE TU ARCHIVO</label>
    <input type="file" id="file" onChange={addSubGraph} />
    <br />
    <br />
    <label>GUARDALO </label>
    <input type="button" onClick={saveGraph} value="COMPROBAR"/>
    <br />
    <br />
    <label>CHECHA EL STATUS DEL GRAFO GLOBAL</label>
    <input type="button" onClick={console.log(JSON.stringify({Batiz : graph}))} value="COMPROBAR"/>
    <br />
    <br />
    </>
    )

}

export default createSubgraph