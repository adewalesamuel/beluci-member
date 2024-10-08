import { TbCalendar as CalendarIcon } from "react-icons/tb";
import { Link } from "react-router-dom";

export function EventItem(props) {
    return (
        <div className="row align-items-strech position-relative h-100">
            <div className="col-12 col-lg-6" style={{
                backgroundImage: `url(${props.event.img_url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
            </div>
            <div className="col-12 col-lg-6 p-4 bg-primary 
            text-white">
                <p className="text-uppercase">
                    {props.event.name}
                </p>
                <small>{props.event.address}</small>
                <div className="my-2 d-flex flex-column">
                    <div className="bg-white text-primary d-flex align-items-center p-1 mb-3">
                        <CalendarIcon size={18} /> 
                        {new Date(props.event.date).toLocaleDateString()}
                    </div>
                </div>
                <Link to={`/galleries/${props.event.id}`} className="stretched-link"></Link>
            </div>
        </div>
    )
    
}