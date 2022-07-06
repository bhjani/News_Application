import "./card-style.css";

function Card(props) {
  return <div className="cd">{props.children}</div>;
}

export default Card;