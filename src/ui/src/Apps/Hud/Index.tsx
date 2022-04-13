import { connect } from "react-redux";
import useAppEvent from "../../Services/useAppEvent";
import './index.scss'

const Hud = ({ visible, data, setVisible, setData }) => {
    useAppEvent("hud", "setVisible", (data: any) => {
        setVisible(JSON.parse(data.visible));
        console.log(data.visible)
    });
    useAppEvent("hud", "setData", (data: any) => setData(data.data));
    return (
        visible && (
            <pre className="UI_HUD">
                <code>{data}</code>
            </pre>
        )
    );
};

const mapStateToProps = (state: any) => ({
    visible: state.hud.visible,
    data: state.hud.data,
});

const mapDispatchToProps = (dispatch: any) => ({
    setVisible: (visible: boolean) => dispatch({ type: "SET_HUD_VISIBLE", payload: visible }),
    setData: (data: any) => dispatch({ type: "SET_HUD_DATA", payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Hud);
