import React, {useState, useEffect} from "react";
import SearchIcon from '@mui/icons-material/Search';
import CategoryItems from "./module/CategoryItems";
import styles from "../styles/Home.module.css"
import SearchItems from "./module/SearchItem";
import { useRouter } from "next/router";
import Tag from "./module/TagItem";

export default function Body() {
    const [search, searchState] = useState(null); 
    const [isSearch, isSearchState] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const [categoryData, setCategoryData] = useState(null);
    const [category, setCategory] = useState("all");

    const router = useRouter();

    const {query : {tagItem, element}, } = router;
    const props = {tagItem, element};
      
    useEffect(() => {
        setLoading(true)
        fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
          .then((res) => res.json())
          .then((categoryData) => {
            setCategoryData(categoryData)
            setLoading(false);       
          })
      }, []);    

    let handleChange = (e) => {
        searchState(e.target.value);
        if(e.target.value.length == 0) {
            searchState(null);
            isSearchState(false);
        }
        else {
            isSearchState(true);
        }      
    }

    function categoryBtn(value) {
        setCategory(value);
        router.push("/");
       //console.log('----------------------------    ')
    }

    return (
        <div className = {styles.cont}>
            <div className = {styles.appbar}>
                <button className = {styles.btn} type="submit" onClick={() => categoryBtn("all")} >All</button>
                {categoryData && categoryData.drinks &&
                    categoryData.drinks.map((item, i) => (
                        <div key={i}>
                            <button className = {styles.btn} type="submit" onClick={() => categoryBtn(item.strCategory)}>{item.strCategory}</button>     
                        </div>                         
                    )) 
                }
            </div> 

            <hr class = {styles.divider}></hr>     

            <div className = {styles.searchItem}>               
                <input 
                    className = {styles.input} 
                    type = "text" 
                    placeholder = "Search..."
                    value={search || ""}
                    onChange = {handleChange}
                    >
                </input>
                <div className = {styles.searchIcon}><SearchIcon/></div>  
            </div>

            {isSearch ? 
                <SearchItems searchValue={search}/>
                : 
                props.tagItem == "tag" ? <Tag e = {props.element}/> : <CategoryItems categoryName={category}/>
            }

        </div>
        
       
    );
    
}