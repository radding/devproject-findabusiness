const React = require('react');
const Photo = require('./Photo.jsx');

class Place extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "address": "",
            "phone": "",
            "industries": [],
            "photos": []
        }
    }
    componentDidMount() {
        this.props.getDetails({
            placeId: this.props.result.place_id
        }, (request) => {
            if (request == null) {
                return;
            }
            var newState = {
                "address": request.formatted_address,
                "phone": request.formatted_phone_number,
                "industries": this.buildIndustry(request.types),
                "photos": this.buildPhotos(request.photos)
            }
            this.setState(newState);
        });
    }
    buildIndustry(types) {
        var not_needed = [
            "point_of_interest",
            "establishment",

        ]
        var indStr = "";
        types.forEach((elem, index, arr) => {
            if (not_needed.indexOf(elem) > -1) {
                return;
            }
            elem = elem.replace(/_/g, " ");
            indStr += elem + ", ";
        })
        indStr = indStr.slice(0, indStr.length-2);
        return indStr;
    }
    buildPhotos(photos) {
        var pics = [];
        photos = photos || [];
        photos = photos.slice(0, 5);
        photos.forEach((elem, index, arr) => {
            var url = elem.getUrl({'maxWidth': 500, 'maxHeight': 500});
            pics.push(<Photo key={index} url={url} />)
        });
        return pics;
    }
    render() {
        return (
            <div className="place">
                <h3>{this.props.result.name}</h3>
                <div className="details">
                    <h4>Company Details </h4>
                    <p>Address: {this.state.address}</p>
                    <p>Phone: {this.state.phone}</p>
                    <p>Inndustries: {this.state.industries}</p>
                </div>
                <div className="pics">
                    <h4>Pictures</h4>
                    {this.state.photos}
                </div>
            </div>
        );
    }
}

module.exports = Place;