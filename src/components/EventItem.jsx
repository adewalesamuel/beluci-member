import { Link } from "react-router-dom";

export function EventItem(props) {
    return (
        <div className="card h-100 position-relative">
            <div className="card-img-top bg-light">
                <img src={props.event.img_url} className='img-fluid' 
                alt={props.event.name} loading='lazy'/>
            </div>
            <div className="card-body">
                <h3 className='card-title'>{props.event.name}</h3>
                <address className='mb-1'>{props.event.address}</address>
                <time>
                    {new Date(props.event.date).toLocaleDateString(
                        'fr', {'dateStyle':'short'})}
                </time>
            </div>
            <Link to={`/galleries/${props.event.id}`} className="stretched-link"></Link>
        </div>
    )
    
}