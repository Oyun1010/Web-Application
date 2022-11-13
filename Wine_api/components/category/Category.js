import styles from "./Category.module.css"
export default function Category({data}) {
    return (
        <div>
            <div className = {styles.category}>{data.strCategory}</div>         
        </div>
        
    );
}