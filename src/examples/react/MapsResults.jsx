const React = require('react');
const Place = require("./Place.jsx")

class MapResults extends React.Component {
    constructor (props) {
        super(props);
        this.buildPlaces = this.buildPlaces.bind(this);
        this.getDetails = this.getDetails.bind(this);
        this.state = {
            places: [],
            service: {},
            map: {}
        }
    }
    componentDidMount() {
        var map = new google.maps.Map(this.refs.business);
        var service = new google.maps.places.PlacesService(map);
        this.setState({"map": map, "service": service});
    }
    search(data) {
        this.setState({places: []}, () => {
            var name =  this.props.search.business_name || "";
            var zip = this.props.search.zipcode;
            var phone = this.props.search.phone_number;
            this.state.service.textSearch({
                query: name + " "+ zip + " " + phone + " business"
            }, (results) => {
                this.buildPlaces(results);

            });
        });
    }
    getDetails(request, cb) {
        this.state.service.getDetails(request, cb);
    }
    buildPlaces(results) {
        var rows = [];
        results.forEach((elem, index, arr) => {
            rows.push (<Place result={elem} key={index} getDetails={this.getDetails}/>)
        });
        this.setState({places: rows});
    }
    render() {
        return (
            <div className="col-md-8 col-md-push-2">
                <div className="business" ref="business">
                </div>
                <div className="business_list">
                    {this.state.places}
                </div>
            </div>
        )
    }
}

module.exports =  MapResults; 