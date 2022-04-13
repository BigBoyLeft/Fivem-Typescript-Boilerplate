import { appEvent } from "./NUI";

RegisterCommand(
    "visible",
    (source: number, args: any[]) => {
        appEvent("hud", "setVisible", { visible: args[0] });
    },
    false
);

RegisterCommand(
    "data",
    (source: number, args: any[]) => {
        appEvent("hud", "setData", { data: args.join() });
    },
    false
);
