function Star({starNumber, value, color}) {
    return (
        <span>
            <i style={{color}} className={
                value >= starNumber ? 'fas fa-star' : value >= starNumber - 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'
            }/>
        </span>
    );
}

function Rating({value, text, color}) {
    return (
        <div className='rating'>
            <Star starNumber={1} value={value} color={color}/>
            <Star starNumber={2} value={value} color={color}/>
            <Star starNumber={3} value={value} color={color}/>
            <Star starNumber={4} value={value} color={color}/>
            <Star starNumber={5} value={value} color={color}/>
            <span>{text && text}</span>
        </div>
    );
}

export default Rating;