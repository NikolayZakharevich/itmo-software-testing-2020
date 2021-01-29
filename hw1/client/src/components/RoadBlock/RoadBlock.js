import React from "react"
import "./RoadBlock.scss"
import {getRoute} from "../../api/route";

class RoadBlock extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            from: null,
            to: null,
            isStairsEnabled: true,
            isEscalateEnabled: false,
        };

        this.onChangeFromInput = this.onChangeFromInput.bind(this);
        this.onChangeToInput = this.onChangeToInput.bind(this);
        this.onSendButtonClick = this.onSendButtonClick.bind(this);
        this.onStairs = this.onStairs.bind(this);
        this.onEscalate = this.onEscalate.bind(this);
    }

    onChangeFromInput = e => {
        this.setState({from: e.target.value})
    };

    onChangeToInput = e => {
        this.setState({to: e.target.value})
    };

    onSendButtonClick = () => {
        const {from, to} = this.state;
        const {isStairsEnabled, isEscalateEnabled} = this.state;
        const {drawPath, setRoadBlockShown} = this.props;
        getRoute(from, to, isStairsEnabled ? 0 : 1, isEscalateEnabled ? 0 : 1).then(r => {
            if (r && r.path) {
                setRoadBlockShown(false);
                drawPath(r.path);
            }
        })
    };

    onStairs = () => {
        const isStairsEnabled = this.state.isStairsEnabled;
        this.setState({isStairsEnabled: !isStairsEnabled})
    };

    onEscalate = () => {
        const isEscalateEnabled = this.state.isEscalateEnabled;
        this.setState({isEscalateEnabled: !isEscalateEnabled})
    };

    render() {
        const onStairs = this.state.isStairsEnabled;
        const onEscalate = this.state.isEscalateEnabled;

        return <div className="RoadBlock__roadBlock">
            <div className="RoadBlock__fromField RoadBlock__inputField">
                <input placeholder="from:" onChange={this.onChangeFromInput}/>
            </div>
            <div className="RoadBlock__toField RoadBlock__inputField">
                <input placeholder="to:" onChange={this.onChangeToInput}/>
            </div>
            <div className="RoadBlock__additionalParameters">
                <div className="RoadBlock__additionalParam" onClick={this.onStairs}>
                    <div className={"RoadBlock__iconAdParam " + (onStairs ? "RoadBlock__filled" : "")}/>
                    <div className="RoadBlock__textAdParam">Use stairs</div>
                </div>
                <div className="RoadBlock__additionalParam" onClick={this.onEscalate}>
                    <div className={"RoadBlock__iconAdParam " + (onEscalate ? "RoadBlock__filled" : "")}/>
                    <div className="RoadBlock__textAdParam">Use escalator</div>
                </div>
            </div>
            <div className="RoadBlock__sendBtn" onClick={this.onSendButtonClick}>
                Go
            </div>
        </div>
    };
}

export default RoadBlock
