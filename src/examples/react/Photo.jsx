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
                console.log(resp);
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
            caps.push(<span className="caption" key={index}>{elem.name}</span>)
        });
        this.setState({captions: caps});
    }
    render() {
        return (
            <div>
                <img src={this.props.url} />
                <div className="captions">
                    {this.state.captions}
                </div>
            </div>
        )
    }
}

module.exports = Photo;