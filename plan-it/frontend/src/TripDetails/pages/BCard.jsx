import { Button, Card, ProgressBar, Stack} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { currencyFormatter } from "./utils"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function BCard({name, amount, max, gray}){
    const bgs = []
    if (amount > max){
        bgs.push("bg-danger", "bg-opacity-10")

    }
    else if (gray){
        bgs.push("bg-light")
    }
    
    return(

        <Card className={bgs.join("")}>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
                    <div className="me-2"> {name}</div>
                    <div className="d-flex align-items-baseline">
                        {currencyFormatter.format(amount)}
                        <span className="text-muted fs-6 ms-1">
                            / {currencyFormatter.format(max)}
                        </span>
                    </div>
                </Card.Title>
            </Card.Body>
        </Card>

    );
}

