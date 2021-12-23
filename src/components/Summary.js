import React, { Fragment, useEffect, useState } from "react";
import '../myStyles.css';

const Summary = () => {

    const [data, setData] = useState("")

    const getData = async (sym) => {
        const data = await fetch(`http://localhost:5000/company/quotes/${sym}`)
            const jsonData = await data.json();
    }


    return <Fragment>
        <div>Summary is here</div>
        </Fragment>

}

export default Summary;