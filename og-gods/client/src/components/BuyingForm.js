import React from "react";

const BuyingForm = props => {
    const { handleChange, handleSubmit, getUserOrders, addBuying, inputs: { title }} = props 
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="title" 
                value={title} 
                onChange={handleChange} 
                placeholder="Title" />
            <button onClick={addBuying}>Buy</button>
        </form>
    )
}
export default BuyingForm