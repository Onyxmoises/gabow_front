import { useEffect , useState } from "react";
import axios from "axios";
const createSubgraph = () =>{

    const [graph , setGraph] = useState([])

    const addSubGraph = (evt) =>{

        const file = evt.target.files[0]
        console.log(file)
        if(file){

            const reader = new FileReader();
            reader.readAsBinaryString(file, "UTF-8");
            reader.onload = (e) =>{

                const list = extractIds(e.target.result);
                const new_list = list.filter(item => item != "").filter(item => item.length < 6 && item.length > 0).filter(item => item != 'LNT');
                setGraph(graph.concat(new_list))
                

            }
            reader.onerror = (e) =>{

                console.log('pendejo')

            }

        }

    }

    const saveGraph = async() =>{
        
        const name = document.getElementById('name').value;
        const svgList = {}
        svgList[name] = graph

        const response = await axios.get(`https://emiliorifaschidopro.pythonanywhere.com/createGraph/text=${JSON.stringify(svgList)}` , {});
        if(response.data.status.status == 'ok'){

            window.location.reload()

        } 

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
    <p>
        DALE EL NOMRBA AL GRAFO DEACUERDO A UNA SINTAXIS COMO ESTA <br/>
        NOMBRE DEL LUGAR EN UNA SOLA PALABRA _ GRAPH USANDO CAMEL CASE<br/>
        POR EJEMPLO<br/><br/>
        Batiz_Graph , TownCenter_Graph , ChapultepecSeccion1_Graph
    </p>
    <h1>DALE NOMBRE A TU GRAFO</h1>
    <input type="text" id="name"/>
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
    <label>MIRAME</label>
    <input type="button" onClick={console.log(JSON.stringify(graph))} value="COMPROBAR"/>
    <br />
    <br />

    </>
    )

}

export default createSubgraph