import React, { useEffect, useState } from 'react';

// Axios (API)
import axios from "axios";

// config file (URL)
import { url } from "../config.js";

import default_country_img from '../assets/images/no-image.jpg';

function Countries() {

    // list
    const [countries, setCountries] = useState([]);

    // http response status
    const [responseStatusGetAllCountries, setResponseStatusGetAllCountries] = useState("");

    useEffect(() => {

        getAllCountries();

    }, [])


    const getAllCountries = async () => {

        setResponseStatusGetAllCountries("loading");

        await axios.get(`${url}/countries/all`).then((res) => {

            if (res.status === 200) {
                setResponseStatusGetAllCountries("success");
                setCountries(res.data);
            }

        }).catch(err => {
            setResponseStatusGetAllCountries("error");
            return;
        })
    }

    // code from www.w3schools.com
    const search = () => {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("search-country-input");
        filter = input.value.toUpperCase();
        table = document.getElementById("countries");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    // call the search method
    const searchCountries = () => {
        document.querySelector('#search-country-input').addEventListener('keyup', search, false);
    }

    return (

        <div className="d-flex justify-content-center">
            <div className="container-fluid" style={{ maxWidth: 600 }}>




                {responseStatusGetAllCountries === "loading" && <p className="text-secondary animate__animated animate__fadeIn animate__infinite">Loading...</p>}
                {responseStatusGetAllCountries === "error" && <small className="text-danger">Error</small>}
                {(countries?.length === 0 && responseStatusGetAllCountries === "success") && <small className="text-warning">Empty</small>}


                <div className="mb-3" style={{ maxWidth: 300 }}>

                    {(countries?.length !== 0 && responseStatusGetAllCountries !== "error") &&
                        <input type="text" id="search-country-input" className="form-control search-table-input" onKeyUp={searchCountries} placeholder="Search..." autoComplete="off" />
                    }

                </div>





                {countries?.length !== 0 &&

                    <div className="mb-3">


                        <div id="scrollbar-small" style={{ overflow: "scroll", maxHeight: 1000, maxWidth: 600, overflowX: "auto", paddingRight: 20 }}>
                            <table className="table bg-transparent table-hover" id="countries">
                                <tbody>
                                    {

                                        countries?.map(country =>
                                            <tr key={country.id}>
                                                <td className="text-light"><img className="me-md-2" src={`data:image/png;base64,${country.countryFlag}`} width="auto" height="30px" alt="flag" /><small aria-label={country.countryAlpha2Code} data-balloon-pos="right" >{country.countryName}</small></td>
                                                <td aria-label="Read more on Google" data-balloon-pos="left"><a href={`https://www.google.com/search?q=${country.countryName + " " + country.countryAlpha2Code}`} target="_blank" rel="noreferrer"><i className="bi bi-search text-secondary"></i></a></td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>
                }


            </div>

        </div>


    )
}

export default Countries;