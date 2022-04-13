let exps = global.exports;

export function appEvent(app: string, event: string, data: any) {
    SendNUIMessage(
        JSON.stringify({
            type: "appEvent",
            app,
            event,
            data: data || {},
        })
    );
}
exps("appEvent", appEvent);
