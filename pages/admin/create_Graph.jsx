const saveGraph = () =>{

    const addSubGraph = (evt) =>{

        const file = evt.target.files[0]
        console.log(file)
        if(file){

            const reader = new FileReader();
            reader.readAsBinaryString(file, "UTF-8");
            reader.onload = (e) =>{

                const list = extractIds(e.target.result);
                const new_list = list.filter(item => item != "").filter(item => item.length < 6 && item.length > 0)
                console.log(new_list)

            }
            reader.onerror = (e) =>{

                console.log('pendejo')

            }

        }

    }

    return (<input type="file" id="" onChange={addSubGraph} />)

}