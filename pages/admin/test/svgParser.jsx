import React, { useEffect, useState } from "react";
const parser = () => {
    const svgString = `<svg width="200" height="200" viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="80" fill="blue" />
    <rect x="50" y="50" width="100" height="100" fill="red" />
    </svg>`
    const [htmlCode,setHtmlCode]=useState();
    useEffect(()=>{
        setHtmlCode(document.createRange().createContextualFragment(svgString));

    });
    return(
        <>
            {htmlCode}
        </>
    );
}
export default parser;