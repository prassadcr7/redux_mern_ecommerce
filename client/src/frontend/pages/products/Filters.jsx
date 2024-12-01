const Filters = ({setCategoriesFilter,setBrandsFilter,categories,brands}) =>{
    const setFilter = (event) => {
        const type = event.target.getAttribute('data-type');
        const name = event.target.name;
        if(type === 'category'){
            if(categories.includes(name)){
                const cat =  categories.filter((element,index) => element !== name) 
                setCategoriesFilter(cat)
            }else{
                setCategoriesFilter([...categories,name])
            }
            
        }else{
            if(brands.includes(name)){
                const brand =  brands.filter((element,index) => element !== name) 
                setBrandsFilter(brand)
            }else{
                setBrandsFilter([...brands,name])
            }
           
        }
    }
    return(
    <div className="w-1/5 flex flex-col">
        <h1 className="font-semibold text-xl text-left">Filters</h1>
        <ul className="grid gap-1 mt-4">
            <h1>Category</h1>
            <li className="flex gap-1"><input type="checkbox" name="men" onClick={()=>setFilter(event)} data-type='category'/>Men</li>
            <li className="flex gap-1"><input type="checkbox" name="women" onClick={()=>setFilter(event)} data-type='category'/>Women</li>
            <li className="flex gap-1"><input type="checkbox" name="kids" onClick={()=>setFilter(event)} data-type='category'/>Kids</li>
            <li className="flex gap-1"><input type="checkbox" name="accessories" onClick={()=>setFilter(event)} data-type='category'/>Accessories</li>
            <li className="flex gap-1"><input type="checkbox" name="footwear" onClick={()=>setFilter(event)} data-type='category'/>Footwear</li>
        </ul>
        <ul className="mt-5 grid gap-1 w-full">
            <h1>Brand</h1>
            <li className="flex gap-1 w-24"><input type="checkbox" name="nike" onClick={()=>setFilter(event)} data-type='brand'/>Nike</li>
            <li className="flex gap-1"><input type="checkbox" name="adidas" onClick={()=>setFilter(event)} data-type='brand'/>Adidas</li>
            <li className="flex gap-1"><input type="checkbox" name="puma" onClick={()=>setFilter(event)} data-type='brand'/>Puma</li>
            <li className="flex gap-1"><input type="checkbox" name="levi's" onClick={()=>setFilter(event)} data-type='brand'/>Levi's</li>
            <li className="flex gap-1"><input type="checkbox" name="zara" onClick={()=>setFilter(event)} data-type='brand'/>Zara</li>
        </ul>
    </div>
    )
}
export default Filters;