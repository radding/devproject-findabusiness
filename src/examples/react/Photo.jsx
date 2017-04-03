const React = require('react');
var Clarifai = require('clarifai');

class Photo extends React.Component {
    constructor(props) {
        super(props);
        var app = new Clarifai.App(
            'NO18sIhXk9nZDkAdVXNPSThzPXPI8wHn78vAncxe',
            'c2vHENnTnNj6XdFkXCEWbG1g1oSdBmTqOTO44eP9'
        );
        this.buildCaptions = this.buildCaptions.bind(this);
        app.models.predict(Clarifai.GENERAL_MODEL, this.props.url).then(
            (resp) => {
                var data = resp.outputs[0].data.concepts;
                this.buildCaptions(data);
            },
            (err) => {
                console.log(err);
            }
        );
        this.state = {
            "app": app,
            "caption": ""
        };

    }
    buildCaptions(captions) {
        var caps = [];
        captions.forEach((elem, index, arr) => {
            if (index < arr.length -1) {
                caps.push(elem.name + ", ");
            }
            else {
                caps.push("and ");
                caps.push(elem.name);
            }
            
        });
        this.setState({captions: caps});
    }
    render() {
        return (
            <div className="col-md-3">
                <div className = "thumbnail">
                    <img className="img-responsive" src={this.props.url} />
                </div>
                <div className="caption">
                    <h5>About this picture!</h5>
                    <h6>This picture contains: </h6>
                    <div style={{width: "100%"}}>
                        <p style={{width: "100%", fontStyle: "italic"}}>{this.state.captions}</p>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = Photo;