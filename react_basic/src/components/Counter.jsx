import { useState } from "react";
function Counter(){
    const [count,setCount] = useState(0)
    return (
        <div>
            <h1>Counter Example</h1>
            <p>현재값: {count}</p>
            <button onClick={()=>setCount(count+1)}>Add</button>
            <button onClick={()=>setCount(count-1)}>Minus</button>
        </div>
    );
}

export default Counter;