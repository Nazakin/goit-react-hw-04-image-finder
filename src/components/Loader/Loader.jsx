import React from "react";
import { MagnifyingGlass } from 'react-loader-spinner'
import css from './Loader.module.css'

export const Loader = () => {
    return(
        <div className={css.loader}>
        <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"/>
        </div>
    )

}