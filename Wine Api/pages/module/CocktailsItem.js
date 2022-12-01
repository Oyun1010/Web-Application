import React, { useState, useEffect } from 'react';
import Category from '../../components/category/Category';
import DrinkList from './CocktailList';

export default function CocktailsItem() {

    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [more, setMore] = useState(false);

    useEffect(() => {
        setLoading(true)
        fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
          .then((res) => res.json())
          .then((data) => {
            setData(data)
            setLoading(false)
          })
      }, []);

       return (
        <div>
            <div>
                {data && data.drinks &&
                    data.drinks.map((item, i) => (
                    <div key={i}>
                        {isLoading ? 'Unshij bn oo ...' : <Category data={item}></Category>}
                        <DrinkList category = {item.strCategory}/>                 
                    </div>
                ))
            }
        </div>
        </div>
    )
}
