const EditCard = ({toy}) => {
    return <div className="display-card">
    <img src={toy.image}></img>
    <div className="display-card-text-row">
    <p>{toy.name}</p>
    <h3>{toy.price}</h3>
    </div>
    <button>Edit</button>
</div>
}